"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContact } from "@/hooks/useContact";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormError } from "@/components/ui/form-error";
import { Car, MessageCircle, Send, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

const enquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid mobile number"),
  email: z
    .string()
    .email("Please enter a valid email")
    .optional()
    .or(z.literal("")),
  vehicleBrand: z.string().optional(),
  vehicleModel: z.string().optional(),
  serviceType: z.string().optional(),
  message: z
    .string()
    .min(10, "Please describe your issue (minimum 10 characters)"),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  type: z
    .enum(["QUICK_ENQUIRY", "GENERAL", "SERVICE", "TEST_DRIVE", "CORPORATE"])
    .optional(),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

interface QuickEnquiryProps {
  isOpen: boolean;
  onClose: () => void;
}

const serviceTypes = [
  "General Service",
  "AC Repair",
  "Denting & Painting",
  "Car Wash",
  "Brake Repair",
  "Engine Repair",
  "Battery Replacement",
  "Tyre Services",
  "Insurance Claims",
  "Roadside Assistance",
];

const vehicleBrands = [
  "Maruti Suzuki",
  "Hyundai",
  "Tata",
  "Mahindra",
  "Honda",
  "Toyota",
  "Ford",
  "Renault",
  "Kia",
  "MG",
  "Volkswagen",
  "Skoda",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Other",
];

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

export function QuickEnquiry({ isOpen, onClose }: QuickEnquiryProps) {
  const { submitQuickEnquiry, isLoading, error, fieldErrors, clearErrors } =
    useContact();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      type: "QUICK_ENQUIRY",
    },
  });

  const selectedDate = watch("preferredDate");

  const onSubmit = async (data: EnquiryFormData) => {
    clearErrors();

    const quickEnquiryData = {
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      serviceType: data.serviceType || undefined,
      vehicleBrand: data.vehicleBrand || undefined,
      vehicleModel: data.vehicleModel || undefined,
      message: data.message || undefined,
      preferredDate: data.preferredDate || undefined,
      preferredTime: data.preferredTime || undefined,
      type: data.type || "QUICK_ENQUIRY",
    };

    const success = await submitQuickEnquiry(quickEnquiryData);

    if (success) {
      reset();
      onClose();
    }
  };

  const handleWhatsAppEnquiry = () => {
    const message = "Hi! I need help with my car service. Please contact me.";
    const whatsappUrl = `https://wa.me/919900519565?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Quick Enquiry"
      className="max-w-lg"
    >
      <div className="p-4 sm:p-6">
        {/* Global Error Alert */}
        {error && (
          <div className="mb-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        <div className="text-center mb-6">
          <Car className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <p className="text-gray-600 text-sm">
            Get instant help for your car service needs
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter your full name"
              className="mt-1"
            />
            <FormError message={errors.name?.message} />
            {fieldErrors.name && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Mobile Number *</Label>
            <Input
              id="phone"
              {...register("phone")}
              placeholder="Enter your mobile number"
              className="mt-1"
            />
            <FormError message={errors.phone?.message} />
            {fieldErrors.phone && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.phone}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="mt-1"
            />
            <FormError message={errors.email?.message} />
            {fieldErrors.email && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="vehicleBrand">Vehicle Brand</Label>
              <Select
                onValueChange={(value) => setValue("vehicleBrand", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {vehicleBrands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="vehicleModel">Vehicle Model</Label>
              <Input
                id="vehicleModel"
                {...register("vehicleModel")}
                placeholder="e.g., Swift, Creta"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="serviceType">Service Type</Label>
            <Select onValueChange={(value) => setValue("serviceType", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="preferredDate">Preferred Date</Label>
              <Input
                id="preferredDate"
                type="date"
                {...register("preferredDate")}
                className="mt-1"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div>
              <Label htmlFor="preferredTime">Preferred Time</Label>
              <Select
                disabled={!selectedDate}
                onValueChange={(value) => setValue("preferredTime", value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue
                    placeholder={
                      selectedDate ? "Select time" : "Select date first"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="message">Describe Your Issue *</Label>
            <Textarea
              id="message"
              {...register("message")}
              placeholder="Describe your car issue or service requirement..."
              rows={3}
              className="mt-1"
            />
            <FormError message={errors.message?.message} />
            {fieldErrors.message && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.message}</p>
            )}
          </div>

          <div className="space-y-3 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-700"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              {isLoading ? "Submitting..." : "Submit Quick Enquiry"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleWhatsAppEnquiry}
              className="w-full border-green-500 text-green-600 hover:bg-green-50"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp Us Directly
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
