interface ConfirmationMessageProps {
    onClose: () => void;
}

const ConfirmationMessage = ({ onClose }: ConfirmationMessageProps) => {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-8 text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">BOOKING CONFIRMED!</h2>
            <p className="text-gray-400 mb-6">
                Your appointment has been successfully booked. You'll receive a confirmation shortly.
            </p>
            <button
                onClick={onClose}
                className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
                BOOK ANOTHER APPOINTMENT
            </button>
        </div>
    );
};

export default ConfirmationMessage;