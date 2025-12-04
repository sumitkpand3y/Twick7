// hooks/useServices.ts
import { useState, useEffect } from "react";
import { servicesService } from "@/services/services.service";
import toast from "react-hot-toast";

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

interface ServiceFilters {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

interface ApiResponse {
  data: Service[];
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function useServices(filters?: ServiceFilters) {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 0,
  });

  const fetchServices = async (serviceFilters?: ServiceFilters) => {
    setIsLoading(true);
    setError(null);

    try {
      // You'll need to update your servicesService to accept filters
      const response = await servicesService.getAllServices(serviceFilters);

      if (response.success && response.data) {
        setServices(response.data);

        // Update pagination from meta
        if (response.meta) {
          setPagination({
            page: response.meta.page || 1,
            limit: response.meta.limit || 9,
            total: response.meta.total || 0,
            totalPages: response.meta.totalPages || 1,
          });
        }

        return response.data;
      }

      throw new Error(response.error?.message || "Failed to fetch services");
    } catch (err: any) {
      const errorMessage = err.message || "Failed to fetch services";
      setError(errorMessage);
      toast.error(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getServiceById = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await servicesService.getServiceById(id);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error?.message || "Failed to fetch service");
    } catch (err: any) {
      const errorMessage = err.message || "Failed to fetch service";
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices(filters);
  }, [filters?.category, filters?.search, filters?.page, filters?.limit]);

  return {
    services,
    isLoading,
    error,
    pagination,
    fetchServices,
    getServiceById,
    refetch: () => fetchServices(filters),
  };
}
