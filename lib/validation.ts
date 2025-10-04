import { z } from "zod";

export const mobileRegex = /^[6-9]\d{9}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const plateNumberRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/i;

export const bookingValidationSchema = {
  state: z.object({
    state: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .nullable()
      .refine((val) => val !== null, {
        message: "Please select your state",
      }),
  }),

  car: z.object({
    car: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .nullable()
      .refine((val) => val !== null, {
        message: "Please select your car brand",
      }),
  }),

  model: z.object({
    model: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .nullable()
      .refine((val) => val !== null, {
        message: "Please select your car model",
      }),
  }),

  fuel: z.object({
    fuelType: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .nullable()
      .refine((val) => val !== null, {
        message: "Please select fuel type",
      }),
  }),

  complaint: z.object({
    complaint: z
      .string()
      .min(10, "Please describe your complaint (minimum 10 characters)"),
    serviceDate: z.string().min(1, "Please select a service date"),
    serviceTime: z.string().min(1, "Please select a service time"),
    plateNumber: z
      .string()
      .min(1, "Plate number is required")
      .regex(plateNumberRegex, "Invalid format (e.g., KA12AB1234)"),
    yearOfManufacturing: z
      .string()
      .min(1, "Year is required")
      .refine((val) => {
        const year = parseInt(val);
        const currentYear = new Date().getFullYear();
        return year >= 1990 && year <= currentYear;
      }, "Year must be between 1990 and current year"),
    kmReading: z
      .string()
      .min(1, "KM reading is required")
      .refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, "Must be a valid positive number"),
  }),

  address: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    mobile: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Please enter a valid mobile number"),
    email: z.string().email("Please enter a valid email address"),
    flatHouseNo: z.string().nonempty("Please enter flat/house number"),
    areaStreet: z.string().nonempty("Please enter area/street"),
    townCity: z.string().nonempty("Please enter town/city"),
    landmark: z.string().optional(),
  }),
  service: z.object({
    serviceType: z
      .array(
        z.object({
          id: z.string(),
          title: z.string(),
          description: z.string(),
          price: z.number(),
          image: z.string(),
        })
      )
      .min(1, "Please select at least one service"),
  }),
};

export type BookingStepValidation = keyof typeof bookingValidationSchema;
