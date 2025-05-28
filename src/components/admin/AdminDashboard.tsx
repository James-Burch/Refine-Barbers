import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import { format } from 'date-fns';

const AdminDashboard = () => {
    const { currentUser, logout } = useAuth();
    const { bookings, barbers, services, loading, loadData } = useBooking();
    const [activeTab, setActiveTab] = useState<'bookings' | 'schedule' | 'team'>('bookings');
    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    // Refresh data when tab changes to bookings
    const handleTabChange = (tab: 'bookings' | 'schedule' | 'team') => {
        setActiveTab(tab);
        if (tab === 'bookings') {
            loadData(); // Refresh bookings data
        }
    };

    const myBookings = bookings.filter(booking => booking.barber_id === currentUser?.id);
    const todayBookings = myBookings.filter(booking => booking.date === selectedDate);

    const getServiceName = (serviceId: string) => {
        return services.find(s => s.id === serviceId)?.name || 'Unknown Service';
    };

    const getServiceDuration = (serviceId: string) => {
        return services.find(s => s.id === serviceId)?.duration || 0;
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP'
        }).format(price);
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <div className="bg-gray-900 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                <span className="text-black font-bold">R</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-white">REFINE BARBERS</h1>
                                <p className="text-sm text-gray-400">Welcome back, {currentUser?.name}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-400">
                                {currentUser?.role === 'super-admin' ? 'OWNER' : currentUser?.job_title?.toUpperCase()}
                            </span>
                            <button
                                onClick={logout}
                                className="text-gray-400 hover:text-white transition-colors cursor-pointer hover:font-semibold"
                            >
                                LOGOUT
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-2xl">
                    {/* Tabs */}
                    <div className="border-b border-gray-800">
                        <nav className="flex space-x-8 px-6">
                            {['bookings', 'schedule', ...(currentUser?.role === 'super-admin' ? ['team'] : [])].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => handleTabChange(tab as any)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm uppercase tracking-wide cursor-pointer hover:font-semibold transition-all ${activeTab === tab
                                            ? 'border-white text-white font-semibold'
                                            : 'border-transparent text-gray-400 hover:text-gray-300'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-6">
                        {/* Bookings Tab */}
                        {activeTab === 'bookings' && (
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-medium text-white">Your Bookings</h2>
                                    <button
                                        onClick={loadData}
                                        className="text-sm text-gray-400 hover:text-white cursor-pointer hover:font-semibold transition-colors"
                                    >
                                        Refresh
                                    </button>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Filter by Date
                                    </label>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none cursor-pointer"
                                    />
                                </div>

                                {loading ? (
                                    <div className="text-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                                        <p className="text-gray-400 mt-2">Loading bookings...</p>
                                    </div>
                                ) : todayBookings.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 mb-2">No bookings for {selectedDate}</p>
                                        <p className="text-xs text-gray-600">
                                            Total bookings in system: {myBookings.length}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="overflow-hidden border border-gray-800 rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-800">
                                            <thead className="bg-black">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                                        Time
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                                        Customer
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                                        Service
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                                        Contact
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-gray-900 divide-y divide-gray-800">
                                                {todayBookings.map((booking) => (
                                                    <tr key={booking.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                                            {booking.time} ({getServiceDuration(booking.service_id)}min)
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                                            {booking.customer_name}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                            {getServiceName(booking.service_id)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                            <div>{booking.customer_phone}</div>
                                                            {booking.customer_email && (
                                                                <div className="text-xs">{booking.customer_email}</div>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="px-2 py-1 text-xs font-semibold rounded bg-green-900 text-green-200">
                                                                {booking.status.toUpperCase()}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* Debug info */}
                                {process.env.NODE_ENV === 'development' && (
                                    <div className="mt-4 p-3 bg-gray-800 rounded text-xs text-gray-400">
                                        <p>Debug: Total bookings: {bookings.length}, My bookings: {myBookings.length}, Today: {todayBookings.length}</p>
                                        <p>Current user ID: {currentUser?.id}</p>
                                        <p>Selected date: {selectedDate}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Schedule Tab */}
                        {activeTab === 'schedule' && currentUser && (
                            <div>
                                <h2 className="text-lg font-medium text-white mb-4">Manage Your Schedule</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-300 mb-3">Working Days</h3>
                                        <div className="space-y-2">
                                            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                                                <label key={day} className="flex items-center p-2 border border-gray-700 rounded hover:bg-gray-800 transition-colors cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={currentUser.working_days.includes(day)}
                                                        onChange={(e) => {
                                                            console.log('Schedule update would happen here');
                                                        }}
                                                        className="h-4 w-4 text-white focus:ring-white border-gray-600 rounded cursor-pointer"
                                                    />
                                                    <span className="ml-3 text-sm text-white uppercase">{day}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-300 mb-3">Working Hours</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs text-gray-400 mb-1">Start Time</label>
                                                <input
                                                    type="time"
                                                    value={currentUser.working_hours.start}
                                                    onChange={(e) => {
                                                        console.log('Start time update would happen here');
                                                    }}
                                                    className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white cursor-pointer"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-400 mb-1">End Time</label>
                                                <input
                                                    type="time"
                                                    value={currentUser.working_hours.end}
                                                    onChange={(e) => {
                                                        console.log('End time update would happen here');
                                                    }}
                                                    className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Team Tab */}
                        {activeTab === 'team' && currentUser?.role === 'super-admin' && (
                            <div>
                                <h2 className="text-lg font-medium text-white mb-4">Team Overview</h2>

                                <div className="space-y-4">
                                    {barbers.map(barber => (
                                        <div key={barber.id} className="border border-gray-700 rounded-lg p-4 bg-black">
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center space-x-4">
                                                    {barber.image_url && (
                                                        <img
                                                            src={barber.image_url}
                                                            alt={barber.name}
                                                            className="w-12 h-12 rounded-full object-cover"
                                                        />
                                                    )}
                                                    <div>
                                                        <h3 className="font-medium text-white">{barber.name}</h3>
                                                        <p className="text-sm text-gray-400">{barber.job_title}</p>
                                                        <p className="text-xs text-gray-500">@{barber.instagram_handle}</p>
                                                    </div>
                                                </div>
                                                <div className="text-sm text-gray-400 text-right">
                                                    <p>Hours: {barber.working_hours.start} - {barber.working_hours.end}</p>
                                                    <p>Days: {barber.working_days.length} days/week</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;