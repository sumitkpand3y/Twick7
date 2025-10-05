"use client";

import { useState, useEffect, useMemo } from "react";
import { useBookingStore } from "@/store/booking-store";
import { CarModel } from "@/types";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FieldError } from "@/utils/form-validation.utils";
import { cn } from "@/lib/utils";

interface ModelStepProps {
  validationErrors: FieldError[];
  onFieldValidation?: (field: string, isValid: boolean) => void;
}

export function ModelStep({ validationErrors, onFieldValidation }: ModelStepProps) {
  const { bookingData, setBookingData } = useBookingStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (bookingData.model) {
      onFieldValidation?.('model', true);
    }
  }, [bookingData.model, onFieldValidation]);

  const filteredModels = useMemo(() => {
    if (!bookingData.car) return [];

    const filtered = bookingData.car.models.filter((model) =>
      model.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const uniqueModels = filtered.filter(
      (model, index, self) =>
        index === self.findIndex((m) => m.name === model.name)
    );

    return uniqueModels;
  }, [searchTerm, bookingData.car]);

  const handleModelSelect = (model: CarModel) => {
    setBookingData({ model });
    onFieldValidation?.('model', true);
  };

  const getError = (fieldName: string): string | undefined => {
    return validationErrors.find((err) => err.field === fieldName)?.message;
  };

  const hasError = (fieldName: string): boolean => {
    return validationErrors.some((err) => err.field === fieldName);
  };

  if (!bookingData.car) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto space-y-4">
          <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto opacity-50" />
          <h3 className="text-xl font-semibold text-foreground">
            Please Select a Car First
          </h3>
          <p className="text-muted-foreground">
            You need to select a car brand before choosing a model
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Select Your Car Model</h2>
        <p className="text-muted-foreground">
          Choose your {bookingData.car.name} model
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={`Search ${bookingData.car.name} models...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        )}
      </div>

      {filteredModels.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-lg font-semibold text-foreground mb-1">
            {searchTerm ? 'No models found' : 'No models available'}
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            {searchTerm
              ? `No models match "${searchTerm}" for ${bookingData.car.name}`
              : `No models found for ${bookingData.car.name}`}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-primary hover:underline text-sm font-medium"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {filteredModels.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div
                  className={cn(
                    "border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg relative min-h-[120px] flex flex-col justify-center",
                    bookingData.model?.id === model.id
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  )}
                  onClick={() => handleModelSelect(model)}
                >
                  {bookingData.model?.id === model.id && (
                    <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1 z-10">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                      {model.name}
                    </h3>
                    {model.year && (
                      <p className="text-xs text-muted-foreground">
                        Year: {model.year}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Showing {filteredModels.length} model{filteredModels.length !== 1 ? 's' : ''}
          </div>
        </>
      )}

      {hasError('model') && (
        <Alert variant="destructive" className="border-2 animate-in fade-in-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span className="font-medium">{getError('model')}</span>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
