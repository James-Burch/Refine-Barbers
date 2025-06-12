import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import { format } from 'date-fns';
import AdminDatePicker from './AdminDatePicker';
import EditBookingModal from './EditBookingModal';

const AdminDashboard = () => {
    const { currentUser, logout } = useAuth();
    const { bookings, barbers, services, loading, loadData, updateBooking, deleteBooking } = useBooking();
    const [activeTab, setActiveTab] = useState<'bookings' | 'schedule' | 'team'>('bookings');
    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [editingBooking, setEditingBooking] = useState<any | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    // Refresh data when tab changes to bookings
    const handleTabChange = (tab: 'bookings' | 'schedule' | 'team') => {
        setActiveTab(tab);
        if (tab === 'bookings') {
            loadData(); // Refresh bookings data
        }
    };

    const myBookings = currentUser?.role === 'super-admin' 
        ? bookings 
        : bookings.filter(booking => booking.barber_id === currentUser?.id);
    const todayBookings = myBookings.filter(booking => booking.date === selectedDate);

    const getServiceName = (serviceId: string) => {
        return services.find(s => s.id === serviceId)?.name || 'Unknown Service';
    };

    const getServiceDuration = (serviceId: string) => {
        return services.find(s => s.id === serviceId)?.duration || 0;
    };

    const getBarberName = (barberId: string) => {
        return barbers.find(b => b.id === barberId)?.name || 'Unknown Barber';
    };

    const handleEditBooking = (booking: any) => {
        setEditingBooking(booking);
    };

    const handleUpdateBooking = async (bookingId: string, updates: Partial<any>) => {
        setIsUpdating(true);
        try {
            const success = await updateBooking(bookingId, updates);
            if (success) {
                setEditingBooking(null);
                await loadData(); // Refresh the data
            } else {
                console.error('Failed to update booking');
            }
        } catch (error) {
            console.error('Error updating booking:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeleteBooking = async (bookingId: string) => {
        if (!confirm('Are you sure you want to delete this booking?')) return;

        try {
            const success = await deleteBooking(bookingId);
            if (success) {
                await loadData(); // Refresh the data
            } else {
                console.error('Failed to delete booking');
            }
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'bg-green-900 text-green-200';
            case 'cancelled': return 'bg-red-900 text-red-200';
            case 'completed': return 'bg-blue-900 text-blue-200';
            default: return 'bg-gray-900 text-gray-200';
        }
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
                                    <h2 className="text-lg font-medium text-white">
                                        {currentUser?.role === 'super-admin' ? 'All Bookings' : 'Your Bookings'}
                                    </h2>
                                    <button
                                        onClick={loadData}
                                        className="text-sm text-gray-400 hover:text-white cursor-pointer hover:font-semibold transition-colors"
                                    >
                                        Refresh
                                    </button>
                                </div>

                                <div className="mb-6">
                                    <AdminDatePicker 
                                        selectedDate={selectedDate}
                                        onDateSelect={setSelectedDate}
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
                                                    {currentUser?.role === 'super-admin' && (
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                                            Barber
                                                        </th>
                                                    )}
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
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-gray-900 divide-y divide-gray-800">
                                                {todayBookings.map((booking) => (
                                                    <tr key={booking.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                                            {booking.time} ({getServiceDuration(booking.service_id)}min)
                                                        </td>
                                                        {currentUser?.role === 'super-admin' && (
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                                                {getBarberName(booking.barber_id)}
                                                            </td>
                                                        )}
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
                                                            <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(booking.status)}`}>
                                                                {booking.status.toUpperCase()}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            <div className="flex space-x-2">
                                                                <button
                                                                    onClick={() => handleEditBooking(booking)}
                                                                    className="text-blue-400 hover:text-blue-300 cursor-pointer"
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteBooking(booking.id)}
                                                                    className="text-red-400 hover:text-red-300 cursor-pointer"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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
                                                        onChange={() => console.log('Schedule update would happen here')}
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
                                                    onChange={() => console.log('Start time update would happen here')}
                                                    className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white cursor-pointer"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-400 mb-1">End Time</label>
                                                <input
                                                    type="time"
                                                    value={currentUser.working_hours.end}
                                                    onChange={() => console.log('End time update would happen here')}
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

            {/* Edit Booking Modal */}
            {editingBooking && (
                <EditBookingModal
                    booking={editingBooking}
                    barbers={barbers}
                    services={services}
                    isUpdating={isUpdating}
                    onUpdate={handleUpdateBooking}
                    onClose={() => setEditingBooking(null)}
                />
            )}
        </div>
    );
};

export default AdminDashboard;