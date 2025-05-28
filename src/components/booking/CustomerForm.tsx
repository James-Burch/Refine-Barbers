import { useState } from 'react';
import { BookingFormData } from '../../types';

interface CustomerFormProps {
    formData: Partial<BookingFormData>;
    onSubmit: (data: {
        customerName: string;
        customerPhone: string;
        customerEmail?: string;
        smsReminder: boolean;
        emailReminder: boolean;
    }) => void;
    onBack: () => void;
    loading: boolean;
}

const CustomerForm = ({ formData, onSubmit, onBack, loading }: CustomerFormProps) => {
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [smsReminder, setSmsReminder] = useState(formData.smsReminder || true);
    const [emailReminder, setEmailReminder] = useState(formData.emailReminder || true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted with:', {
            customerName,
            customerPhone,
            customerEmail,
            smsReminder,
            emailReminder
        });

        onSubmit({
            customerName,
            customerPhone,
            customerEmail: customerEmail || undefined,
            smsReminder,
            emailReminder
        });
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Your Details</h2>
                <button
                    onClick={onBack}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer hover:font-semibold"
                >
                    ← Back
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none"
                            placeholder="07XXX XXXXXX"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address (Optional)
                    </label>
                    <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none"
                        placeholder="your.email@example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                        Reminder Preferences
                    </label>
                    <div className="space-y-3">
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={smsReminder}
                                onChange={(e) => setSmsReminder(e.target.checked)}
                                disabled={!customerPhone}
                                className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-white focus:ring-white cursor-pointer"
                            />
                            <span className="text-white text-sm">SMS reminder (24 hours before)</span>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={emailReminder}
                                onChange={(e) => setEmailReminder(e.target.checked)}
                                disabled={!customerEmail}
                                className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-white focus:ring-white cursor-pointer"
                            />
                            <span className="text-white text-sm">Email reminder (24 hours before)</span>
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading || !customerName || !customerPhone}
                    className="w-full bg-white text-black py-3 px-4 rounded-lg font-medium hover:bg-gray-100 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed transition-all cursor-pointer transform hover:scale-105 hover:font-semibold"
                >
                    {loading ? 'BOOKING...' : 'CONFIRM BOOKING'}
                </button>
            </form>
        </div>
    );
};

export default CustomerForm;