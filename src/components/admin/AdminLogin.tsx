import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const { login, loading } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const success = await login(email, password);
        if (!success) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-black font-bold text-xl">R</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">REFINE BARBERS</h1>
                    <p className="text-gray-400 text-sm">Admin Portal</p>
                </div>

                <div className="space-y-4 mb-6">
                    <button
                        onClick={() => navigate('/booking')}
                        className="w-full bg-white text-black py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                    >
                        CUSTOMER BOOKING
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-900 text-gray-500">OR</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none"
                            placeholder="rob@refinebarbershop.co.uk"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {error && (
                        <div className="text-red-400 text-sm">{error}</div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700 disabled:opacity-50"
                    >
                        {loading ? 'SIGNING IN...' : 'ADMIN LOGIN'}
                    </button>
                </form>

                <div className="mt-6 text-xs text-gray-500 border-t border-gray-800 pt-4">
                    <p className="font-semibold mb-2">Demo Accounts:</p>
                    <p>rob@refinebarbershop.co.uk (Owner)</p>
                    <p>josh@refinebarbershop.co.uk (Mens Stylist)</p>
                    <p>cole@refinebarbershop.co.uk (Barber)</p>
                    <p className="mt-1">Password: demo123</p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;