interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration?: string;
  category?: string;
  isPopular?: boolean;
  features?: string[];
}

interface ServicesResponse {
  success: boolean;
  data?: Service[];
  error?: {
    message: string;
    code: string;
  };
}

class ServicesService {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/services';
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

  async getAllServices(category?: string): Promise<ServicesResponse> {
    const queryParams = category ? `?category=${category}` : '';
    return this.request<ServicesResponse>(`/services${queryParams}`, {
      method: 'GET',
    });
  }

  async getServiceById(id: string): Promise<{ success: boolean; data?: Service; error?: any }> {
    return this.request(`/services/${id}`, {
      method: 'GET',
    });
  }
}

export const servicesService = new ServicesService();
