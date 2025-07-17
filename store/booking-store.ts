'use client';

import { create } from 'zustand';
import { BookingData, State, Car, CarModel, FuelType, ServiceType } from '@/types';

interface BookingStore {
  bookingData: BookingData;
  currentStep: number;
  isModalOpen: boolean;
  setBookingData: (data: Partial<BookingData>) => void;
  setCurrentStep: (step: number) => void;
  setModalOpen: (open: boolean) => void;
  resetBooking: () => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
}

const initialBookingData: BookingData = {
  state: null,
  car: null,
  model: null,
  fuelType: null,
  serviceType: null,
  complaint: '',
  serviceDate: '',
  plateNumber: '',
  yearOfManufacturing: '',
  kmReading: '',
  specificIssues: '',
  name: '',
  mobile: '',
  email: '',
  flatHouseNo: '',
  areaStreet: '',
  landmark: '',
  townCity: '',
  useCurrentLocation: false,
};

export const useBookingStore = create<BookingStore>((set, get) => ({
  bookingData: initialBookingData,
  currentStep: 0,
  isModalOpen: false,
  setBookingData: (data) =>
    set((state) => ({
      bookingData: { ...state.bookingData, ...data },
    })),
  setCurrentStep: (step) => set({ currentStep: step }),
  setModalOpen: (open) => set({ isModalOpen: open }),
  resetBooking: () =>
    set({
      bookingData: initialBookingData,
      currentStep: 0,
      isModalOpen: false,
    }),
  goToNextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 7),
    })),
  goToPrevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),
}));