import { AddChargeRequest, AddPartRequest, Booking, BookingFilters, CreateBookingRequest, UpdateStatusRequest } from "@/types/booking.types";

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  // Booking APIs
  async getBookings(filters?: BookingFilters): Promise<Booking[]> {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters?.dateRange?.from) params.append('from', filters.dateRange.from);
    if (filters?.dateRange?.to) params.append('to', filters.dateRange.to);
    
    return this.request<Booking[]>(`/bookings?${params.toString()}`);
  }

  async getBooking(id: string): Promise<Booking> {
    return this.request<Booking>(`/bookings/${id}`);
  }

  async createBooking(data: CreateBookingRequest): Promise<Booking> {
    return this.request<Booking>('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateBookingStatus(data: UpdateStatusRequest): Promise<Booking> {
    const formData = new FormData();
    formData.append('status', data.status);
    formData.append('title', data.title);
    formData.append('description', data.description);
    if (data.image) formData.append('image', data.image);
    if (data.sendWhatsApp) formData.append('sendWhatsApp', 'true');
    if (data.sendEmail) formData.append('sendEmail', 'true');

    return this.request<Booking>(`/bookings/${data.bookingId}/status`, {
      method: 'PUT',
      headers: {}, // Remove Content-Type for FormData
      body: formData,
    });
  }

  async addParts(data: AddPartRequest): Promise<Booking> {
    return this.request<Booking>(`/bookings/${data.bookingId}/parts`, {
      method: 'POST',
      body: JSON.stringify({ parts: data.parts }),
    });
  }

  async addCharges(data: AddChargeRequest): Promise<Booking> {
    return this.request<Booking>(`/bookings/${data.bookingId}/charges`, {
      method: 'POST',
      body: JSON.stringify({ charges: data.charges }),
    });
  }

  async generateInvoice(bookingId: string): Promise<{ invoiceUrl: string; invoiceNumber: string }> {
    return this.request<{ invoiceUrl: string; invoiceNumber: string }>(`/bookings/${bookingId}/invoice`, {
      method: 'POST',
    });
  }

  async sendWhatsAppUpdate(bookingId: string, statusId: string): Promise<{ success: boolean; messageId: string }> {
    return this.request<{ success: boolean; messageId: string }>(`/bookings/${bookingId}/whatsapp/${statusId}`, {
      method: 'POST',
    });
  }

  // Upload image
  async uploadImage(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('image', file);

    return this.request<{ url: string }>('/upload/image', {
      method: 'POST',
      headers: {}, // Remove Content-Type for FormData
      body: formData,
    });
  }
}

export const apiService = new ApiService();