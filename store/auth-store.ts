'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Booking, Notification, BookingStatusHistory } from '@/types';

interface AuthStore {
  user: User | null;
  isAuthModalOpen: boolean;
  bookings: Booking[];
  notifications: Notification[];
  setUser: (user: User | null) => void;
  setAuthModalOpen: (open: boolean) => void;
  login: (email: string, otp: string) => Promise<boolean>;
  logout: () => void;
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (notificationId: string) => void;
  sendWhatsAppNotification: (message: string, phoneNumber: string) => void;
}

const dummyBookings: Booking[] = [
  {
    id: '1',
    userId: '1',
    carModel: 'Swift',
    plateNumber: 'MH12AB1234',
    serviceType: 'Basic Service, AC Service',
    services: ['Basic Service', 'AC Service'],
    status: 'in-service',
    date: '2024-01-20',
    time: '10:00 AM',
    price: 4498,
    estimatedCompletion: '2024-01-20 16:00',
    currentLocation: 'Service Center - Andheri',
    statusHistory: [
      {
        status: 'scheduled',
        timestamp: '2024-01-19 14:30',
        description: 'Service booked successfully',
        estimatedTime: '2024-01-20 10:00'
      },
      {
        status: 'pickup-scheduled',
        timestamp: '2024-01-20 09:00',
        description: 'Pickup scheduled for 10:00 AM',
        estimatedTime: '2024-01-20 10:00'
      },
      {
        status: 'picked-up',
        timestamp: '2024-01-20 10:15',
        description: 'Vehicle picked up from your location',
        estimatedTime: '2024-01-20 11:00'
      },
      {
        status: 'in-service',
        timestamp: '2024-01-20 11:30',
        description: 'Service in progress - Oil change and AC service',
        estimatedTime: '2024-01-20 15:00'
      }
    ]
  },
  {
    id: '2',
    userId: '1',
    carModel: 'Creta',
    plateNumber: 'MH12CD5678',
    serviceType: 'Comprehensive Service, Battery Replacement',
    services: ['Comprehensive Service', 'Battery Replacement'],
    status: 'ready-for-delivery',
    date: '2024-01-18',
    time: '2:00 PM',
    price: 11499,
    estimatedCompletion: '2024-01-18 18:00',
    currentLocation: 'Ready for Pickup',
    statusHistory: [
      {
        status: 'scheduled',
        timestamp: '2024-01-17 16:00',
        description: 'Service booked successfully'
      },
      {
        status: 'pickup-scheduled',
        timestamp: '2024-01-18 13:00',
        description: 'Pickup scheduled for 2:00 PM'
      },
      {
        status: 'picked-up',
        timestamp: '2024-01-18 14:15',
        description: 'Vehicle picked up from your location'
      },
      {
        status: 'in-service',
        timestamp: '2024-01-18 15:00',
        description: 'Comprehensive service in progress'
      },
      {
        status: 'washing',
        timestamp: '2024-01-18 17:00',
        description: 'Vehicle washing and detailing'
      },
      {
        status: 'quality-check',
        timestamp: '2024-01-18 17:30',
        description: 'Final quality check completed'
      },
      {
        status: 'ready-for-delivery',
        timestamp: '2024-01-18 18:00',
        description: 'Vehicle ready for delivery'
      }
    ]
  },
  {
    id: '3',
    userId: '1',
    carModel: 'Baleno',
    plateNumber: 'MH12EF9012',
    serviceType: 'AC Service',
    services: ['AC Service'],
    status: 'completed',
    date: '2024-01-15',
    time: '11:30 AM',
    price: 1999,
    statusHistory: [
      {
        status: 'scheduled',
        timestamp: '2024-01-14 10:00',
        description: 'Service booked successfully'
      },
      {
        status: 'completed',
        timestamp: '2024-01-15 14:30',
        description: 'Service completed and vehicle delivered'
      }
    ]
  },
];

const dummyNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'Service In Progress',
    message: 'Your Swift (MH12AB1234) service is currently in progress. Estimated completion: 4:00 PM',
    type: 'info',
    timestamp: '2024-01-20 11:30',
    read: false,
    whatsappSent: true
  },
  {
    id: '2',
    userId: '1',
    title: 'Ready for Delivery',
    message: 'Your Creta (MH12CD5678) is ready for delivery. Please confirm pickup time.',
    type: 'success',
    timestamp: '2024-01-18 18:00',
    read: false,
    whatsappSent: true
  },
  {
    id: '3',
    userId: '1',
    title: 'Service Completed',
    message: 'Your Baleno (MH12EF9012) service has been completed successfully. Thank you for choosing us!',
    type: 'success',
    timestamp: '2024-01-15 14:30',
    read: true,
    whatsappSent: true
  }
];
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthModalOpen: false,
      bookings: dummyBookings,
      notifications: dummyNotifications,
      setUser: (user) => set({ user }),
      setAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
      login: async (email: string, otp: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (otp === '1234') {
          const user: User = {
            id: '1',
            name: 'John Doe',
            email,
            mobile: '+91 9876543210',
            isAuthenticated: true,
          };
          set({ user, isAuthModalOpen: false });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null }),
      addBooking: (booking) =>
        set((state) => ({
          bookings: [...state.bookings, booking],
        })),
      updateBookingStatus: (bookingId, status) =>
        set((state) => ({
          bookings: state.bookings.map((booking) =>
            booking.id === bookingId ? { ...booking, status } : booking
          ),
        })),
      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications],
        })),
      markNotificationAsRead: (notificationId) =>
        set((state) => ({
          notifications: state.notifications.map((notification) =>
            notification.id === notificationId
              ? { ...notification, read: true }
              : notification
          ),
        })),
      sendWhatsAppNotification: (message: string, phoneNumber: string) => {
        // Simulate WhatsApp API call
        const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
        console.log('WhatsApp notification sent:', whatsappUrl);
        // In real implementation, you would use Twilio WhatsApp API or similar
      },
    }),
    {
      name: 'auth-store',
    }
  )
);