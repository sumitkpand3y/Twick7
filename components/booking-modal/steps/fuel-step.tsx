'use client';

import { useEffect } from 'react';
import { useBookingStore } from '@/store/booking-store';
import { fuelTypes } from '@/lib/data';
import { FuelType } from '@/types';
import { motion } from 'framer-motion';
import { CircleAlert as AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FieldError } from '@/utils/form-validation.utils';
import { cn } from '@/lib/utils';

interface FuelStepProps {
  validationErrors: FieldError[];
  onFieldValidation?: (field: string, isValid: boolean) => void;
}

export function FuelStep({ validationErrors, onFieldValidation }: FuelStepProps) {
  const { bookingData, setBookingData } = useBookingStore();

  useEffect(() => {
    if (bookingData.fuelType) {
      onFieldValidation?.('fuelType', true);
    }
  }, [bookingData.fuelType, onFieldValidation]);

  const handleFuelSelect = (fuelType: FuelType) => {
    setBookingData({ fuelType });
    onFieldValidation?.('fuelType', true);
  };

  const getError = (fieldName: string): string | undefined => {
    return validationErrors.find((err) => err.field === fieldName)?.message;
  };

  const hasError = (fieldName: string): boolean => {
    return validationErrors.some((err) => err.field === fieldName);
  };

  const fuelIcons: { [key: string]: string } = {
    'Petrol': '⛽',
    'Diesel': '🛢️',
    'CNG': '💨',
    'Electric': '🔋',
    'Hybrid': '🔌'
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Select Fuel Type</h2>
        <p className="text-muted-foreground">Choose your vehicle's fuel type</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
        {fuelTypes.map((fuel) => (
          <motion.div
            key={fuel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: parseInt(fuel.id) * 0.1 }}
          >
            <div
              className={cn(
                'border rounded-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-lg relative',
                bookingData.fuelType?.id === fuel.id
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                  : 'border-border hover:border-primary/50'
              )}
              onClick={() => handleFuelSelect(fuel)}
            >
              {bookingData.fuelType?.id === fuel.id && (
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
                <div className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">
                    {fuelIcons[fuel.name] || fuel.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold text-lg">{fuel.name}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {hasError('fuelType') && (
        <Alert variant="destructive" className="border-2 animate-in fade-in-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span className="font-medium">{getError('fuelType')}</span>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
