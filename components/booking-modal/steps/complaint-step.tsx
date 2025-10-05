"use client";

import { useBookingStore } from "@/store/booking-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { cn } from "@/lib/utils";
import { FieldError } from "@/utils/form-validation.utils";

interface ComplaintStepProps {
  validationErrors: FieldError[];
  onFieldValidation?: (field: string, isValid: boolean) => void;
}

export function ComplaintStep({
  validationErrors,
  onFieldValidation,
}: ComplaintStepProps) {
  const { bookingData, setBookingData } = useBookingStore();
  const [date, setDate] = useState<Date>();
  const [vehicleDetails, setVehicleDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce the plate number to avoid too many API calls
  const [debouncedPlateNumber] = useDebounce(bookingData.plateNumber, 500);

  // Simple validation function
  const validateField = useCallback((field: string, value: any): boolean => {
    switch (field) {
      case "serviceDate":
        return !!value;
      
      case "plateNumber":
        return !!value && value.length >= 3;
      
      case "complaint":
        return !!value && value.length >= 10;
      
      case "yearOfManufacturing":
        if (!value) return false;
        const year = parseInt(value);
        const currentYear = new Date().getFullYear();
        return year >= 1990 && year <= currentYear + 1;
      
      case "kmReading":
        if (!value) return false;
        const km = parseInt(value);
        return km >= 0 && km <= 1000000;
      
      default:
        return true;
    }
  }, []);

  // Handle input change - validation happens automatically
  const handleInputChange = useCallback((field: string, value: string) => {
    setBookingData({ [field]: value });

    // Auto-validate and notify parent
    const isValid = validateField(field, value);
    onFieldValidation?.(field, isValid);
  }, [setBookingData, validateField, onFieldValidation]);

  const handleDateSelect = useCallback((selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      
      setBookingData({ serviceDate: formattedDate });

      // Auto-validate date selection
      onFieldValidation?.("serviceDate", true);
    }
  }, [setBookingData, onFieldValidation]);

  // Helper functions to get errors - only show errors from props (from modal validation)
  const getError = useCallback((fieldName: string): string | undefined => {
    return validationErrors.find((err) => err.field === fieldName)?.message;
  }, [validationErrors]);

  const hasError = useCallback((fieldName: string): boolean => {
    return validationErrors.some((err) => err.field === fieldName);
  }, [validationErrors]);

  // Auto-clear validation errors when fields are filled
  useEffect(() => {
    const fieldsToCheck = [
      "serviceDate",
      "plateNumber", 
      "complaint",
      "yearOfManufacturing",
      "kmReading"
    ];

    fieldsToCheck.forEach(field => {
      const value = bookingData[field as keyof typeof bookingData];
      const isValid = validateField(field, value);
      
      // If field is valid but still has validation error, clear it
      if (isValid && hasError(field)) {
        onFieldValidation?.(field, true);
      }
    });
  }, [bookingData, validateField, hasError, onFieldValidation]);

  // Fetch vehicle details when plate number changes
  useEffect(() => {
    const fetchVehicleDetails = async () => {
      if (!debouncedPlateNumber || debouncedPlateNumber.length < 3) {
        setVehicleDetails(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Replace with your actual API endpoint
        const response = await fetch(
          `/api/vehicles?plateNumber=${encodeURIComponent(debouncedPlateNumber)}`
        );

        if (!response.ok) {
          throw new Error("Vehicle not found");
        }

        const data = await response.json();
        setVehicleDetails(data);

        // Auto-fill the form with vehicle details
        setBookingData({
          yearOfManufacturing: data.year || "",
        });

        // Auto-validate the year field
        if (data.year) {
          onFieldValidation?.("yearOfManufacturing", true);
        }
      } catch (err) {
        setError("Vehicle not found");
        setVehicleDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [debouncedPlateNumber, setBookingData, onFieldValidation]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Service Details</h2>
        <p className="text-muted-foreground">
          Tell us about your service requirements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Service Date Field */}
          <div>
            <Label htmlFor="serviceDate">Preferred Service Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal mt-1",
                    hasError("serviceDate") &&
                      "border-red-500 text-red-500 bg-red-50"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {hasError("serviceDate") && (
              <p className="text-sm text-red-500 mt-1 animate-in fade-in-50">
                {getError("serviceDate")}
              </p>
            )}
          </div>

          {/* Plate Number Field */}
          <div>
            <Label htmlFor="plateNumber">Vehicle Plate Number *</Label>
            <Input
              id="plateNumber"
              placeholder="e.g., MH12AB1234"
              value={bookingData.plateNumber || ""}
              onChange={(e) => handleInputChange("plateNumber", e.target.value)}
              className={cn(
                "mt-1 transition-colors duration-200",
                hasError("plateNumber") &&
                  "border-red-500 focus-visible:ring-red-500 bg-red-50",
                !hasError("plateNumber") && bookingData.plateNumber &&
                  "border-green-500 focus-visible:ring-green-500 bg-green-50"
              )}
            />
            {loading && (
              <p className="text-sm text-muted-foreground mt-1">
                Searching for vehicle...
              </p>
            )}
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            {hasError("plateNumber") && (
              <p className="text-sm text-red-500 mt-1 animate-in fade-in-50">
                {getError("plateNumber")}
              </p>
            )}
            {vehicleDetails && !hasError("plateNumber") && (
              <div className="mt-2 p-3 border border-green-200 rounded-lg bg-green-50 animate-in fade-in-50">
                <h4 className="font-medium text-green-800">Vehicle Found ✓</h4>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-green-700">
                  <div>
                    <span className="font-medium">Make:</span>{" "}
                    {vehicleDetails.make}
                  </div>
                  <div>
                    <span className="font-medium">Model:</span>{" "}
                    {vehicleDetails.model}
                  </div>
                  <div>
                    <span className="font-medium">Year:</span>{" "}
                    {vehicleDetails.year}
                  </div>
                  <div>
                    <span className="font-medium">VIN:</span>{" "}
                    {vehicleDetails.vin}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Complaint Field */}
          <div>
            <Label htmlFor="complaint">Main Complaint *</Label>
            <Textarea
              id="complaint"
              placeholder="Describe your main complaint (minimum 10 characters)..."
              value={bookingData.complaint || ""}
              onChange={(e) => handleInputChange("complaint", e.target.value)}
              className={cn(
                "mt-1 transition-colors duration-200",
                hasError("complaint") &&
                  "border-red-500 focus-visible:ring-red-500 bg-red-50",
                !hasError("complaint") && bookingData.complaint && bookingData.complaint.length >= 10 &&
                  "border-green-500 focus-visible:ring-green-500 bg-green-50"
              )}
              rows={4}
            />
            <div className="flex justify-between items-center mt-1">
              {hasError("complaint") ? (
                <p className="text-sm text-red-500 animate-in fade-in-50">
                  {getError("complaint")}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Please describe your issue in detail
                </p>
              )}
              <span
                className={cn(
                  "text-xs font-medium transition-colors duration-200",
                  (bookingData.complaint?.length || 0) < 10
                    ? "text-red-500"
                    : "text-green-500"
                )}
              >
                {bookingData.complaint?.length || 0}/10
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Year of Manufacturing Field */}
          <div>
            <Label htmlFor="yearOfManufacturing">Year of Manufacturing *</Label>
            <Input
              id="yearOfManufacturing"
              type="number"
              placeholder="e.g., 2020"
              value={bookingData.yearOfManufacturing || ""}
              onChange={(e) =>
                handleInputChange("yearOfManufacturing", e.target.value)
              }
              className={cn(
                "mt-1 transition-colors duration-200",
                hasError("yearOfManufacturing") &&
                  "border-red-500 focus-visible:ring-red-500 bg-red-50",
                !hasError("yearOfManufacturing") && bookingData.yearOfManufacturing &&
                  "border-green-500 focus-visible:ring-green-500 bg-green-50"
              )}
              min={1990}
              max={new Date().getFullYear() + 1}
            />
            {hasError("yearOfManufacturing") && (
              <p className="text-sm text-red-500 mt-1 animate-in fade-in-50">
                {getError("yearOfManufacturing")}
              </p>
            )}
          </div>

          {/* KM Reading Field */}
          <div>
            <Label htmlFor="kmReading">KM Reading *</Label>
            <Input
              id="kmReading"
              type="number"
              placeholder="e.g., 25000"
              value={bookingData.kmReading || ""}
              onChange={(e) => handleInputChange("kmReading", e.target.value)}
              className={cn(
                "mt-1 transition-colors duration-200",
                hasError("kmReading") &&
                  "border-red-500 focus-visible:ring-red-500 bg-red-50",
                !hasError("kmReading") && bookingData.kmReading &&
                  "border-green-500 focus-visible:ring-green-500 bg-green-50"
              )}
              min={0}
              max={1000000}
            />
            {hasError("kmReading") && (
              <p className="text-sm text-red-500 mt-1 animate-in fade-in-50">
                {getError("kmReading")}
              </p>
            )}
          </div>

          {/* Specific Issues Field (Optional) */}
          <div>
            <Label htmlFor="specificIssues">
              Any Specific Issues? (Optional)
            </Label>
            <Textarea
              id="specificIssues"
              placeholder="Any additional details, noises, symptoms, or specific concerns..."
              value={bookingData.specificIssues || ""}
              onChange={(e) =>
                handleInputChange("specificIssues", e.target.value)
              }
              className="mt-1 transition-colors duration-200"
              rows={4}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Optional: Share any additional symptoms or concerns
            </p>
          </div>
        </div>
      </div>

      {/* Real-time validation status */}
      <div
        className={cn(
          "p-4 rounded-lg border transition-all duration-300 animate-in fade-in-50",
          validationErrors.length === 0
            ? "border-green-200 bg-green-50"
            : "border-red-200 bg-red-50"
        )}
      >
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "w-3 h-3 rounded-full animate-pulse",
              validationErrors.length === 0 ? "bg-green-500" : "bg-red-500"
            )}
          />
          <p
            className={cn(
              "text-sm font-medium",
              validationErrors.length === 0 ? "text-green-800" : "text-red-800"
            )}
          >
            {validationErrors.length === 0
              ? "All fields are valid ✓"
              : `Please fix ${validationErrors.length} error${
                  validationErrors.length > 1 ? "s" : ""
                } before proceeding`}
          </p>
        </div>
      </div>
    </div>
  );
}