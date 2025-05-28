import { useBooking } from '../../context/BookingContext';

interface ServiceSelectorProps {
    barberId: string;
    selectedServiceId?: string;
    onSelect: (serviceId: string) => void;
    onBack: () => void;
}

const ServiceSelector = ({ barberId, selectedServiceId, onSelect, onBack }: ServiceSelectorProps) => {
    const { getAvailableServices } = useBooking();
    const services = getAvailableServices(barberId);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP'
        }).format(price);
    };

    const formatDuration = (minutes: number) => {
        if (minutes < 60) return `${minutes}min`;
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Select a Service</h2>
                <button
                    onClick={onBack}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer hover:font-semibold"
                >
                    ← Back
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                    <button
                        key={service.id}
                        onClick={() => onSelect(service.id)}
                        className={`p-6 rounded-lg border transition-all text-left cursor-pointer transform hover:scale-105 hover:font-semibold ${selectedServiceId === service.id
                                ? 'border-white bg-gray-800 scale-105 font-semibold'
                                : 'border-gray-700 hover:border-gray-500 hover:bg-gray-800'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                            <span className="text-white font-bold">{formatPrice(service.price)}</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{service.description}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Duration: {formatDuration(service.duration)}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ServiceSelector;