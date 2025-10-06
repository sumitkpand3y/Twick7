interface BookingResponse {
  success: boolean;
  data?: any;
  error?: {
    message: string;
    code: string;
  };
}

interface NotificationResponse {
  success: boolean;
  data?: any[];
  error?: {
    message: string;
    code: string;
  };
}

class DashboardService {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getAuthToken();

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw {
        message: data.error?.message || data.message || 'Request failed',
        code: data.error?.code || 'UNKNOWN_ERROR',
        status: response.status,
      };
    }

    return data;
  }

  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  async getMyBookings(params?: {
    status?: string;
    limit?: number;
    offset?: number;
  }): Promise<BookingResponse> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());

    return this.request<BookingResponse>(
      `/bookings/my-bookings?${queryParams.toString()}`,
      {
        method: 'GET',
      }
    );
  }

  async getBookingById(id: string): Promise<BookingResponse> {
    return this.request<BookingResponse>(`/bookings/${id}`, {
      method: 'GET',
    });
  }

  async getNotifications(params?: {
    limit?: number;
    unreadOnly?: boolean;
  }): Promise<NotificationResponse> {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.unreadOnly) queryParams.append('unreadOnly', 'true');

    return this.request<NotificationResponse>(
      `/notifications?${queryParams.toString()}`,
      {
        method: 'GET',
      }
    );
  }

  async markNotificationAsRead(id: string): Promise<{ success: boolean }> {
    return this.request(`/notifications/${id}/read`, {
      method: 'PATCH',
    });
  }

  async markAllNotificationsAsRead(): Promise<{ success: boolean }> {
    return this.request('/notifications/mark-all-read', {
      method: 'PATCH',
    });
  }

  async downloadInvoice(bookingId: string, type: 'proforma' | 'tax'): Promise<Blob> {
    const url = `${this.baseURL}/bookings/${bookingId}/invoice/${type}`;
    const token = this.getAuthToken();

    const response = await fetch(url, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to download invoice');
    }

    return response.blob();
  }

  async requestStatusUpdate(bookingId: string, message: string): Promise<{ success: boolean }> {
    return this.request(`/bookings/${bookingId}/request-update`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  async getBookingTimeline(bookingId: string): Promise<{ success: boolean; data?: any[] }> {
    return this.request(`/bookings/${bookingId}/timeline`, {
      method: 'GET',
    });
  }

  async getInvoiceDetails(bookingId: string): Promise<{ success: boolean; data?: any }> {
    return this.request(`/bookings/${bookingId}/invoice-details`, {
      method: 'GET',
    });
  }
}

export const dashboardService = new DashboardService();
