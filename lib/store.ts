import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email?: string;
  mobile?: string;
  isAuthenticated: boolean;
}

interface BookingData {
  state: string;
  car: string;
  model: string;
  fuelType: string;
  serviceType: string;
  complaint: string;
  serviceDate: string;
  plateNumber: string;
  yearOfMaking: string;
  kmReading: string;
  specificIssue: string;
  name: string;
  mobile: string;
  email: string;
  flatNo: string;
  area: string;
  landmark: string;
  city: string;
}

interface Booking {
  id: string;
  bookingData: BookingData;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
  estimatedPrice: number;
}

interface AppState {
  user: User | null;
  bookingData: Partial<BookingData>;
  bookings: Booking[];
  currentStep: number;
  
  // Auth actions
  setUser: (user: User) => void;
  logout: () => void;
  
  // Booking actions
  updateBookingData: (data: Partial<BookingData>) => void;
  setCurrentStep: (step: number) => void;
  resetBookingData: () => void;
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      bookingData: {},
      bookings: [],
      currentStep: 1,
      
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      
      updateBookingData: (data) => 
        set((state) => ({ 
          bookingData: { ...state.bookingData, ...data } 
        })),
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      resetBookingData: () => set({ bookingData: {}, currentStep: 1 }),
      
      addBooking: (booking) => 
        set((state) => ({ 
          bookings: [booking, ...state.bookings] 
        })),
      
      updateBookingStatus: (id, status) =>
        set((state) => ({
          bookings: state.bookings.map(booking =>
            booking.id === id ? { ...booking, status } : booking
          )
        }))
    }),
    {
      name: 'Tweak7-storage',
      partialize: (state) => ({ 
        user: state.user, 
        bookings: state.bookings 
      })
    }
  )
);