import { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isPast } from 'date-fns';

interface DatePickerProps {
    barberId: string;
    selectedDate?: string;
    onSelect: (date: string) => void;
    onBack: () => void;
}

const DatePicker = ({ barberId, selectedDate, onSelect, onBack }: DatePickerProps) => {
    const { isDateAvailable } = useBooking();
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Get days to show (including padding for calendar grid)
    const firstDayOfWeek = monthStart.getDay();
    const calendarDays = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDayOfWeek; i++) {
        calendarDays.push(null);
    }

    // Add all days of the month
    calendarDays.push(...days);

    const isDateSelectable = (date: Date): boolean => {
        const dateString = format(date, 'yyyy-MM-dd');
        return !isPast(date) && isDateAvailable(barberId, dateString);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Pick a Date</h2>
                <button
                    onClick={onBack}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer hover:font-semibold"
                >
                    ← Back
                </button>
            </div>

            <div className="max-w-md mx-auto">
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => setCurrentMonth(prev => addDays(prev, -30))}
                        className="p-2 text-gray-400 hover:text-white transition-all cursor-pointer hover:scale-110 hover:font-semibold"
                    >
                        ←
                    </button>
                    <h3 className="text-lg font-semibold text-white">
                        {format(currentMonth, 'MMMM yyyy')}
                    </h3>
                    <button
                        onClick={() => setCurrentMonth(prev => addDays(prev, 30))}
                        className="p-2 text-gray-400 hover:text-white transition-all cursor-pointer hover:scale-110 hover:font-semibold"
                    >
                        →
                    </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="p-2 text-center text-xs text-gray-400 font-medium">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((date, index) => {
                        if (!date) {
                            return <div key={index} className="p-3"></div>;
                        }

                        const dateString = format(date, 'yyyy-MM-dd');
                        const isSelected = selectedDate === dateString;
                        const isSelectable = isDateSelectable(date);
                        const isTodayDate = isToday(date);

                        return (
                            <button
                                key={index}
                                onClick={() => isSelectable && onSelect(dateString)}
                                disabled={!isSelectable}
                                className={`p-3 text-sm rounded transition-all transform ${isSelected
                                        ? 'bg-white text-black scale-110 font-semibold'
                                        : isTodayDate && isSelectable
                                            ? 'bg-gray-700 text-white border border-gray-500 cursor-pointer hover:scale-105 hover:font-semibold'
                                            : isSelectable
                                                ? 'text-white hover:bg-gray-700 cursor-pointer hover:scale-105 hover:font-semibold'
                                                : 'text-gray-600 cursor-not-allowed'
                                    }`}
                            >
                                {format(date, 'd')}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-4 text-xs text-gray-500 text-center">
                    Available dates are highlighted. Past dates and weekends are disabled.
                </div>
            </div>
        </div>
    );
};

export default DatePicker;