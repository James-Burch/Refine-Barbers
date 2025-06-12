import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from 'date-fns';
import { Barber, Service, Booking } from '../../types';

interface EditBookingModalProps {
    booking: Booking;
    barbers: Barber[];
    services: Service[];
    isUpdating: boolean;
    onUpdate: (bookingId: string, updates: Partial<Booking>) => Promise<void>;
    onClose: () => void;
}

interface EditingBooking {
    id: string;
    barber_id: string;
    service_id: string;
    date: string;
    time: string;
    customer_name: string;
    customer_phone: string;
    customer_email?: string;
    status: string;
}

const EditBookingModal = ({ booking, barbers, services, isUpdating, onUpdate, onClose }: EditBookingModalProps) => {
    const [editingBooking, setEditingBooking] = useState<EditingBooking>({
        id: booking.id,
        barber_id: booking.barber_id,
        service_id: booking.service_id,
        date: booking.date,
        time: booking.time,
        customer_name: booking.customer_name,
        customer_phone: booking.customer_phone,
        customer_email: booking.customer_email || '',
        status: booking.status
    });

    // Date picker state
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date(editingBooking.date));

    // Time slots generation
    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 9; hour <= 17; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                slots.push(timeString);
            }
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    // Calendar logic
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const firstDayOfWeek = monthStart.getDay();
    const calendarDays = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
        calendarDays.push(null);
    }
    calendarDays.push(...days);

    const handleDateClick = (date: Date) => {
        const dateString = format(date, 'yyyy-MM-dd');
        setEditingBooking({ ...editingBooking, date: dateString });
        setIsDatePickerOpen(false);
    };

    const goToPreviousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const formatDisplayDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, 'dd/MM/yyyy');
    };

    const handleSubmit = async () => {
        await onUpdate(editingBooking.id, {
            barber_id: editingBooking.barber_id,
            service_id: editingBooking.service_id,
            date: editingBooking.date,
            time: editingBooking.time,
            customer_name: editingBooking.customer_name,
            customer_phone: editingBooking.customer_phone,
            customer_email: editingBooking.customer_email || undefined,
            status: editingBooking.status as 'confirmed' | 'cancelled' | 'completed'
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-medium text-white mb-6">Edit Booking</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Barber Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Barber</label>
                        <select
                            value={editingBooking.barber_id}
                            onChange={(e) => setEditingBooking({...editingBooking, barber_id: e.target.value})}
                            className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none"
                        >
                            {barbers.map(barber => (
                                <option key={barber.id} value={barber.id}>{barber.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Service Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Service</label>
                        <select
                            value={editingBooking.service_id}
                            onChange={(e) => setEditingBooking({...editingBooking, service_id: e.target.value})}
                            className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none"
                        >
                            {services.map(service => (
                                <option key={service.id} value={service.id}>
                                    {service.name} - £{service.price} ({service.duration}min)
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date Selection with Calendar */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                        <button
                            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                            className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none cursor-pointer hover:border-gray-500 transition-colors text-left flex items-center justify-between"
                        >
                            <span>{formatDisplayDate(editingBooking.date)}</span>
                            <svg 
                                className={`w-4 h-4 transition-transform ${isDatePickerOpen ? 'rotate-180' : ''}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Calendar Dropdown */}
                        {isDatePickerOpen && (
                            <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 p-4 min-w-[300px]">
                                {/* Month Navigation */}
                                <div className="flex items-center justify-between mb-4">
                                    <button
                                        onClick={goToPreviousMonth}
                                        className="p-2 text-gray-400 hover:text-white transition-all cursor-pointer hover:scale-110"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    
                                    <h3 className="text-lg font-semibold text-white">
                                        {format(currentMonth, 'MMMM yyyy')}
                                    </h3>
                                    
                                    <button
                                        onClick={goToNextMonth}
                                        className="p-2 text-gray-400 hover:text-white transition-all cursor-pointer hover:scale-110"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Day Headers */}
                                <div className="grid grid-cols-7 gap-1 mb-2">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                        <div key={day} className="p-2 text-center text-xs text-gray-400 font-medium">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7 gap-1">
                                    {calendarDays.map((date, index) => {
                                        if (!date) {
                                            return <div key={index} className="p-2"></div>;
                                        }

                                        const dateString = format(date, 'yyyy-MM-dd');
                                        const isSelected = editingBooking.date === dateString;
                                        const isTodayDate = isToday(date);

                                        return (
                                            <button
                                                key={index}
                                                onClick={() => handleDateClick(date)}
                                                className={`
                                                    p-2 text-sm rounded transition-all transform hover:scale-105
                                                    ${isSelected
                                                        ? 'bg-white text-black font-semibold scale-105'
                                                        : isTodayDate
                                                            ? 'bg-gray-600 text-white border border-gray-500 hover:bg-gray-500'
                                                            : 'text-white hover:bg-gray-700'
                                                    }
                                                `}
                                            >
                                                {format(date, 'd')}
                                                {isTodayDate && (
                                                    <div className="w-1 h-1 bg-blue-400 rounded-full mx-auto mt-1"></div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Time Selection Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                        <select
                            value={editingBooking.time}
                            onChange={(e) => setEditingBooking({...editingBooking, time: e.target.value})}
                            className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none"
                        >
                            {timeSlots.map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>

                    {/* Customer Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Customer Name</label>
                        <input
                            type="text"
                            value={editingBooking.customer_name}
                            onChange={(e) => setEditingBooking({...editingBooking, customer_name: e.target.value})}
                            className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none"
                        />
                    </div>

                    {/* Customer Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Customer Phone</label>
                        <input
                            type="tel"
                            value={editingBooking.customer_phone}
                            onChange={(e) => setEditingBooking({...editingBooking, customer_phone: e.target.value})}
                            className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none"
                        />
                    </div>

                    {/* Customer Email */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Customer Email</label>
                        <input
                            type="email"
                            value={editingBooking.customer_email}
                            onChange={(e) => setEditingBooking({...editingBooking, customer_email: e.target.value})}
                            className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                        <select
                            value={editingBooking.status}
                            onChange={(e) => setEditingBooking({...editingBooking, status: e.target.value})}
                            className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none"
                        >
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 mt-8">
                    <button
                        onClick={handleSubmit}
                        disabled={isUpdating}
                        className="flex-1 bg-white text-black py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 font-medium"
                    >
                        {isUpdating ? 'Updating...' : 'Update Booking'}
                    </button>
                    <button
                        onClick={onClose}
                        disabled={isUpdating}
                        className="flex-1 bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors border border-gray-600 font-medium"
                    >
                        Cancel
                    </button>
                </div>
            </div>

            {/* Backdrop */}
            {isDatePickerOpen && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsDatePickerOpen(false)}
                />
            )}
        </div>
    );
};

export default EditBookingModal;