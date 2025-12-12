// types/enquiry.ts

export interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  category?:
    | "TECHNICAL"
    | "BILLING"
    | "SERVICE"
    | "COMPLAINT"
    | "SUGGESTION"
    | "FEEDBACK"
    | "OTHER";
}

export interface QuickEnquiryRequest {
  name: string;
  phone: string;
  email?: string;
  serviceType?: string;
  vehicleBrand?: string;
  vehicleModel?: string;
  message?: string;
  preferredDate?: string;
  preferredTime?: string;
  type?: "QUICK_ENQUIRY" | "GENERAL" | "SERVICE" | "TEST_DRIVE" | "CORPORATE";
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  data?: {
    id: string;
    createdAt: string;
    ticketNumber?: string; // For support tickets
    [key: string]: any;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
  error?: {
    message: string;
    code: string;
    details?: any[];
  };
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface EnquiryFilters {
  type?: string;
  status?: string;
  priority?: string;
  dateFrom?: Date | string;
  dateTo?: Date | string;
  search?: string;
}

export interface SupportTicketFilters {
  status?: string;
  priority?: string;
  category?: string;
  assignedTo?: string;
  dateFrom?: Date | string;
  dateTo?: Date | string;
  search?: string;
}

export interface UpdateEnquiryStatusRequest {
  status: "NEW" | "IN_PROGRESS" | "RESPONDED" | "CLOSED" | "CANCELLED";
  response?: string;
}

export interface UpdateSupportTicketRequest {
  status?: "OPEN" | "IN_PROGRESS" | "ON_HOLD" | "RESOLVED" | "CLOSED";
  priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  assignedTo?: string;
  resolution?: string;
  response?: string;
}

export interface BulkUpdateRequest {
  enquiryIds: string[];
  status: "NEW" | "IN_PROGRESS" | "RESPONDED" | "CLOSED" | "CANCELLED";
  response?: string;
}

export interface ExportQuery {
  format?: "json" | "csv";
  type?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface CloseTicketRequest {
  resolution: string;
}
