import { z } from 'zod';

export const bookingValidationSchema = {
  state: z.object({
    state: z.object({
      id: z.string(),
      name: z.string(),
    }).nullable().refine((val) => val !== null, {
      message: "Please select your state",
    }),
  }),
  
  car: z.object({
    car: z.object({
      id: z.string(),
      name: z.string(),
    }).nullable().refine((val) => val !== null, {
      message: "Please select your car brand",
    }),
  }),
  
  model: z.object({
    model: z.object({
      id: z.string(),
      name: z.string(),
    }).nullable().refine((val) => val !== null, {
      message: "Please select your car model",
    }),
  }),
  
  fuel: z.object({
    fuelType: z.object({
      id: z.string(),
      name: z.string(),
    }).nullable().refine((val) => val !== null, {
      message: "Please select fuel type",
    }),
  }),
  
  service: z.object({
    serviceType: z.object({
      id: z.string(),
      title: z.string(),
    }).nullable().refine((val) => val !== null, {
      message: "Please select a service type",
    }),
  }),
  
  complaint: z.object({
    complaint: z.string().min(10, "Please describe your complaint (minimum 10 characters)"),
    serviceDate: z.string().min(1, "Please select a service date"),
    plateNumber: z.string().regex(/^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/, "Please enter a valid plate number (e.g., MH12AB1234)"),
    yearOfManufacturing: z.string().regex(/^(19|20)\d{2}$/, "Please enter a valid year"),
    kmReading: z.string().min(1, "Please enter KM reading"),
  }),
  
  address: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    mobile: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid mobile number"),
    email: z.string().email("Please enter a valid email address"),
    flatHouseNo: z.string().min(1, "Please enter flat/house number"),
    areaStreet: z.string().min(1, "Please enter area/street"),
    townCity: z.string().min(1, "Please enter town/city"),
    landmark: z.string().optional(),
  }),
};

export type BookingStepValidation = keyof typeof bookingValidationSchema;