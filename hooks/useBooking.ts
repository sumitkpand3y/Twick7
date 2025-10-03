import { useState } from "react";
import { bookingService } from "@/services/booking.service";
import toast from "react-hot-toast";

interface FieldErrors {
  [key: string]: string;
}

export function useBooking() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const createBooking = async (bookingData: any) => {
    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      const payload = {
        car: bookingData.car?.name || "",
        model: bookingData.model?.name || "",
        yearOfMaking: bookingData.model?.year || new Date().getFullYear(),
        fuelType: bookingData.fuelType?.name.toLowerCase() || "",
        transmission: bookingData.transmission || "MANUAL",
        variant: bookingData.variant || "",
        plateNumber: bookingData.plateNumber || "",
        kmReading: parseInt(bookingData.kmReading) || 0,
        serviceIds: Array.isArray(bookingData.serviceType)
          ? bookingData.serviceType.map((s: any) => s.id || s)
          : [],
        serviceDate: bookingData.serviceDate || "",
        scheduledTime: bookingData.serviceTime || "10:00",
        flatNo: bookingData.flatHouseNo || "",
        area: bookingData.areaStreet || "",
        landmark: bookingData.landmark || "",
        City: bookingData.townCity || "",
        state: bookingData.state || "",
        pincode: bookingData.pincode || "",
        customerComplaint: bookingData.complaint || "",
        name: bookingData.name || "",
        email: bookingData.email || "",
        mobile: bookingData.mobile || "",
      };

      const response = await bookingService.createBookingFromCustomer(payload);

      if (response.success) {
        toast.success("Booking created successfully!");
        return response.data;
      }

      throw new Error(response.error?.message || "Failed to create booking");
    } catch (err: any) {
      const errorMessage = err.message || "Failed to create booking";
      setError(errorMessage);
      toast.error(errorMessage);

      if (err.code === "VALIDATION_ERROR" && err.fields) {
        setFieldErrors(err.fields);
      }

      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getCustomerBookings = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await bookingService.getCustomerBookings();
      return response.data || [];
    } catch (err: any) {
      const errorMessage = err.message || "Failed to fetch bookings";
      setError(errorMessage);
      toast.error(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getBookingDetails = async (bookingId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await bookingService.getBookingDetails(bookingId);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to fetch booking details";
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getVehicleCompatibility = async (params: {
    brand?: string;
    model?: string;
    year?: number;
    fuelType?: string;
  }) => {
    try {
      const vehicles = await bookingService.getVehicleCompatibility(params);
      return vehicles;
    } catch (err: any) {
      console.error("Failed to fetch vehicle compatibility:", err);
      return [];
    }
  };

  const clearErrors = () => {
    setError(null);
    setFieldErrors({});
  };

  return {
    isLoading,
    error,
    fieldErrors,
    createBooking,
    getCustomerBookings,
    getBookingDetails,
    getVehicleCompatibility,
    clearErrors,
  };
}
