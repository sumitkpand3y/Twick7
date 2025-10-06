import { useState, useEffect } from 'react';
import { dashboardService } from '@/services/dashboard.service';
import toast from 'react-hot-toast';

export function useDashboard() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchBookings = async (params?: { status?: string; limit?: number }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await dashboardService.getMyBookings(params);

      if (response.success && response.data) {
        setBookings(response.data);
        return response.data;
      }

      throw new Error(response.error?.message || 'Failed to fetch bookings');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch bookings';
      setError(errorMessage);
      toast.error(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNotifications = async (params?: { limit?: number; unreadOnly?: boolean }) => {
    try {
      const response = await dashboardService.getNotifications(params);

      if (response.success && response.data) {
        setNotifications(response.data);
        const unread = response.data.filter((n: any) => n.status === 'SENT').length;
        setUnreadCount(unread);
        return response.data;
      }
    } catch (err: any) {
      console.error('Failed to fetch notifications:', err);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await dashboardService.markNotificationAsRead(id);
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, status: 'READ' } : n))
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await dashboardService.markAllNotificationsAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, status: 'READ' })));
      setUnreadCount(0);
      toast.success('All notifications marked as read');
    } catch (err) {
      toast.error('Failed to mark all as read');
    }
  };

  const downloadInvoice = async (bookingId: string, type: 'proforma' | 'tax') => {
    try {
      toast.loading('Downloading invoice...');
      const blob = await dashboardService.downloadInvoice(bookingId, type);

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${bookingId}-${type}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.dismiss();
      toast.success('Invoice downloaded successfully');
    } catch (err) {
      toast.dismiss();
      toast.error('Failed to download invoice');
    }
  };

  const requestUpdate = async (bookingId: string, message: string) => {
    try {
      await dashboardService.requestStatusUpdate(bookingId, message);
      toast.success('Update request sent successfully');
    } catch (err) {
      toast.error('Failed to send update request');
    }
  };

  const getBookingDetails = async (id: string) => {
    try {
      const response = await dashboardService.getBookingById(id);
      if (response.success && response.data) {
        return response.data;
      }
    } catch (err) {
      console.error('Failed to fetch booking details:', err);
      return null;
    }
  };

  const getTimeline = async (bookingId: string) => {
    try {
      const response = await dashboardService.getBookingTimeline(bookingId);
      if (response.success && response.data) {
        return response.data;
      }
    } catch (err) {
      console.error('Failed to fetch timeline:', err);
      return [];
    }
  };

  return {
    bookings,
    notifications,
    isLoading,
    error,
    unreadCount,
    fetchBookings,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    downloadInvoice,
    requestUpdate,
    getBookingDetails,
    getTimeline,
  };
}
