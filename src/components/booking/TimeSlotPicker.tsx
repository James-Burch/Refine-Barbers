import { useBooking } from '../../context/BookingContext';

interface TimeSlotPickerProps {
    barberId: string;
    serviceId: string;
    date: string;
    selectedTime?: string;
    onSelect: (time: string) => void;
    onBack: () => void;
}

const TimeSlotPicker = ({ barberId, serviceId, date, selectedTime, onSelect, onBack }: TimeSlotPickerProps) => {
    const { getAvailableTimeSlots, services, barbers } = useBooking();
    const timeSlots = getAvailableTimeSlots(barberId, serviceId, date);

    const service = services.find(s => s.id === serviceId);
    const barber = barbers.find(b => b.id === barberId);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const availableSlots = timeSlots.filter(slot => slot.available);

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Choose Your Time</h2>
                <button
                    onClick={onBack}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer hover:font-semibold"
                >
                    ← Back
                </button>
            </div>

            <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                <div className="text-white">
                    <p><strong>Barber:</strong> {barber?.name}</p>
                    <p><strong>Service:</strong> {service?.name} ({service?.duration}min)</p>
                    <p><strong>Date:</strong> {formatDate(date)}</p>
                </div>
            </div>

            {availableSlots.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-400 mb-4">No available time slots for this date</p>
                    <button
                        onClick={onBack}
                        className="text-white hover:text-gray-300 transition-colors cursor-pointer hover:font-semibold"
                    >
                        Choose a different date
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {availableSlots.map((slot) => (
                        <button
                            key={slot.time}
                            onClick={() => onSelect(slot.time)}
                            className={`p-3 rounded-lg border transition-all cursor-pointer transform hover:scale-105 hover:font-semibold ${selectedTime === slot.time
                                    ? 'border-white bg-white text-black scale-105 font-semibold'
                                    : 'border-gray-700 text-white hover:border-gray-500 hover:bg-gray-800'
                                }`}
                        >
                            {slot.time}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TimeSlotPicker;