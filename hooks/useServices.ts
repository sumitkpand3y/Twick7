import { useState, useEffect } from 'react';
import { servicesService } from '@/services/services.service';
import toast from 'react-hot-toast';

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

export function useServices(category?: string) {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async (categoryFilter?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await servicesService.getAllServices(categoryFilter);

      if (response.success && response.data) {
        setServices(response.data);
        return response.data;
      }

      throw new Error(response.error?.message || 'Failed to fetch services');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch services';
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

      throw new Error(response.error?.message || 'Failed to fetch service');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch service';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices(category);
  }, [category]);

  return {
    services,
    isLoading,
    error,
    fetchServices,
    getServiceById,
    refetch: () => fetchServices(category),
  };
}
