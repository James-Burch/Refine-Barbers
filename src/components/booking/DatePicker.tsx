import { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isPast, isSameMonth } from 'date-fns';

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

    const goToPreviousMonth = () => {
        const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
        // Don't allow going to months before current month
        if (newMonth >= startOfMonth(new Date())) {
            setCurrentMonth(newMonth);
        }
    };

    const goToNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const goToToday = () => {
        setCurrentMonth(new Date());
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
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={goToPreviousMonth}
                        disabled={isSameMonth(currentMonth, new Date())}
                        className="p-2 text-gray-400 hover:text-white transition-all cursor-pointer hover:scale-110 hover:font-semibold disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                        title="Previous month"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-white">
                            {format(currentMonth, 'MMMM yyyy')}
                        </h3>
                        <button
                            onClick={goToToday}
                            className="text-xs text-gray-400 hover:text-white cursor-pointer transition-colors"
                        >
                            Today
                        </button>
                    </div>
                    
                    <button
                        onClick={goToNextMonth}
                        className="p-2 text-gray-400 hover:text-white transition-all cursor-pointer hover:scale-110 hover:font-semibold"
                        title="Next month"
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
                            return <div key={index} className="p-3"></div>;
                        }

                        const dateString = format(date, 'yyyy-MM-dd');
                        const isSelected = selectedDate === dateString;
                        const isSelectable = isDateSelectable(date);
                        const isTodayDate = isToday(date);
                        const isPastDate = isPast(date) && !isTodayDate;

                        return (
                            <button
                                key={index}
                                onClick={() => isSelectable && onSelect(dateString)}
                                disabled={!isSelectable}
                                className={`
                                    p-3 text-sm rounded transition-all transform relative
                                    ${isSelected
                                        ? 'bg-white text-black scale-110 font-semibold shadow-lg'
                                        : isTodayDate && isSelectable
                                            ? 'bg-gray-700 text-white border border-gray-500 cursor-pointer hover:scale-105 hover:font-semibold hover:bg-gray-600'
                                            : isSelectable
                                                ? 'text-white hover:bg-gray-700 cursor-pointer hover:scale-105 hover:font-semibold'
                                                : isPastDate
                                                    ? 'text-gray-700 cursor-not-allowed'
                                                    : 'text-gray-600 cursor-not-allowed'
                                    }
                                `}
                                title={
                                    isPastDate ? 'Past date' :
                                    !isDateAvailable(barberId, dateString) ? 'Barber not available' :
                                    isSelectable ? 'Available' : 'Not available'
                                }
                            >
                                {format(date, 'd')}
                                {isTodayDate && (
                                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"></div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="mt-6 space-y-2 text-xs text-gray-500">
                    <div className="flex items-center justify-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-white rounded"></div>
                            <span>Selected</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-gray-700 rounded border border-gray-500"></div>
                            <span>Today</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-gray-700 rounded"></div>
                            <span>Available</span>
                        </div>
                    </div>
                    <p className="text-center">
                        Click on an available date to select it. Barber working days only.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DatePicker;