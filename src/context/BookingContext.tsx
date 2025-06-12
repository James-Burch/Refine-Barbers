import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Barber, Service, Booking, BookingFormData, TimeSlot } from '../types';
import { supabase } from '../lib/supabase';
import { format, addMinutes, parseISO } from 'date-fns';

interface BookingContextType {
    // State
    barbers: Barber[];
    services: Service[];
    bookings: Booking[];
    loading: boolean;
    error: string | null;

    // Functions
    getAvailableServices: (barberId: string) => Service[];
    getAvailableTimeSlots: (barberId: string, serviceId: string, date: string) => TimeSlot[];
    isDateAvailable: (barberId: string, date: string) => boolean;
    createBooking: (bookingData: BookingFormData) => Promise<boolean>;
    updateBooking: (bookingId: string, updates: Partial<Booking>) => Promise<boolean>;
    deleteBooking: (bookingId: string) => Promise<boolean>;
    getBookingStats: () => { todayCount: number; totalCount: number; completedCount: number; todayRevenue: number; };
    loadData: () => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within BookingProvider');
    }
    return context;
};

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [barbers, setBarbers] = useState<Barber[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load all data
    const loadData = async () => {
        setLoading(true);
        setError(null);

        try {
            console.log('Loading data from Supabase...');

            // Load barbers
            const { data: barbersData, error: barbersError } = await supabase
                .from('barbers')
                .select('*')
                .order('name');

            if (barbersError) {
                console.error('Barbers error:', barbersError);
                throw barbersError;
            }

            // Load services
            const { data: servicesData, error: servicesError } = await supabase
                .from('services')
                .select('*')
                .eq('is_active', true)
                .order('name');

            if (servicesError) {
                console.error('Services error:', servicesError);
                throw servicesError;
            }

            // Load recent bookings (get more data for admin use)
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            
            const { data: bookingsData, error: bookingsError } = await supabase
                .from('bookings')
                .select('*')
                .gte('date', format(thirtyDaysAgo, 'yyyy-MM-dd')) // Last 30 days
                .order('date')
                .order('time');

            if (bookingsError) {
                console.error('Bookings error:', bookingsError);
                throw bookingsError;
            }

            console.log('Loaded data:', {
                barbers: barbersData?.length,
                services: servicesData?.length,
                bookings: bookingsData?.length
            });

            setBarbers(barbersData || []);
            setServices(servicesData || []);
            setBookings(bookingsData || []);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load data';
            setError(errorMessage);
            console.error('Load data error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Get services available for a specific barber
    const getAvailableServices = (): Service[] => {
        return services.filter(service => service.is_active);
    };

    // Generate time slots for a day with better logic
    const generateTimeSlots = (startHour: string, endHour: string, interval: number = 30): string[] => {
        const slots: string[] = [];
        
        try {
            const start = parseISO(`2000-01-01T${startHour}`);
            const end = parseISO(`2000-01-01T${endHour}`);

            let current = start;
            while (current < end) {
                slots.push(format(current, 'HH:mm'));
                current = addMinutes(current, interval);
            }
        } catch (error) {
            console.error('Error generating time slots:', error);
            // Fallback to basic slots if parsing fails
            return ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', 
                    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];
        }

        return slots;
    };

    // Check if a date is available for a barber (improved logic)
    const isDateAvailable = (barberId: string, date: string): boolean => {
        try {
            const barber = barbers.find(b => b.id === barberId);
            if (!barber) return false;

            const targetDate = parseISO(date);
            const dayOfWeek = format(targetDate, 'EEEE').toLowerCase();
            
            // Check if it's a working day
            const isWorkingDay = barber.working_days.includes(dayOfWeek);
            
            // Don't allow past dates (except today)
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const isPastDate = targetDate < today;
            
            return isWorkingDay && !isPastDate;
        } catch (error) {
            console.error('Error checking date availability:', error);
            return false;
        }
    };

    // Get available time slots for a barber, service, and date (enhanced)
    const getAvailableTimeSlots = (barberId: string, serviceId: string, date: string): TimeSlot[] => {
        try {
            const barber = barbers.find(b => b.id === barberId);
            const service = services.find(s => s.id === serviceId);

            if (!barber || !service || !isDateAvailable(barberId, date)) {
                return [];
            }

            // Generate all possible time slots (30-minute intervals)
            const allSlots = generateTimeSlots(barber.working_hours.start, barber.working_hours.end, 30);

            // Get existing bookings for this barber on this date (exclude cancelled)
            const dayBookings = bookings.filter(
                booking => booking.barber_id === barberId && 
                          booking.date === date && 
                          booking.status !== 'cancelled'
            );

            // Check availability for each slot
            return allSlots.map(time => {
                const slotStart = parseISO(`${date}T${time}`);
                const slotEnd = addMinutes(slotStart, service.duration);

                // Check if this slot conflicts with any existing booking
                const isAvailable = !dayBookings.some(booking => {
                    const bookingService = services.find(s => s.id === booking.service_id);
                    if (!bookingService) return false;

                    const bookingStart = parseISO(`${booking.date}T${booking.time}`);
                    const bookingEnd = addMinutes(bookingStart, bookingService.duration);

                    // Check for overlap (slot must not overlap with existing booking)
                    return (slotStart < bookingEnd && slotEnd > bookingStart);
                });

                return {
                    time,
                    available: isAvailable
                };
            }).filter(slot => {
                // Additional filter: ensure the slot + service duration doesn't go past working hours
                const slotStart = parseISO(`${date}T${slot.time}`);
                const slotEnd = addMinutes(slotStart, service.duration);
                const workEnd = parseISO(`${date}T${barber.working_hours.end}`);
                
                return slotEnd <= workEnd;
            });
        } catch (error) {
            console.error('Error getting available time slots:', error);
            return [];
        }
    };

    // Create a new booking
    const createBooking = async (bookingData: BookingFormData): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            console.log('Creating booking:', bookingData);

            const bookingPayload = {
                barber_id: bookingData.barberId,
                service_id: bookingData.serviceId,
                date: bookingData.date,
                time: bookingData.time,
                customer_name: bookingData.customerName,
                customer_phone: bookingData.customerPhone,
                customer_email: bookingData.customerEmail || null,
                sms_reminder: bookingData.smsReminder,
                email_reminder: bookingData.emailReminder,
                status: 'confirmed'
            };

            console.log('Booking payload:', bookingPayload);

            const { data, error } = await supabase
                .from('bookings')
                .insert([bookingPayload])
                .select()
                .single();

            if (error) {
                console.error('Supabase booking error:', error);
                throw error;
            }

            console.log('Booking created successfully:', data);

            // Add to local state
            setBookings(prev => [...prev, data]);

            return true;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create booking';
            setError(errorMessage);
            console.error('Create booking error:', err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Update an existing booking (complete function)
    const updateBooking = async (bookingId: string, updates: Partial<Booking>): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            console.log('Updating booking:', bookingId, updates);

            // Prepare the update payload (only include valid database fields)
            const updatePayload: any = {};
            
            if (updates.barber_id) updatePayload.barber_id = updates.barber_id;
            if (updates.service_id) updatePayload.service_id = updates.service_id;
            if (updates.date) updatePayload.date = updates.date;
            if (updates.time) updatePayload.time = updates.time;
            if (updates.customer_name) updatePayload.customer_name = updates.customer_name;
            if (updates.customer_phone) updatePayload.customer_phone = updates.customer_phone;
            if (updates.customer_email !== undefined) updatePayload.customer_email = updates.customer_email || null;
            if (updates.status) updatePayload.status = updates.status;
            if (updates.sms_reminder !== undefined) updatePayload.sms_reminder = updates.sms_reminder;
            if (updates.email_reminder !== undefined) updatePayload.email_reminder = updates.email_reminder;
            
            updatePayload.updated_at = new Date().toISOString();

            const { data, error } = await supabase
                .from('bookings')
                .update(updatePayload)
                .eq('id', bookingId)
                .select()
                .single();

            if (error) {
                console.error('Supabase update error:', error);
                throw error;
            }

            console.log('Booking updated successfully:', data);

            // Update local state
            setBookings(prev => prev.map(booking => 
                booking.id === bookingId ? { ...booking, ...data } : booking
            ));

            return true;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update booking';
            setError(errorMessage);
            console.error('Update booking error:', err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Delete a booking (complete function with confirmation)
    const deleteBooking = async (bookingId: string): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            console.log('Deleting booking:', bookingId);

            const { error } = await supabase
                .from('bookings')
                .delete()
                .eq('id', bookingId);

            if (error) {
                console.error('Supabase delete error:', error);
                throw error;
            }

            console.log('Booking deleted successfully');

            // Remove from local state
            setBookings(prev => prev.filter(booking => booking.id !== bookingId));

            return true;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to delete booking';
            setError(errorMessage);
            console.error('Delete booking error:', err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Get booking statistics (useful for admin dashboard)
    const getBookingStats = () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        const todayBookings = bookings.filter(b => b.date === today && b.status !== 'cancelled');
        const totalBookings = bookings.filter(b => b.status !== 'cancelled');
        const completedBookings = bookings.filter(b => b.status === 'completed');
        
        return {
            todayCount: todayBookings.length,
            totalCount: totalBookings.length,
            completedCount: completedBookings.length,
            todayRevenue: todayBookings.reduce((sum, booking) => {
                const service = services.find(s => s.id === booking.service_id);
                return sum + (service?.price || 0);
            }, 0)
        };
    };

    // Load data on mount
    useEffect(() => {
        loadData();
    }, []);

    const value: BookingContextType = {
        barbers,
        services,
        bookings,
        loading,
        error,
        getAvailableServices,
        getAvailableTimeSlots,
        isDateAvailable,
        createBooking,
        updateBooking,
        deleteBooking,
        getBookingStats,
        loadData
    };

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
};