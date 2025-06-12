import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from 'date-fns';

interface AdminDatePickerProps {
    selectedDate: string;
    onDateSelect: (date: string) => void;
}

const AdminDatePicker = ({ selectedDate, onDateSelect }: AdminDatePickerProps) => {
    const [isOpen, setIsOpen] = useState(false);
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

    const handleDateClick = (date: Date) => {
        const dateString = format(date, 'yyyy-MM-dd');
        onDateSelect(dateString);
        setIsOpen(false);
    };

    const goToPreviousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const goToToday = () => {
        const today = new Date();
        setCurrentMonth(today);
        onDateSelect(format(today, 'yyyy-MM-dd'));
        setIsOpen(false);
    };

    const formatDisplayDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, 'dd/MM/yyyy');
    };

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-2">
                Filter by Date
            </label>
            
            {/* Date Display Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none cursor-pointer hover:border-gray-500 transition-colors text-left flex items-center justify-between"
            >
                <span>{formatDisplayDate(selectedDate)}</span>
                <svg 
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Calendar Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 p-4 min-w-[300px]">
                    {/* Month Navigation */}
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={goToPreviousMonth}
                            className="p-2 text-gray-400 hover:text-white transition-all cursor-pointer hover:scale-110"
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
                        </div>
                        
                        <button
                            onClick={goToNextMonth}
                            className="p-2 text-gray-400 hover:text-white transition-all cursor-pointer hover:scale-110"
                            title="Next month"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center space-x-2 mb-4">
                        <button
                            onClick={goToToday}
                            className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-sm hover:bg-gray-600 hover:text-white transition-colors"
                        >
                            Today
                        </button>
                        <button
                            onClick={() => {
                                const yesterday = new Date();
                                yesterday.setDate(yesterday.getDate() - 1);
                                setCurrentMonth(yesterday);
                                onDateSelect(format(yesterday, 'yyyy-MM-dd'));
                                setIsOpen(false);
                            }}
                            className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-sm hover:bg-gray-600 hover:text-white transition-colors"
                        >
                            Yesterday
                        </button>
                        <button
                            onClick={() => {
                                const tomorrow = new Date();
                                tomorrow.setDate(tomorrow.getDate() + 1);
                                setCurrentMonth(tomorrow);
                                onDateSelect(format(tomorrow, 'yyyy-MM-dd'));
                                setIsOpen(false);
                            }}
                            className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-sm hover:bg-gray-600 hover:text-white transition-colors"
                        >
                            Tomorrow
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
                            const isSelected = selectedDate === dateString;
                            const isTodayDate = isToday(date);

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleDateClick(date)}
                                    className={`
                                        p-2 text-sm rounded transition-all transform hover:scale-105
                                        ${isSelected
                                            ? 'bg-white text-black font-semibold scale-105 shadow-lg'
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

                    {/* Close Button */}
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 hover:text-white transition-colors text-sm"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Backdrop */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminDatePicker;