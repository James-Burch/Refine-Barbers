import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminLogin from '../components/admin/AdminLogin.tsx';
import AdminDashboard from '../components/admin/AdminDashboard.tsx';

const AdminPage = () => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <AdminLogin />;
    }

    return <AdminDashboard />;
};

export default AdminPage;