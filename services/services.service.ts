// services/services.service.ts
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
  message?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error?: {
    message: string;
    code: string;
  };
}

interface ServiceFilters {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

class ServicesService {
  private baseURL: string;

  constructor() {
    this.baseURL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw {
          message: data.error?.message || data.message || "Request failed",
          code: data.error?.code || "UNKNOWN_ERROR",
          status: response.status,
        };
      }

      return data;
    } catch (error: any) {
      console.error("API Request failed:", error);
      throw {
        message: error.message || "Network error",
        code: error.code || "NETWORK_ERROR",
        status: error.status || 500,
      };
    }
  }

  async getAllServices(filters?: ServiceFilters): Promise<ServicesResponse> {
    // Build query parameters from filters
    const queryParams = new URLSearchParams();

    if (filters?.category && filters.category !== "all") {
      queryParams.append("category", filters.category);
    }

    if (filters?.search) {
      queryParams.append("search", filters.search);
    }

    if (filters?.page) {
      queryParams.append("page", filters.page.toString());
    }

    if (filters?.limit) {
      queryParams.append("limit", filters.limit.toString());
    }

    const queryString = queryParams.toString();
    const endpoint = `/services${queryString ? `?${queryString}` : ""}`;

    return this.request<ServicesResponse>(endpoint, {
      method: "GET",
    });
  }

  async getServiceById(
    id: string
  ): Promise<{ success: boolean; data?: Service; error?: any }> {
    return this.request(`/services/${id}`, {
      method: "GET",
    });
  }

  // Optional: Get all categories for the filter dropdown
  async getServiceCategories(): Promise<{
    success: boolean;
    data?: string[];
    error?: any;
  }> {
    return this.request("/services/categories", {
      method: "GET",
    });
  }
}

export const servicesService = new ServicesService();
