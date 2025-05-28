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
            // Load barbers
            const { data: barbersData, error: barbersError } = await supabase
                .from('barbers')
                .select('*')
                .order('name');

            if (barbersError) throw barbersError;

            // Load services
            const { data: servicesData, error: servicesError } = await supabase
                .from('services')
                .select('*')
                .eq('is_active', true)
                .order('name');

            if (servicesError) throw servicesError;

            // Load recent bookings
            const { data: bookingsData, error: bookingsError } = await supabase
                .from('bookings')
                .select('*')
                .gte('date', format(new Date(), 'yyyy-MM-dd'))
                .order('date')
                .order('time');

            if (bookingsError) throw bookingsError;

            setBarbers(barbersData || []);
            setServices(servicesData || []);
            setBookings(bookingsData || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load data');
            console.error('Load data error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Get services available for a specific barber
    const getAvailableServices = (barberId: string): Service[] => {
        // All barbers offer all services for now
        return services.filter(service => service.is_active);
    };

    // Generate time slots for a day
    const generateTimeSlots = (startHour: string, endHour: string, interval: number = 15): string[] => {
        const slots: string[] = [];
        const start = parseISO(`2000-01-01T${startHour}`);
        const end = parseISO(`2000-01-01T${endHour}`);

        let current = start;
        while (current < end) {
            slots.push(format(current, 'HH:mm'));
            current = addMinutes(current, interval);
        }

        return slots;
    };

    // Check if a date is available for a barber
    const isDateAvailable = (barberId: string, date: string): boolean => {
        const barber = barbers.find(b => b.id === barberId);
        if (!barber) return false;

        const dayOfWeek = format(parseISO(date), 'EEEE').toLowerCase();
        return barber.working_days.includes(dayOfWeek);
    };

    // Get available time slots for a barber, service, and date
    const getAvailableTimeSlots = (barberId: string, serviceId: string, date: string): TimeSlot[] => {
        const barber = barbers.find(b => b.id === barberId);
        const service = services.find(s => s.id === serviceId);

        if (!barber || !service || !isDateAvailable(barberId, date)) {
            return [];
        }

        // Generate all possible time slots
        const allSlots = generateTimeSlots(barber.working_hours.start, barber.working_hours.end);

        // Get existing bookings for this barber on this date
        const dayBookings = bookings.filter(
            booking => booking.barber_id === barberId && booking.date === date
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

                // Check for overlap
                return (slotStart < bookingEnd && slotEnd > bookingStart);
            });

            return {
                time,
                available: isAvailable
            };
        });
    };

    // Create a new booking
    const createBooking = async (bookingData: BookingFormData): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase
                .from('bookings')
                .insert([{
                    barber_id: bookingData.barberId,
                    service_id: bookingData.serviceId,
                    date: bookingData.date,
                    time: bookingData.time,
                    customer_name: bookingData.customerName,
                    customer_phone: bookingData.customerPhone,
                    customer_email: bookingData.customerEmail,
                    sms_reminder: bookingData.smsReminder,
                    email_reminder: bookingData.emailReminder,
                    status: 'confirmed'
                }])
                .select()
                .single();

            if (error) throw error;

            // Add to local state
            setBookings(prev => [...prev, data]);

            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create booking');
            console.error('Create booking error:', err);
            return false;
        } finally {
            setLoading(false);
        }
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
        loadData
    };

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
};