import { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import BarberSelector from '../components/booking/BarberSelector';
import ServiceSelector from '../components/booking/ServiceSelector';
import DatePicker from '../components/booking/DatePicker';
import TimeSlotPicker from '../components/booking/TimeSlotPicker';
import CustomerForm from '../components/booking/CustomerForm';
import ConfirmationMessage from '../components/booking/ConfirmationMessage';
import { BookingFormData } from '../types';

const BookingPage = () => {
    const { createBooking, loading } = useBooking();
    const [step, setStep] = useState(1);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState<Partial<BookingFormData>>({
        smsReminder: true,
        emailReminder: true
    });

    const updateFormData = (updates: Partial<BookingFormData>) => {
        setFormData(prev => ({ ...prev, ...updates }));
    };

    const handleSubmit = async (customerData: {
        customerName: string;
        customerPhone: string;
        customerEmail?: string;
        smsReminder: boolean;
        emailReminder: boolean;
    }) => {
        const completeFormData: BookingFormData = {
            ...formData,
            ...customerData
        } as BookingFormData;

        console.log('Submitting booking:', completeFormData);
        const success = await createBooking(completeFormData);
        if (success) {
            setIsSuccess(true);
        }
    };

    const resetForm = () => {
        setIsSuccess(false);
        setStep(1);
        setFormData({ smsReminder: true, emailReminder: true });
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <ConfirmationMessage onClose={resetForm} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black py-20">
            <div className="max-w-4xl mx-auto px-4">
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-center space-x-4 mb-4">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <div
                                key={num}
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${num <= step
                                        ? 'bg-white text-black'
                                        : 'bg-gray-800 text-gray-400'
                                    }`}
                            >
                                {num}
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-white mb-2">BOOK YOUR APPOINTMENT</h1>
                        <p className="text-gray-400">
                            {step === 1 && 'Choose your barber'}
                            {step === 2 && 'Select a service'}
                            {step === 3 && 'Pick a date'}
                            {step === 4 && 'Choose your time'}
                            {step === 5 && 'Complete your booking'}
                        </p>
                    </div>
                </div>

                {/* Booking Steps */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    {step === 1 && (
                        <BarberSelector
                            selectedBarberId={formData.barberId}
                            onSelect={(barberId) => {
                                updateFormData({ barberId });
                                // Auto-progress after selection
                                setTimeout(() => setStep(2), 100);
                            }}
                        />
                    )}

                    {step === 2 && formData.barberId && (
                        <ServiceSelector
                            barberId={formData.barberId}
                            selectedServiceId={formData.serviceId}
                            onSelect={(serviceId) => {
                                updateFormData({ serviceId });
                                // Auto-progress after selection
                                setTimeout(() => setStep(3), 100);
                            }}
                            onBack={() => setStep(1)}
                        />
                    )}

                    {step === 3 && formData.barberId && (
                        <DatePicker
                            barberId={formData.barberId}
                            selectedDate={formData.date}
                            onSelect={(date) => {
                                updateFormData({ date });
                                // Auto-progress after selection
                                setTimeout(() => setStep(4), 100);
                            }}
                            onBack={() => setStep(2)}
                        />
                    )}

                    {step === 4 && formData.barberId && formData.serviceId && formData.date && (
                        <TimeSlotPicker
                            barberId={formData.barberId}
                            serviceId={formData.serviceId}
                            date={formData.date}
                            selectedTime={formData.time}
                            onSelect={(time) => {
                                updateFormData({ time });
                                // Auto-progress after selection
                                setTimeout(() => setStep(5), 100);
                            }}
                            onBack={() => setStep(3)}
                        />
                    )}

                    {step === 5 && (
                        <CustomerForm
                            formData={formData}
                            onSubmit={handleSubmit}
                            onBack={() => setStep(4)}
                            loading={loading}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingPage;