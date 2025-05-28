import { useBooking } from '../../context/BookingContext';

interface BarberSelectorProps {
    selectedBarberId?: string;
    onSelect: (barberId: string) => void;
}

const BarberSelector = ({ selectedBarberId, onSelect }: BarberSelectorProps) => {
    const { barbers, loading } = useBooking();

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                <p className="text-gray-400 mt-2">Loading barbers...</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl font-bold text-white mb-6">Choose Your Barber</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {barbers.map((barber) => (
                    <button
                        key={barber.id}
                        onClick={() => onSelect(barber.id)}
                        className={`p-6 rounded-lg border transition-all cursor-pointer transform hover:scale-105 hover:font-semibold ${selectedBarberId === barber.id
                                ? 'border-white bg-gray-800 scale-105 font-semibold'
                                : 'border-gray-700 hover:border-gray-500 hover:bg-gray-800'
                            }`}
                    >
                        <div className="text-center">
                            {barber.image_url && (
                                <img
                                    src={barber.image_url}
                                    alt={barber.name}
                                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                                />
                            )}
                            <h3 className="text-lg font-semibold text-white mb-2">{barber.name}</h3>
                            <p className="text-sm text-gray-400 mb-1">{barber.job_title}</p>
                            {barber.instagram_handle && (
                                <p className="text-xs text-gray-500">@{barber.instagram_handle}</p>
                            )}
                            <div className="mt-3 text-xs text-gray-500">
                                {barber.working_hours.start} - {barber.working_hours.end}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BarberSelector;