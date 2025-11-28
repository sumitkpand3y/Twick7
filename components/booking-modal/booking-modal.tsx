"use client";

import { useState, useEffect, useCallback } from "react";
import { Modal } from "@/components/ui/modal";
import { Stepper } from "@/components/ui/stepper";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { useBookingStore } from "@/store/booking-store";
import { useAuthStore } from "@/store/auth-store";
import { useBooking } from "@/hooks/useBooking";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";
import {
  bookingValidationSchema,
  BookingStepValidation,
} from "@/lib/validation";
import { validateStep, FieldError } from "@/utils/form-validation.utils";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
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
  "Car",
  "Model",
  "Fuel Type",
  "Service",
  "Complaint",
  "Address",
  "Confirm",
];

const stepComponents = [
  CarStep,
  ModelStep,
  FuelStep,
  ServiceStep,
  ComplaintStep,
  AddressStep,
  ConfirmStep,
];

const stepValidationKeys: BookingStepValidation[] = [
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
  const { user, setAuthModalOpen } = useAuthStore();
  const { createBooking, isLoading: isBookingLoading } = useBooking();
  const [validationErrors, setValidationErrors] = useState<FieldError[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [pendingBooking, setPendingBooking] = useState(false);
  const [validFields, setValidFields] = useState<Set<string>>(new Set());

  const handleClose = () => {
    setModalOpen(false);
    resetBooking();
    setValidationErrors([]);
    setPendingBooking(false);
  };

 const handleFieldValidation = useCallback(
   (field: string, isValid: boolean) => {
     setValidFields((prev) => {
       const newSet = new Set(prev);
       if (isValid) {
         newSet.add(field);

         // Auto-remove any validation error for this field
         setValidationErrors((prevErrors) =>
           prevErrors.filter((error) => error.field !== field)
         );
       } else {
         newSet.delete(field);
       }
       return newSet;
     });
   },
   []
 );

  const validateCurrentStep = (): boolean => {
    if (currentStep >= stepValidationKeys.length) return true;

    const validationKey = stepValidationKeys[currentStep];
    const schema = bookingValidationSchema[validationKey];

    let dataToValidate = bookingData;
    if (validationKey === "service") {
      dataToValidate = {
        serviceType: Array.isArray(bookingData.serviceType)
          ? bookingData.serviceType
          : bookingData.serviceType
          ? [bookingData.serviceType]
          : [],
      };
    }

    const result = validateStep(schema, dataToValidate);

    if (result.success) {
      setValidationErrors([]);
      return true;
    } else {
      setValidationErrors(result.errors);
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
    setValidationErrors([]);
    setCurrentStep(Math.max(currentStep - 1, 0));
  };

  const handleConfirmBooking = async () => {
    if (!user) {
      setPendingBooking(true);
      setAuthModalOpen(true);
      toast.error("Please login to confirm booking");
      return;
    }

    await processBooking();
  };

  const processBooking = async () => {

    console.log("bookingData", bookingData);
    
    try {
      const result = await createBooking(bookingData);

      if (result) {
        // setBookingId(re₹sult.bookingNumber || result.id);
        // setShowConfirmation(true);
        // setPendingBooking(false);
      }
    } catch (error: any) {
      console.error('Booking creation failed:', error);
    }
  };

  useEffect(() => {
    if (pendingBooking && user) {
      processBooking();
    }
  }, [user, pendingBooking]);

  const handleStepClick = (step: number) => {
    if (step <= currentStep) {
      setValidationErrors([]);
      setCurrentStep(step);
    }
  };

  const handleDownloadInvoice = async () => {
    // Create a temporary div to hold our invoice HTML
    const invoiceElement = document.createElement("div");
    invoiceElement.style.position = "absolute";
    invoiceElement.style.left = "-9999px";
    invoiceElement.style.width = "800px";
    invoiceElement.style.fontFamily =
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    invoiceElement.style.backgroundColor = "#ffffff";

    // Format services and calculate total
    const services = Array.isArray(bookingData.serviceType)
      ? bookingData.serviceType
      : bookingData.serviceType
      ? [bookingData.serviceType]
      : [];

    const totalPrice = services.reduce((sum, s) => sum + s.price, 0);

    // Format the current date
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Create the professional single-page invoice HTML
    invoiceElement.innerHTML = `
    <div style="max-width: 800px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
      
      <!-- Professional Header -->
      <div style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); padding: 25px 30px; position: relative;">
        <div style="position: absolute; top: -30px; right: -30px; width: 100px; height: 100px; background: rgba(255,255,255,0.08); border-radius: 50%;"></div>
        <div style="position: absolute; bottom: -20px; left: -20px; width: 60px; height: 60px; background: rgba(255,255,255,0.05); border-radius: 50%;"></div>
        
        <div style="position: relative; z-index: 2; display: flex; justify-content: space-between; align-items: center;">
          <!-- Left: Company Info -->
          <div style="display: flex; align-items: center;">
            <img src="https://tweak7.co.in/mainwebsit/image/logo/logo.png" alt="Twick7 Logo" style="height: 50px; margin-right: 15px; filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3));"/>
            <div>
              <h1 style="margin: 0; font-size: 28px; color: white; font-weight: 800; letter-spacing: -0.5px; text-transform: uppercase;">TWICK7</h1>
              <p style="margin: 2px 0 0; color: rgba(255,255,255,0.9); font-size: 13px; font-weight: 500; letter-spacing: 0.5px;">PREMIUM AUTOMOTIVE SERVICES</p>
            </div>
          </div>
          
          <!-- Right: Invoice Info -->
          <div style="text-align: right;">
            <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 15px 20px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.2);">
              <h2 style="margin: 0 0 5px; font-size: 20px; color: white; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">INVOICE</h2>
              <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.9); font-weight: 600;">#${bookingId}</p>
              <div style="width: 40px; height: 2px; background: #ffd700; margin: 8px auto 0; border-radius: 1px;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content with minimal spacing -->
      <div style="padding: 25px 30px;">
        
        <!-- Top Section: 3-Column Layout -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 25px;">
          
          <!-- Invoice Details -->
          <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 18px; border-radius: 12px; border-left: 4px solid #667eea; position: relative;">
            <div style="position: absolute; top: -5px; right: -5px; width: 20px; height: 20px; background: rgba(102,126,234,0.1); border-radius: 50%;"></div>
            <h3 style="margin: 0 0 12px; color: #1a202c; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center;">
              <span style="width: 8px; height: 8px; background: #667eea; border-radius: 50%; margin-right: 10px;"></span>
              INVOICE DETAILS
            </h3>
            <div style="space-y: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid rgba(100,116,139,0.1);">
                <span style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Date:</span>
                <span style="color: #1a202c; font-weight: 700; font-size: 12px;">${currentDate}</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0;">
                <span style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Service:</span>
                <span style="color: #1a202c; font-weight: 700; font-size: 12px;">${
                  bookingData.serviceDate
                }</span>
              </div>
            </div>
          </div>

          <!-- Customer Details -->
          <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 18px; border-radius: 12px; border-left: 4px solid #764ba2; position: relative;">
            <div style="position: absolute; top: -5px; right: -5px; width: 20px; height: 20px; background: rgba(118,75,162,0.1); border-radius: 50%;"></div>
            <h3 style="margin: 0 0 12px; color: #1a202c; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center;">
              <span style="width: 8px; height: 8px; background: #764ba2; border-radius: 50%; margin-right: 10px;"></span>
              CUSTOMER
            </h3>
            <div style="text-align: left;">
              <p style="margin: 0 0 6px; color: #1a202c; font-weight: 700; font-size: 14px; text-transform: uppercase;">${
                bookingData.name
              }</p>
              <p style="margin: 0 0 4px; color: #64748b; font-size: 11px; font-weight: 600;">📱 ${
                bookingData.mobile
              }</p>
              <p style="margin: 0; color: #64748b; font-size: 11px; font-weight: 600;">✉️ ${
                bookingData.email
              }</p>
            </div>
          </div>

          <!-- Service Location -->
          <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 18px; border-radius: 12px; border-left: 4px solid #10b981; position: relative;">
            <div style="position: absolute; top: -5px; right: -5px; width: 20px; height: 20px; background: rgba(16,185,129,0.1); border-radius: 50%;"></div>
            <h3 style="margin: 0 0 12px; color: #1a202c; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center;">
              <span style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; margin-right: 10px;"></span>
              LOCATION
            </h3>
            <div style="text-align: left;">
              <p style="margin: 0 0 4px; color: #1a202c; font-size: 12px; font-weight: 600; line-height: 1.3;">${
                bookingData.flatHouseNo
              }, ${bookingData.areaStreet}</p>
              ${
                bookingData.landmark
                  ? `<p style="margin: 0 0 4px; color: #64748b; font-size: 11px; font-weight: 500;">Near ${bookingData.landmark}</p>`
                  : ""
              }
              <p style="margin: 0; color: #1a202c; font-weight: 700; font-size: 12px; text-transform: uppercase;">${
                bookingData.townCity
              }</p>
            </div>
          </div>
        </div>

        <!-- Vehicle Information Section -->
        <div style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 25px; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, #667eea, #764ba2);"></div>
          
          <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <div style="width: 35px; height: 35px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
              <span style="color: white; font-size: 16px; font-weight: bold;">🚗</span>
            </div>
            <h3 style="margin: 0; color: #1a202c; font-size: 18px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">VEHICLE INFORMATION</h3>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px;">
            <div style="background: linear-gradient(135deg, #f8fafc, #e2e8f0); padding: 12px; border-radius: 10px; text-align: center; border: 1px solid #e2e8f0;">
              <p style="margin: 0 0 6px; color: #64748b; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">MAKE & MODEL</p>
              <p style="margin: 0; color: #1a202c; font-weight: 800; font-size: 13px; text-transform: uppercase;">${
                bookingData.car?.name
              } ${bookingData.model?.name}</p>
            </div>
            <div style="background: linear-gradient(135deg, #f8fafc, #e2e8f0); padding: 12px; border-radius: 10px; text-align: center; border: 1px solid #e2e8f0;">
              <p style="margin: 0 0 6px; color: #64748b; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">PLATE NUMBER</p>
              <p style="margin: 0; color: #1a202c; font-weight: 800; font-size: 13px; text-transform: uppercase;">${
                bookingData.plateNumber
              }</p>
            </div>
            <div style="background: linear-gradient(135deg, #f8fafc, #e2e8f0); padding: 12px; border-radius: 10px; text-align: center; border: 1px solid #e2e8f0;">
              <p style="margin: 0 0 6px; color: #64748b; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">FUEL TYPE</p>
              <p style="margin: 0; color: #1a202c; font-weight: 800; font-size: 13px; text-transform: uppercase;">${
                bookingData.fuelType?.name
              }</p>
            </div>
            <div style="background: linear-gradient(135deg, #f8fafc, #e2e8f0); padding: 12px; border-radius: 10px; text-align: center; border: 1px solid #e2e8f0;">
              <p style="margin: 0 0 6px; color: #64748b; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">ODOMETER</p>
              <p style="margin: 0; color: #1a202c; font-weight: 800; font-size: 13px; text-transform: uppercase;">${
                bookingData.kmReading
              } KM</p>
            </div>
          </div>
        </div>

        <!-- Service Details Table -->
        <div style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; overflow: hidden; margin-bottom: 20px; position: relative;">
          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, #667eea, #764ba2);"></div>
          
          <div style="background: linear-gradient(135deg, #f8fafc, #e2e8f0); padding: 15px 20px; border-bottom: 2px solid #e2e8f0;">
            <div style="display: flex; align-items: center;">
              <div style="width: 35px; height: 35px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                <span style="color: white; font-size: 16px; font-weight: bold;">🔧</span>
              </div>
              <h3 style="margin: 0; color: #1a202c; font-size: 18px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">SERVICE BREAKDOWN</h3>
            </div>
          </div>
          
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: linear-gradient(135deg, #1a202c, #2d3748);">
                <th style="text-align: left; padding: 15px 20px; color: white; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; border-right: 1px solid rgba(255,255,255,0.1);">SERVICE DESCRIPTION</th>
                <th style="text-align: center; padding: 15px 20px; color: white; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              ${services
                .map(
                  (service, index) => `
                <tr style="background: ${
                  index % 2 === 0 ? "white" : "#f8fafc"
                }; border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 20px; color: #1a202c; font-size: 14px; font-weight: 600; border-right: 1px solid #e2e8f0;">${
                    service.title
                  }</td>
                  <td style="text-align: center; padding: 12px 20px; color: #1a202c; font-weight: 700; font-size: 14px;">₹${service.price.toLocaleString()}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
            <tfoot>
              <tr style="background: linear-gradient(135deg, #667eea, #764ba2);">
                <td style="padding: 18px 20px; color: white; font-weight: 800; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; border-right: 1px solid rgba(255,255,255,0.2);">TOTAL AMOUNT</td>
                <td style="text-align: center; padding: 18px 20px; color: #ffd700; font-weight: 900; font-size: 20px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">₹${totalPrice.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <!-- Professional Footer -->
        <div style="background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%); padding: 20px 25px; border-radius: 12px; text-align: center; color: white; position: relative; overflow: hidden; margin-top: 10px;">
          <!-- Decorative elements -->
          <div style="position: absolute; top: -15px; left: -15px; width: 60px; height: 60px; background: rgba(255,215,0,0.1); border-radius: 50%;"></div>
          <div style="position: absolute; bottom: -10px; right: -10px; width: 40px; height: 40px; background: rgba(102,126,234,0.1); border-radius: 50%;"></div>
          
          <div style="position: relative; z-index: 2;">
            <!-- Thank you message -->
            <div style="margin-bottom: 15px;">
              <h4 style="margin: 0 0 6px; font-size: 16px; color: #ffd700; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">THANK YOU FOR CHOOSING TWICK7!</h4>
              <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.8); font-weight: 500;">Premium automotive care you can trust</p>
            </div>
            
            <!-- Contact info in professional layout -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 15px 0; padding: 12px 0; border-top: 1px solid rgba(255,255,255,0.2); border-bottom: 1px solid rgba(255,255,255,0.2);">
              <div style="text-align: center;">
                <p style="margin: 0 0 4px; font-size: 10px; color: rgba(255,255,255,0.6); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">EMAIL SUPPORT</p>
                <p style="margin: 0; font-size: 13px; color: white; font-weight: 700;">support@twick7.com</p>
              </div>
              <div style="text-align: center;">
                <p style="margin: 0 0 4px; font-size: 10px; color: rgba(255,255,255,0.6); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">PHONE SUPPORT</p>
                <p style="margin: 0; font-size: 13px; color: white; font-weight: 700;">+91 1234567890</p>
              </div>
            </div>
            
            <!-- Copyright -->
            <p style="margin: 0; font-size: 6px; color: rgba(255,255,255,0.6); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">© ${new Date().getFullYear()} TWICK7 • ALL RIGHTS RESERVED • PREMIUM AUTOMOTIVE SERVICES</p>
          </div>
        </div>
      </div>
    </div>
  `;

    // Add the element to the DOM
    document.body.appendChild(invoiceElement);

    try {
      // Convert the HTML to canvas optimized for single page
      const canvas = await html2canvas(invoiceElement, {
        scale: 2, // Balanced quality for single page
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: 800,
        height: invoiceElement.scrollHeight,
      });

      // Convert canvas to PDF - single page optimized
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate dimensions to fit on single page
      const canvasAspectRatio = canvas.width / canvas.height;
      const pdfAspectRatio = pdfWidth / pdfHeight;

      let finalWidth, finalHeight;

      if (canvasAspectRatio > pdfAspectRatio) {
        // Canvas is wider, fit to width
        finalWidth = pdfWidth;
        finalHeight = pdfWidth / canvasAspectRatio;
      } else {
        // Canvas is taller, fit to height
        finalHeight = pdfHeight;
        finalWidth = pdfHeight * canvasAspectRatio;
      }

      // Center the image on the page
      const xOffset = (pdfWidth - finalWidth) / 2;
      const yOffset = (pdfHeight - finalHeight) / 2;

      pdf.addImage(imgData, "PNG", xOffset, yOffset, finalWidth, finalHeight);

      // Save with enhanced filename
      const timestamp = new Date().toISOString().slice(0, 10);
      pdf.save(`Twick7-Premium-Invoice-${bookingId}-${timestamp}.pdf`);

      // Show success message (assuming you have a toast system)
      if (typeof toast !== "undefined") {
        toast.success("Invoice downloaded successfully!");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      if (typeof toast !== "undefined") {
        toast.error("Failed to generate invoice. Please try again.");
      }
    } finally {
      // Clean up
      document.body.removeChild(invoiceElement);
    }
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
                <CurrentStepComponent
                  validationErrors={validationErrors}
                  onFieldValidation={handleFieldValidation}
                />
              </motion.div>
            </div>
          </div>

          {/* Footer - Sticky */}
          <div className="sticky bottom-0 bg-white border-t p-4 sm:p-6">
            {validationErrors.length > 0 && (
              <div className="mb-4 space-y-2">
                {validationErrors.map((error, index) => (
                  <FormError
                    key={index}
                    message={error.message}
                    className="justify-center"
                  />
                ))}
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

              <Button
                onClick={goToNextStep}
                className="order-1 sm:order-2"
                disabled={isBookingLoading}
              >
                {isBookingLoading
                  ? "Processing..."
                  : currentStep === steps.length - 1
                  ? "Confirm Booking"
                  : "Next"}
                {currentStep !== steps.length - 1 && !isBookingLoading && (
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
          resetBooking();
        }}
        bookingId={bookingId}
        onDownloadInvoice={handleDownloadInvoice}
        onWhatsAppUpdate={handleWhatsAppUpdate}
      />
    </>
  );
}
