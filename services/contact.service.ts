// services/contactService.ts

import {
  ContactRequest,
  QuickEnquiryRequest,
  ContactResponse,
  PaginationQuery,
  EnquiryFilters,
  SupportTicketFilters,
  UpdateEnquiryStatusRequest,
  UpdateSupportTicketRequest,
  BulkUpdateRequest,
  ExportQuery,
  CloseTicketRequest,
} from "@/types/enquiry";

export class ContactService {
  private baseURL: string;
  private token?: string;

  constructor() {
    this.baseURL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";
  }

  setAuthToken(token: string): void {
    this.token = token;
  }

  clearAuthToken(): void {
    this.token = undefined;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const config: RequestInit = {
      headers,
      ...options,
      credentials: "include", // For cookies if needed
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        const error: any = new Error(data.message || "Request failed");
        error.code = data.error?.code || "UNKNOWN_ERROR";
        error.status = response.status;
        error.details = data.error?.details || data.errors;
        throw error;
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Network error occurred");
    }
  }

  // ==================== PUBLIC METHODS ====================

  async submitContact(data: ContactRequest): Promise<ContactResponse> {
    return this.request<ContactResponse>("/enquiry/support", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        priority: data.priority || "MEDIUM",
        category: data.category || "OTHER",
      }),
    });
  }

  async submitQuickEnquiry(
    data: QuickEnquiryRequest
  ): Promise<ContactResponse> {
    return this.request<ContactResponse>("/enquiry/quick", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        type: data.type || "QUICK_ENQUIRY",
      }),
    });
  }

  async getSupportTicketByNumber(
    ticketNumber: string
  ): Promise<ContactResponse> {
    return this.request<ContactResponse>(`/enquiry/ticket/${ticketNumber}`, {
      method: "GET",
    });
  }

  // ==================== CUSTOMER METHODS ====================

  async getCustomerEnquiries(
    filters: EnquiryFilters = {},
    pagination: PaginationQuery = {}
  ): Promise<ContactResponse> {
    const queryParams = new URLSearchParams();

    if (filters.status) queryParams.append("status", filters.status);
    if (filters.type) queryParams.append("type", filters.type);
    if (filters.priority) queryParams.append("priority", filters.priority);
    if (filters.search) queryParams.append("search", filters.search);
    if (filters.dateFrom)
      queryParams.append("dateFrom", filters.dateFrom.toString());
    if (filters.dateTo) queryParams.append("dateTo", filters.dateTo.toString());

    queryParams.append("page", pagination.page?.toString() || "1");
    queryParams.append("limit", pagination.limit?.toString() || "20");
    if (pagination.sortBy) queryParams.append("sortBy", pagination.sortBy);
    if (pagination.sortOrder)
      queryParams.append("sortOrder", pagination.sortOrder);

    return this.request<ContactResponse>(
      `/enquiry/customer/enquiries?${queryParams.toString()}`,
      {
        method: "GET",
      }
    );
  }

  async getCustomerSupportTickets(
    filters: SupportTicketFilters = {},
    pagination: PaginationQuery = {}
  ): Promise<ContactResponse> {
    const queryParams = new URLSearchParams();

    if (filters.status) queryParams.append("status", filters.status);
    if (filters.priority) queryParams.append("priority", filters.priority);
    if (filters.category) queryParams.append("category", filters.category);
    if (filters.search) queryParams.append("search", filters.search);
    if (filters.dateFrom)
      queryParams.append("dateFrom", filters.dateFrom.toString());
    if (filters.dateTo) queryParams.append("dateTo", filters.dateTo.toString());

    queryParams.append("page", pagination.page?.toString() || "1");
    queryParams.append("limit", pagination.limit?.toString() || "20");
    if (pagination.sortBy) queryParams.append("sortBy", pagination.sortBy);
    if (pagination.sortOrder)
      queryParams.append("sortOrder", pagination.sortOrder);

    return this.request<ContactResponse>(
      `/enquiry/customer/support-tickets?${queryParams.toString()}`,
      {
        method: "GET",
      }
    );
  }

  async getCustomerEnquiryById(id: string): Promise<ContactResponse> {
    return this.request<ContactResponse>(`/enquiry/customer/enquiry/${id}`, {
      method: "GET",
    });
  }

  async getCustomerSupportTicketById(id: string): Promise<ContactResponse> {
    return this.request<ContactResponse>(
      `/enquiry/customer/support-ticket/${id}`,
      {
        method: "GET",
      }
    );
  }

  async cancelCustomerEnquiry(id: string): Promise<ContactResponse> {
    return this.request<ContactResponse>(`/enquiry/customer/enquiry/${id}`, {
      method: "DELETE",
    });
  }

  // ==================== ADMIN METHODS ====================

  async getEnquiries(
    filters: EnquiryFilters = {},
    pagination: PaginationQuery = {}
  ): Promise<ContactResponse> {
    const queryParams = new URLSearchParams();

    if (filters.type) queryParams.append("type", filters.type);
    if (filters.status) queryParams.append("status", filters.status);
    if (filters.priority) queryParams.append("priority", filters.priority);
    if (filters.email) queryParams.append("email", filters.email);
    if (filters.phone) queryParams.append("phone", filters.phone);
    if (filters.search) queryParams.append("search", filters.search);
    if (filters.dateFrom)
      queryParams.append("dateFrom", filters.dateFrom.toString());
    if (filters.dateTo) queryParams.append("dateTo", filters.dateTo.toString());

    queryParams.append("page", pagination.page?.toString() || "1");
    queryParams.append("limit", pagination.limit?.toString() || "20");
    if (pagination.sortBy) queryParams.append("sortBy", pagination.sortBy);
    if (pagination.sortOrder)
      queryParams.append("sortOrder", pagination.sortOrder);

    return this.request<ContactResponse>(
      `/enquiry/admin/enquiries?${queryParams.toString()}`,
      {
        method: "GET",
      }
    );
  }

  async getSupportTickets(
    filters: SupportTicketFilters = {},
    pagination: PaginationQuery = {}
  ): Promise<ContactResponse> {
    const queryParams = new URLSearchParams();

    if (filters.status) queryParams.append("status", filters.status);
    if (filters.priority) queryParams.append("priority", filters.priority);
    if (filters.category) queryParams.append("category", filters.category);
    if (filters.assignedTo)
      queryParams.append("assignedTo", filters.assignedTo);
    if (filters.search) queryParams.append("search", filters.search);
    if (filters.dateFrom)
      queryParams.append("dateFrom", filters.dateFrom.toString());
    if (filters.dateTo) queryParams.append("dateTo", filters.dateTo.toString());

    queryParams.append("page", pagination.page?.toString() || "1");
    queryParams.append("limit", pagination.limit?.toString() || "20");
    if (pagination.sortBy) queryParams.append("sortBy", pagination.sortBy);
    if (pagination.sortOrder)
      queryParams.append("sortOrder", pagination.sortOrder);

    return this.request<ContactResponse>(
      `/enquiry/admin/support-tickets?${queryParams.toString()}`,
      {
        method: "GET",
      }
    );
  }

  async searchEnquiries(
    query: string,
    filters: Partial<EnquiryFilters> = {},
    pagination: PaginationQuery = {}
  ): Promise<ContactResponse> {
    const queryParams = new URLSearchParams();

    queryParams.append("q", query);
    if (filters.type) queryParams.append("type", filters.type);
    if (filters.status) queryParams.append("status", filters.status);

    queryParams.append("page", pagination.page?.toString() || "1");
    queryParams.append("limit", pagination.limit?.toString() || "20");

    return this.request<ContactResponse>(
      `/enquiry/admin/search?${queryParams.toString()}`,
      {
        method: "GET",
      }
    );
  }

  async getEnquiryById(id: string): Promise<ContactResponse> {
    return this.request<ContactResponse>(`/enquiry/admin/enquiry/${id}`, {
      method: "GET",
    });
  }

  async getSupportTicketById(id: string): Promise<ContactResponse> {
    return this.request<ContactResponse>(
      `/enquiry/admin/support-ticket/${id}`,
      {
        method: "GET",
      }
    );
  }

  async updateEnquiryStatus(
    id: string,
    data: UpdateEnquiryStatusRequest
  ): Promise<ContactResponse> {
    return this.request<ContactResponse>(
      `/enquiry/admin/enquiry/${id}/status`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      }
    );
  }

  async updateSupportTicket(
    id: string,
    data: UpdateSupportTicketRequest
  ): Promise<ContactResponse> {
    return this.request<ContactResponse>(
      `/enquiry/admin/support-ticket/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      }
    );
  }

  async closeSupportTicket(
    id: string,
    data: CloseTicketRequest
  ): Promise<ContactResponse> {
    return this.request<ContactResponse>(
      `/enquiry/admin/support-ticket/${id}/close`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  }

  async bulkUpdateEnquiries(data: BulkUpdateRequest): Promise<ContactResponse> {
    return this.request<ContactResponse>("/enquiry/admin/bulk-update", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async exportEnquiries(query: ExportQuery = {}): Promise<ContactResponse> {
    const queryParams = new URLSearchParams();

    queryParams.append("format", query.format || "json");
    if (query.type) queryParams.append("type", query.type);
    if (query.status) queryParams.append("status", query.status);
    if (query.dateFrom) queryParams.append("dateFrom", query.dateFrom);
    if (query.dateTo) queryParams.append("dateTo", query.dateTo);

    return this.request<ContactResponse>(
      `/enquiry/admin/export?${queryParams.toString()}`,
      {
        method: "GET",
      }
    );
  }

  async getEnquiryStatistics(): Promise<ContactResponse> {
    return this.request<ContactResponse>(
      "/enquiry/admin/statistics/enquiries",
      {
        method: "GET",
      }
    );
  }

  async getSupportTicketStatistics(): Promise<ContactResponse> {
    return this.request<ContactResponse>(
      "/enquiry/admin/statistics/support-tickets",
      {
        method: "GET",
      }
    );
  }

  // ==================== SUPPORT AGENT METHODS ====================

  async getAgentEnquiries(
    filters: EnquiryFilters = {},
    pagination: PaginationQuery = {}
  ): Promise<ContactResponse> {
    const queryParams = new URLSearchParams();

    if (filters.type) queryParams.append("type", filters.type);
    if (filters.status) queryParams.append("status", filters.status);
    if (filters.search) queryParams.append("search", filters.search);
    if (filters.dateFrom)
      queryParams.append("dateFrom", filters.dateFrom.toString());
    if (filters.dateTo) queryParams.append("dateTo", filters.dateTo.toString());

    queryParams.append("page", pagination.page?.toString() || "1");
    queryParams.append("limit", pagination.limit?.toString() || "20");

    return this.request<ContactResponse>(
      `/enquiry/support/enquiries?${queryParams.toString()}`,
      {
        method: "GET",
      }
    );
  }

  async getAgentSupportTickets(
    filters: SupportTicketFilters = {},
    pagination: PaginationQuery = {}
  ): Promise<ContactResponse> {
    const queryParams = new URLSearchParams();

    if (filters.status) queryParams.append("status", filters.status);
    if (filters.priority) queryParams.append("priority", filters.priority);
    if (filters.assignedTo)
      queryParams.append("assignedTo", filters.assignedTo);
    if (filters.search) queryParams.append("search", filters.search);
    if (filters.dateFrom)
      queryParams.append("dateFrom", filters.dateFrom.toString());
    if (filters.dateTo) queryParams.append("dateTo", filters.dateTo.toString());

    queryParams.append("page", pagination.page?.toString() || "1");
    queryParams.append("limit", pagination.limit?.toString() || "20");

    return this.request<ContactResponse>(
      `/enquiry/support/support-tickets?${queryParams.toString()}`,
      {
        method: "GET",
      }
    );
  }

  async updateAgentSupportTicket(
    id: string,
    data: UpdateSupportTicketRequest
  ): Promise<ContactResponse> {
    return this.request<ContactResponse>(
      `/enquiry/support/support-ticket/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      }
    );
  }

  async getAgentSupportTicketStatistics(): Promise<ContactResponse> {
    return this.request<ContactResponse>(
      "/enquiry/support/statistics/support-tickets",
      {
        method: "GET",
      }
    );
  }
}

export const contactService = new ContactService();
