// hooks/use-booking-modal.ts
import { useBookingStore } from "@/store/booking-store";
import {
  getFieldError,
  hasFieldError,
  FieldError,
} from "@/utils/form-validation.utils";

export function useBookingModal() {
  const { validationErrors } = useBookingStore(); // Make sure your store has validationErrors

  return {
    validationErrors,
    getFieldError,
    hasFieldError,
  };
}
