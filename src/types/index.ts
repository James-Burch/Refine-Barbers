export interface Barber {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'super-admin';
    working_days: string[];
    working_hours: {
        start: string;
        end: string;
    };
    image_url?: string;
    instagram_handle?: string;
    job_title?: string;
}

export interface Service {
    id: string;
    service_key: string;
    name: string;
    duration: number; // in minutes
    price: number;
    description: string;
    is_active: boolean;
}

export interface Booking {
    id: string;
    barber_id: string;
    service_id: string;
    date: string;
    time: string;
    customer_name: string;
    customer_phone: string;
    customer_email?: string;
    sms_reminder: boolean;
    email_reminder: boolean;
    status: 'confirmed' | 'cancelled' | 'completed';
    created_at: string;
}

export interface BookingFormData {
    barberId: string;
    serviceId: string;
    date: string;
    time: string;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    smsReminder: boolean;
    emailReminder: boolean;
}

export interface TimeSlot {
    time: string;
    available: boolean;
}