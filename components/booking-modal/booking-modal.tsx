'use client';

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Stepper } from "@/components/ui/stepper";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { useBookingStore } from "@/store/booking-store";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";
import {
  bookingValidationSchema,
  BookingStepValidation,
} from "@/lib/validation";
import { StateStep } from "./steps/state-step";
import { CarStep } from "./steps/car-step";
import { ModelStep } from "./steps/model-step";
import { FuelStep } from "./steps/fuel-step";
import { ServiceStep } from "./steps/service-step";
import { ComplaintStep } from "./steps/complaint-step";
import { AddressStep } from "./steps/address-step";
import { ConfirmStep } from "./steps/confirm-step";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const steps = [
  "State",
  "Car",
  "Model",
  "Fuel Type",
  "Service",
  "Complaint",
  "Address",
  "Confirm",
];

const stepComponents = [
  StateStep,
  CarStep,
  ModelStep,
  FuelStep,
  ServiceStep,
  ComplaintStep,
  AddressStep,
  ConfirmStep,
];

const stepValidationKeys: BookingStepValidation[] = [
  "state",
  "car",
  "model",
  "fuel",
  "service",
  "complaint",
  "address",
];

export function BookingModal() {
  const {
    isModalOpen,
    setModalOpen,
    currentStep,
    setCurrentStep,
    bookingData,
    resetBooking,
  } = useBookingStore();
  const { user, sendWhatsAppNotification } = useAuthStore();
  const [validationError, setValidationError] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [isBookingSuccessful, setIsBookingSuccessful] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
    resetBooking();
    setValidationError("");
    
    // Only show confirmation if booking was successful
    if (isBookingSuccessful) {
      setShowConfirmation(true);
      setIsBookingSuccessful(false);
    }
  };

  const validateCurrentStep = (): boolean => {
    if (currentStep >= stepValidationKeys.length) return true;

    const validationKey = stepValidationKeys[currentStep];
    const schema = bookingValidationSchema[validationKey];

    try {
      if (validationKey === "service") {
        const serviceData = {
          serviceType: Array.isArray(bookingData.serviceType)
            ? bookingData.serviceType
            : bookingData.serviceType
            ? [bookingData.serviceType]
            : [],
        };
        schema.parse(serviceData);
      } else {
        schema.parse(bookingData);
      }

      setValidationError("");
      return true;
    } catch (error: any) {
      const errorMessage =
        error.errors?.[0]?.message || "Please fill all required fields";
      setValidationError(errorMessage);
      return false;
    }
  };

  const goToNextStep = () => {
    if (currentStep === steps.length - 1) {
      handleConfirmBooking();
      return;
    }

    if (validateCurrentStep()) {
      setCurrentStep(Math.min(currentStep + 1, steps.length - 1));
    }
  };

  const goToPrevStep = () => {
    setValidationError("");
    setCurrentStep(Math.max(currentStep - 1, 0));
  };

  const handleConfirmBooking = async () => {
    if (!user) {
      toast.error("Please login to confirm booking");
      return;
    }

    try {
      // Validate all steps
      for (let i = 0; i < stepValidationKeys.length; i++) {
        const validationKey = stepValidationKeys[i];
        const schema = bookingValidationSchema[validationKey];

        if (validationKey === "service") {
          const serviceData = {
            serviceType: Array.isArray(bookingData.serviceType)
              ? bookingData.serviceType
              : bookingData.serviceType
              ? [bookingData.serviceType]
              : [],
          };
          schema.parse(serviceData);
        } else {
          schema.parse(bookingData);
        }
      }

      // Generate booking ID
      const newBookingId = `BK${Date.now().toString().slice(-6)}`;
      setBookingId(newBookingId);

      // Save booking data
      const bookingPayload = {
        id: newBookingId,
        userId: user.id,
        ...bookingData,
        serviceType: Array.isArray(bookingData.serviceType)
          ? bookingData.serviceType
          : bookingData.serviceType
          ? [bookingData.serviceType]
          : [],
        status: "scheduled",
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage
      const existingBookings = JSON.parse(
        localStorage.getItem("bookings") || "[]"
      );
      existingBookings.push(bookingPayload);
      localStorage.setItem("bookings", JSON.stringify(existingBookings));

      // Send WhatsApp notification
      const message = `Hi ${bookingData.name}! Your car service booking has been confirmed. Booking ID: ${newBookingId}. We will contact you soon for pickup scheduling.`;
      sendWhatsAppNotification(message, bookingData.mobile);

      // Mark booking as successful and close modal
      setIsBookingSuccessful(true);
      setModalOpen(false);
      
      toast.success("Booking confirmed successfully!");
    } catch (error: any) {
      const errorMessage =
        error.errors?.[0]?.message ||
        "Please fill all required fields correctly";
      setValidationError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleStepClick = (step: number) => {
    if (step <= currentStep) {
      setValidationError("");
      setCurrentStep(step);
    }
  };

  const handleDownloadInvoice = () => {
    const bookingDetails = {
      bookingId,
      customerName: bookingData.name,
      mobile: bookingData.mobile,
      email: bookingData.email,
      carDetails: `${bookingData.car?.name} ${bookingData.model?.name}`,
      plateNumber: bookingData.plateNumber,
      services: Array.isArray(bookingData.serviceType)
        ? bookingData.serviceType.map(s => s.title).join(', ')
        : bookingData.serviceType?.title || '',
      totalPrice: Array.isArray(bookingData.serviceType)
        ? bookingData.serviceType.reduce((sum, s) => sum + s.price, 0)
        : bookingData.serviceType?.price || 0,
      serviceDate: bookingData.serviceDate,
      address: `${bookingData.flatHouseNo}, ${bookingData.areaStreet}, ${bookingData.townCity}`,
    };

    const dataStr = JSON.stringify(bookingDetails, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `booking-${bookingId}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleWhatsAppUpdate = () => {
    const message = `Hi! I want to get updates for my booking ${bookingId}. Please send me regular updates on WhatsApp.`;
    sendWhatsAppNotification(message, bookingData.mobile);
    toast.success("WhatsApp updates enabled!");
  };

  const CurrentStepComponent = stepComponents[currentStep];

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title="Book Your Car Service"
        className="max-w-6xl h-[90vh]"
      >
        <div className="flex flex-col h-full">
          {/* Stepper - Sticky */}
          <div className="sticky top-0 bg-white border-b p-4 sm:p-6 z-10">
            <Stepper
              steps={steps}
              currentStep={currentStep}
              onStepClick={handleStepClick}
            />
          </div>

          {/* Content Area - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="min-h-[400px]"
              >
                <CurrentStepComponent />
              </motion.div>
            </div>
          </div>

          {/* Footer - Sticky */}
          <div className="sticky bottom-0 bg-white border-t p-4 sm:p-6">
            {validationError && (
              <div className="mb-4">
                <FormError
                  message={validationError}
                  className="justify-center"
                />
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <Button
                variant="outline"
                onClick={goToPrevStep}
                disabled={currentStep === 0}
                className="order-2 sm:order-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <Button onClick={goToNextStep} className="order-1 sm:order-2">
                {currentStep === steps.length - 1 ? "Confirm Booking" : "Next"}
                {currentStep !== steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 ml-2" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          resetBooking(); // Reset booking data when confirmation modal closes
        }}
        bookingId={bookingId}
        onDownloadInvoice={handleDownloadInvoice}
        onWhatsAppUpdate={handleWhatsAppUpdate}
      />
    </>
  );
}