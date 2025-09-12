import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api.service';
import { useBookingStore } from '../store/booking.store';
import { toast } from 'sonner';

export const useBookings = () => {
  const { filters, setLoading, setError } = useBookingStore();
  
  return useQuery({
    queryKey: ['bookings', filters],
    queryFn: () => apiService.getBookings(filters),
    onSuccess: (data) => {
      useBookingStore.getState().setBookings(data);
      setLoading(false);
    },
    onError: (error: Error) => {
      setError(error.message);
      setLoading(false);
      toast.error('Failed to fetch bookings');
    },
    onLoading: () => setLoading(true),
  });
};

export const useBooking = (id: string) => {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: () => apiService.getBooking(id),
    enabled: !!id,
  });
};

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();
  const { updateBooking } = useBookingStore();

  return useMutation({
    mutationFn: apiService.updateBookingStatus,
    onSuccess: (updatedBooking) => {
      updateBooking(updatedBooking);
      queryClient.invalidateQueries(['bookings']);
      queryClient.invalidateQueries(['booking', updatedBooking.id]);
      toast.success('Status updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update status: ${error.message}`);
    },
  });
};

export const useAddParts = () => {
  const queryClient = useQueryClient();
  const { updateBooking } = useBookingStore();

  return useMutation({
    mutationFn: apiService.addParts,
    onSuccess: (updatedBooking) => {
      updateBooking(updatedBooking);
      queryClient.invalidateQueries(['bookings']);
      queryClient.invalidateQueries(['booking', updatedBooking.id]);
      toast.success('Parts added successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to add parts: ${error.message}`);
    },
  });
};

export const useAddCharges = () => {
  const queryClient = useQueryClient();
  const { updateBooking } = useBookingStore();

  return useMutation({
    mutationFn: apiService.addCharges,
    onSuccess: (updatedBooking) => {
      updateBooking(updatedBooking);
      queryClient.invalidateQueries(['bookings']);
      queryClient.invalidateQueries(['booking', updatedBooking.id]);
      toast.success('Charges added successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to add charges: ${error.message}`);
    },
  });
};

export const useGenerateInvoice = () => {
  const queryClient = useQueryClient();
  const { updateBooking } = useBookingStore();

  return useMutation({
    mutationFn: apiService.generateInvoice,
    onSuccess: (data, bookingId) => {
      // Update booking to show invoice generated
      queryClient.invalidateQueries(['booking', bookingId]);
      toast.success(`Invoice generated: ${data.invoiceNumber}`);
    },
    onError: (error: Error) => {
      toast.error(`Failed to generate invoice: ${error.message}`);
    },
  });
};