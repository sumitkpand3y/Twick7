interface ContactRequest {
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
}

interface QuickEnquiryRequest {
  name: string;
  mobile: string;
  email?: string;
  serviceType?: string;
  vehicleBrand?: string;
  message?: string;
}

interface ContactResponse {
  success: boolean;
  message?: string;
  data?: {
    id: string;
    createdAt: string;
  };
  error?: {
    message: string;
    code: string;
  };
}

class ContactService {
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

  async submitContact(data: ContactRequest): Promise<ContactResponse> {
    return this.request<ContactResponse>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async submitQuickEnquiry(data: QuickEnquiryRequest): Promise<ContactResponse> {
    return this.request<ContactResponse>('/enquiry', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const contactService = new ContactService();
