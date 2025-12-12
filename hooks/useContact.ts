// hooks/useContact.ts

import { useState, useCallback, useEffect } from "react";
import { contactService } from "@/services/contact.service";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
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

interface FieldErrors {
  [key: string]: string;
}

interface UseContactReturn {
  // State
  isLoading: boolean;
  error: string | null;
  fieldErrors: FieldErrors;
  data: any | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  } | null;

  // Public methods
  submitContact: (data: ContactRequest) => Promise<boolean>;
  submitQuickEnquiry: (data: QuickEnquiryRequest) => Promise<boolean>;
  getSupportTicketByNumber: (
    ticketNumber: string
  ) => Promise<ContactResponse | null>;

  // Customer methods
  getCustomerEnquiries: (
    filters?: EnquiryFilters,
    pagination?: PaginationQuery
  ) => Promise<boolean>;
  getCustomerSupportTickets: (
    filters?: SupportTicketFilters,
    pagination?: PaginationQuery
  ) => Promise<boolean>;
  getCustomerEnquiryById: (id: string) => Promise<ContactResponse | null>;
  getCustomerSupportTicketById: (id: string) => Promise<ContactResponse | null>;
  cancelCustomerEnquiry: (id: string) => Promise<boolean>;

  // Admin methods
  getEnquiries: (
    filters?: EnquiryFilters,
    pagination?: PaginationQuery
  ) => Promise<boolean>;
  getSupportTickets: (
    filters?: SupportTicketFilters,
    pagination?: PaginationQuery
  ) => Promise<boolean>;
  searchEnquiries: (
    query: string,
    filters?: Partial<EnquiryFilters>,
    pagination?: PaginationQuery
  ) => Promise<boolean>;
  getEnquiryById: (id: string) => Promise<ContactResponse | null>;
  getSupportTicketById: (id: string) => Promise<ContactResponse | null>;
  updateEnquiryStatus: (
    id: string,
    data: UpdateEnquiryStatusRequest
  ) => Promise<boolean>;
  updateSupportTicket: (
    id: string,
    data: UpdateSupportTicketRequest
  ) => Promise<boolean>;
  closeSupportTicket: (
    id: string,
    data: CloseTicketRequest
  ) => Promise<boolean>;
  bulkUpdateEnquiries: (data: BulkUpdateRequest) => Promise<boolean>;
  exportEnquiries: (query?: ExportQuery) => Promise<Blob | null>;
  getEnquiryStatistics: () => Promise<ContactResponse | null>;
  getSupportTicketStatistics: () => Promise<ContactResponse | null>;

  // Support agent methods
  getAgentEnquiries: (
    filters?: EnquiryFilters,
    pagination?: PaginationQuery
  ) => Promise<boolean>;
  getAgentSupportTickets: (
    filters?: SupportTicketFilters,
    pagination?: PaginationQuery
  ) => Promise<boolean>;
  updateAgentSupportTicket: (
    id: string,
    data: UpdateSupportTicketRequest
  ) => Promise<boolean>;
  getAgentSupportTicketStatistics: () => Promise<ContactResponse | null>;

  // Utility methods
  clearErrors: () => void;
  clearData: () => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export function useContact(): UseContactReturn {
  const { user, token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [data, setData] = useState<any | null>(null);
  const [pagination, setPagination] =
    useState<UseContactReturn["pagination"]>(null);

  // Set auth token when user logs in
  useEffect(() => {
    if (token) {
      contactService.setAuthToken(token);
    }
  }, [token]);

  const handleApiCall = useCallback(
    async <T>(
      apiCall: () => Promise<T>,
      successMessage?: string,
      errorMessage?: string
    ): Promise<T | null> => {
      setIsLoading(true);
      setError(null);
      setFieldErrors({});

      try {
        const response = await apiCall();

        if (successMessage && (response as any)?.success !== false) {
          toast.success(successMessage);
        }

        return response;
      } catch (err: any) {
        const errorMsg = errorMessage || err.message || "An error occurred";
        setError(errorMsg);

        // Handle validation errors
        if (err.code === "VALIDATION_ERROR" || err.details) {
          const errors: FieldErrors = {};
          if (err.details) {
            err.details.forEach((detail: any) => {
              if (detail.field && detail.message) {
                errors[detail.field] = detail.message;
              }
            });
          }
          setFieldErrors(errors);
          toast.error("Please check the form for errors");
        } else {
          toast.error(errorMsg);
        }

        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // ==================== PUBLIC METHODS ====================

  const submitContact = useCallback(
    async (data: ContactRequest): Promise<boolean> => {
      const response = await handleApiCall(
        () => contactService.submitContact(data),
        "Message sent successfully! We will contact you soon.",
        "Failed to send message"
      );

      return !!response?.success;
    },
    [handleApiCall]
  );

  const submitQuickEnquiry = useCallback(
    async (data: QuickEnquiryRequest): Promise<boolean> => {
      const response = await handleApiCall(
        () => contactService.submitQuickEnquiry(data),
        "Enquiry submitted successfully! We will contact you soon.",
        "Failed to submit enquiry"
      );

      return !!response?.success;
    },
    [handleApiCall]
  );

  const getSupportTicketByNumber = useCallback(
    async (ticketNumber: string): Promise<ContactResponse | null> => {
      return handleApiCall(
        () => contactService.getSupportTicketByNumber(ticketNumber),
        undefined,
        "Failed to fetch ticket"
      );
    },
    [handleApiCall]
  );

  // ==================== CUSTOMER METHODS ====================

  const getCustomerEnquiries = useCallback(
    async (
      filters: EnquiryFilters = {},
      paginationQuery: PaginationQuery = {}
    ): Promise<boolean> => {
      if (!user) {
        toast.error("Please login to view your enquiries");
        return false;
      }

      const response = await handleApiCall(
        () => contactService.getCustomerEnquiries(filters, paginationQuery),
        undefined,
        "Failed to fetch enquiries"
      );

      if (response?.success) {
        setData(response.data);
        setPagination(
          response.meta
            ? {
                page: response.meta.page || 1,
                limit: response.meta.limit || 20,
                total: response.meta.total || 0,
                totalPages: response.meta.totalPages || 1,
                hasNext:
                  (response.meta.page || 1) < (response.meta.totalPages || 1),
                hasPrevious: (response.meta.page || 1) > 1,
              }
            : null
        );
        return true;
      }

      return false;
    },
    [user, handleApiCall]
  );

  const getCustomerSupportTickets = useCallback(
    async (
      filters: SupportTicketFilters = {},
      paginationQuery: PaginationQuery = {}
    ): Promise<boolean> => {
      if (!user) {
        toast.error("Please login to view your support tickets");
        return false;
      }

      const response = await handleApiCall(
        () =>
          contactService.getCustomerSupportTickets(filters, paginationQuery),
        undefined,
        "Failed to fetch support tickets"
      );

      if (response?.success) {
        setData(response.data);
        setPagination(
          response.meta
            ? {
                page: response.meta.page || 1,
                limit: response.meta.limit || 20,
                total: response.meta.total || 0,
                totalPages: response.meta.totalPages || 1,
                hasNext:
                  (response.meta.page || 1) < (response.meta.totalPages || 1),
                hasPrevious: (response.meta.page || 1) > 1,
              }
            : null
        );
        return true;
      }

      return false;
    },
    [user, handleApiCall]
  );

  const getCustomerEnquiryById = useCallback(
    async (id: string): Promise<ContactResponse | null> => {
      if (!user) {
        toast.error("Please login to view enquiry details");
        return null;
      }

      return handleApiCall(
        () => contactService.getCustomerEnquiryById(id),
        undefined,
        "Failed to fetch enquiry"
      );
    },
    [user, handleApiCall]
  );

  const getCustomerSupportTicketById = useCallback(
    async (id: string): Promise<ContactResponse | null> => {
      if (!user) {
        toast.error("Please login to view ticket details");
        return null;
      }

      return handleApiCall(
        () => contactService.getCustomerSupportTicketById(id),
        undefined,
        "Failed to fetch support ticket"
      );
    },
    [user, handleApiCall]
  );

  const cancelCustomerEnquiry = useCallback(
    async (id: string): Promise<boolean> => {
      if (!user) {
        toast.error("Please login to cancel enquiry");
        return false;
      }

      const response = await handleApiCall(
        () => contactService.cancelCustomerEnquiry(id),
        "Enquiry cancelled successfully",
        "Failed to cancel enquiry"
      );

      return !!response?.success;
    },
    [user, handleApiCall]
  );

  // ==================== ADMIN METHODS ====================

  const getEnquiries = useCallback(
    async (
      filters: EnquiryFilters = {},
      paginationQuery: PaginationQuery = {}
    ): Promise<boolean> => {
      if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
        toast.error("Unauthorized access");
        return false;
      }

      const response = await handleApiCall(
        () => contactService.getEnquiries(filters, paginationQuery),
        undefined,
        "Failed to fetch enquiries"
      );

      if (response?.success) {
        setData(response.data);
        setPagination(
          response.meta
            ? {
                page: response.meta.page || 1,
                limit: response.meta.limit || 20,
                total: response.meta.total || 0,
                totalPages: response.meta.totalPages || 1,
                hasNext:
                  (response.meta.page || 1) < (response.meta.totalPages || 1),
                hasPrevious: (response.meta.page || 1) > 1,
              }
            : null
        );
        return true;
      }

      return false;
    },
    [user, handleApiCall]
  );

  const getSupportTickets = useCallback(
    async (
      filters: SupportTicketFilters = {},
      paginationQuery: PaginationQuery = {}
    ): Promise<boolean> => {
      if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
        toast.error("Unauthorized access");
        return false;
      }

      const response = await handleApiCall(
        () => contactService.getSupportTickets(filters, paginationQuery),
        undefined,
        "Failed to fetch support tickets"
      );

      if (response?.success) {
        setData(response.data);
        setPagination(
          response.meta
            ? {
                page: response.meta.page || 1,
                limit: response.meta.limit || 20,
                total: response.meta.total || 0,
                totalPages: response.meta.totalPages || 1,
                hasNext:
                  (response.meta.page || 1) < (response.meta.totalPages || 1),
                hasPrevious: (response.meta.page || 1) > 1,
              }
            : null
        );
        return true;
      }

      return false;
    },
    [user, handleApiCall]
  );

  const searchEnquiries = useCallback(
    async (
      query: string,
      filters: Partial<EnquiryFilters> = {},
      paginationQuery: PaginationQuery = {}
    ): Promise<boolean> => {
      if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
        toast.error("Unauthorized access");
        return false;
      }

      const response = await handleApiCall(
        () => contactService.searchEnquiries(query, filters, paginationQuery),
        undefined,
        "Search failed"
      );

      if (response?.success) {
        setData(response.data);
        setPagination(
          response.meta
            ? {
                page: response.meta.page || 1,
                limit: response.meta.limit || 20,
                total: response.meta.total || 0,
                totalPages: response.meta.totalPages || 1,
                hasNext:
                  (response.meta.page || 1) < (response.meta.totalPages || 1),
                hasPrevious: (response.meta.page || 1) > 1,
              }
            : null
        );
        return true;
      }

      return false;
    },
    [user, handleApiCall]
  );

  const getEnquiryById = useCallback(
    async (id: string): Promise<ContactResponse | null> => {
      if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
        toast.error("Unauthorized access");
        return null;
      }

      return handleApiCall(
        () => contactService.getEnquiryById(id),
        undefined,
        "Failed to fetch enquiry"
      );
    },
    [user, handleApiCall]
  );

  const getSupportTicketById = useCallback(
    async (id: string): Promise<ContactResponse | null> => {
      if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
        toast.error("Unauthorized access");
        return null;
      }

      return handleApiCall(
        () => contactService.getSupportTicketById(id),
        undefined,
        "Failed to fetch support ticket"
      );
    },
    [user, handleApiCall]
  );

  const updateEnquiryStatus = useCallback(
    async (id: string, data: UpdateEnquiryStatusRequest): Promise<boolean> => {
      if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
        toast.error("Unauthorized access");
        return false;
      }

      const response = await handleApiCall(
        () => contactService.updateEnquiryStatus(id, data),
        "Enquiry status updated successfully",
        "Failed to update enquiry status"
      );

      return !!response?.success;
    },
    [user, handleApiCall]
  );

  const updateSupportTicket = useCallback(
    async (id: string, data: UpdateSupportTicketRequest): Promise<boolean> => {
      if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
        toast.error("Unauthorized access");
        return false;
      }

      const response = await handleApiCall(
        () => contactService.updateSupportTicket(id, data),
        "Support ticket updated successfully",
        "Failed to update support ticket"
      );

      return !!response?.success;
    },
    [user, handleApiCall]
  );

  const closeSupportTicket = useCallback(
    async (id: string, data: CloseTicketRequest): Promise<boolean> => {
      if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
        toast.error("Unauthorized access");
        return false;
      }

      const response = await handleApiCall(
        () => contactService.closeSupportTicket(id, data),
        "Support ticket closed successfully",
        "Failed to close support ticket"
      );

      return !!response?.success;
    },
    [user, handleApiCall]
  );

  const bulkUpdateEnquiries = useCallback(
    async (data: BulkUpdateRequest): Promise<boolean> => {
      if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
        toast.error("Unauthorized access");
        return false;
      }

      const response = await handleApiCall(
        () => contactService.bulkUpdateEnquiries(data),
        `Bulk update completed for ${data.enquiryIds.length} enquiries`,
        "Failed to bulk update enquiries"
      );

      return !!response?.success;
    },
    [user, handleApiCall]
  );

  const exportEnquiries = useCallback(
    async (query: ExportQuery = {}): Promise<Blob | null> => {
      if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
        toast.error("Unauthorized access");
        return null;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await contactService.exportEnquiries(query);

        if (response.success && response.data) {
          if (query.format === "csv") {
            // For CSV, response.data should be a string
            return new Blob([response.data], { type: "text/csv" });
          } else {
            // For JSON, convert to blob
            return new Blob([JSON.stringify(response.data, null, 2)], {
              type: "application/json",
            });
          }
        }

        toast.error("Failed to export enquiries");
        return null;
      } catch (err: any) {
        const errorMsg = err.message || "Failed to export enquiries";
        setError(errorMsg);
        toast.error(errorMsg);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [user]
  );

  const getEnquiryStatistics =
    useCallback(async (): Promise<ContactResponse | null> => {
      if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
        toast.error("Unauthorized access");
        return null;
      }

      return handleApiCall(
        () => contactService.getEnquiryStatistics(),
        undefined,
        "Failed to fetch enquiry statistics"
      );
    }, [user, handleApiCall]);

  const getSupportTicketStatistics =
    useCallback(async (): Promise<ContactResponse | null> => {
      if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
        toast.error("Unauthorized access");
        return null;
      }

      return handleApiCall(
        () => contactService.getSupportTicketStatistics(),
        undefined,
        "Failed to fetch support ticket statistics"
      );
    }, [user, handleApiCall]);

  // ==================== SUPPORT AGENT METHODS ====================

  const getAgentEnquiries = useCallback(
    async (
      filters: EnquiryFilters = {},
      paginationQuery: PaginationQuery = {}
    ): Promise<boolean> => {
      if (
        !user ||
        !["SUPPORT_AGENT", "ADMIN", "SUPER_ADMIN"].includes(user.role)
      ) {
        toast.error("Unauthorized access");
        return false;
      }

      const response = await handleApiCall(
        () => contactService.getAgentEnquiries(filters, paginationQuery),
        undefined,
        "Failed to fetch enquiries"
      );

      if (response?.success) {
        setData(response.data);
        setPagination(
          response.meta
            ? {
                page: response.meta.page || 1,
                limit: response.meta.limit || 20,
                total: response.meta.total || 0,
                totalPages: response.meta.totalPages || 1,
                hasNext:
                  (response.meta.page || 1) < (response.meta.totalPages || 1),
                hasPrevious: (response.meta.page || 1) > 1,
              }
            : null
        );
        return true;
      }

      return false;
    },
    [user, handleApiCall]
  );

  const getAgentSupportTickets = useCallback(
    async (
      filters: SupportTicketFilters = {},
      paginationQuery: PaginationQuery = {}
    ): Promise<boolean> => {
      if (
        !user ||
        !["SUPPORT_AGENT", "ADMIN", "SUPER_ADMIN"].includes(user.role)
      ) {
        toast.error("Unauthorized access");
        return false;
      }

      const response = await handleApiCall(
        () => contactService.getAgentSupportTickets(filters, paginationQuery),
        undefined,
        "Failed to fetch support tickets"
      );

      if (response?.success) {
        setData(response.data);
        setPagination(
          response.meta
            ? {
                page: response.meta.page || 1,
                limit: response.meta.limit || 20,
                total: response.meta.total || 0,
                totalPages: response.meta.totalPages || 1,
                hasNext:
                  (response.meta.page || 1) < (response.meta.totalPages || 1),
                hasPrevious: (response.meta.page || 1) > 1,
              }
            : null
        );
        return true;
      }

      return false;
    },
    [user, handleApiCall]
  );

  const updateAgentSupportTicket = useCallback(
    async (id: string, data: UpdateSupportTicketRequest): Promise<boolean> => {
      if (
        !user ||
        !["SUPPORT_AGENT", "ADMIN", "SUPER_ADMIN"].includes(user.role)
      ) {
        toast.error("Unauthorized access");
        return false;
      }

      const response = await handleApiCall(
        () => contactService.updateAgentSupportTicket(id, data),
        "Support ticket updated successfully",
        "Failed to update support ticket"
      );

      return !!response?.success;
    },
    [user, handleApiCall]
  );

  const getAgentSupportTicketStatistics =
    useCallback(async (): Promise<ContactResponse | null> => {
      if (
        !user ||
        !["SUPPORT_AGENT", "ADMIN", "SUPER_ADMIN"].includes(user.role)
      ) {
        toast.error("Unauthorized access");
        return null;
      }

      return handleApiCall(
        () => contactService.getAgentSupportTicketStatistics(),
        undefined,
        "Failed to fetch support ticket statistics"
      );
    }, [user, handleApiCall]);

  // ==================== UTILITY METHODS ====================

  const clearErrors = useCallback(() => {
    setError(null);
    setFieldErrors({});
  }, []);

  const clearData = useCallback(() => {
    setData(null);
    setPagination(null);
  }, []);

  const setPage = useCallback(
    (page: number) => {
      if (pagination) {
        setPagination({
          ...pagination,
          page,
          hasNext: page < pagination.totalPages,
          hasPrevious: page > 1,
        });
      }
    },
    [pagination]
  );

  const setLimit = useCallback(
    (limit: number) => {
      if (pagination) {
        setPagination({
          ...pagination,
          limit,
          totalPages: Math.ceil(pagination.total / limit),
        });
      }
    },
    [pagination]
  );

  return {
    // State
    isLoading,
    error,
    fieldErrors,
    data,
    pagination,

    // Public methods
    submitContact,
    submitQuickEnquiry,
    getSupportTicketByNumber,

    // Customer methods
    getCustomerEnquiries,
    getCustomerSupportTickets,
    getCustomerEnquiryById,
    getCustomerSupportTicketById,
    cancelCustomerEnquiry,

    // Admin methods
    getEnquiries,
    getSupportTickets,
    searchEnquiries,
    getEnquiryById,
    getSupportTicketById,
    updateEnquiryStatus,
    updateSupportTicket,
    closeSupportTicket,
    bulkUpdateEnquiries,
    exportEnquiries,
    getEnquiryStatistics,
    getSupportTicketStatistics,

    // Support agent methods
    getAgentEnquiries,
    getAgentSupportTickets,
    updateAgentSupportTicket,
    getAgentSupportTicketStatistics,

    // Utility methods
    clearErrors,
    clearData,
    setPage,
    setLimit,
  };
}
