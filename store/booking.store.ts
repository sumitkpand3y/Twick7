import { Booking, BookingFilters } from '@/types/booking.types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface BookingStore {
  bookings: Booking[];
  selectedBooking: Booking | null;
  filters: BookingFilters;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setBookings: (bookings: Booking[]) => void;
  setSelectedBooking: (booking: Booking | null) => void;
  updateBooking: (booking: Booking) => void;
  setFilters: (filters: Partial<BookingFilters>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useBookingStore = create<BookingStore>()(
  devtools(
    persist(
      (set, get) => ({
        bookings: [],
        selectedBooking: null,
        filters: {
          search: '',
          status: 'all',
          dateRange: {},
        },
        isLoading: false,
        error: null,

        setBookings: (bookings) => set({ bookings }),
        
        setSelectedBooking: (booking) => set({ selectedBooking: booking }),
        
        updateBooking: (updatedBooking) => set((state) => ({
          bookings: state.bookings.map(booking =>
            booking.id === updatedBooking.id ? updatedBooking : booking
          ),
          selectedBooking: state.selectedBooking?.id === updatedBooking.id 
            ? updatedBooking 
            : state.selectedBooking,
        })),
        
        setFilters: (newFilters) => set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),
        
        setLoading: (loading) => set({ isLoading: loading }),
        
        setError: (error) => set({ error }),
        
        clearError: () => set({ error: null }),
      }),
      {
        name: 'booking-store',
        partialize: (state) => ({ 
          filters: state.filters,
          selectedBooking: state.selectedBooking,
        }),
      }
    ),
    {
      name: 'booking-store',
    }
  )
);