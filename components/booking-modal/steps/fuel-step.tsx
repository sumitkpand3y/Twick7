'use client';

import { useEffect, useState } from 'react';
import { useBookingStore } from '@/store/booking-store';
import { useBooking } from '@/hooks/useBooking';
import { FuelType } from '@/types';
import { motion } from 'framer-motion';
import { CircleAlert as AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FieldError } from '@/utils/form-validation.utils';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FuelStepProps {
  validationErrors: FieldError[];
  onFieldValidation?: (field: string, isValid: boolean) => void;
}

export function FuelStep({ validationErrors, onFieldValidation }: FuelStepProps) {
  const { bookingData, setBookingData } = useBookingStore();
  const { getVehicleCompatibility } = useBooking();
  const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch fuel types based on selected car and model
  const fetchFuelTypes = async () => {
    if (!bookingData.car || !bookingData.model) return;

    setIsLoading(true);
    setError(null);
    try {
      const vehicles = await getVehicleCompatibility({
        brand: bookingData.car.name,
        model: bookingData.model.name,
        year: bookingData.model.year
      });

      if (!vehicles || vehicles.length === 0) {
        setError("No fuel types found for this vehicle model.");
        setFuelTypes([]);
        return;
      }

      // Extract unique fuel types from the vehicles
      const uniqueFuelTypes = Array.from(
        new Map(
          vehicles
            .filter(vehicle => vehicle.fuelType) // Only include vehicles with fuelType
            .map(vehicle => [vehicle.fuelType, {
              id: vehicle.id || `fuel-${vehicle.fuelType?.toLowerCase()}`,
              name: vehicle.fuelType?.charAt(0).toUpperCase() + vehicle.fuelType?.slice(1).toLowerCase() || 'Unknown'
            }])
        ).values()
      ) as FuelType[];

      // If no fuel types found in API, fallback to default fuel types
      if (uniqueFuelTypes.length === 0) {
        const defaultFuelTypes: FuelType[] = [
          { id: '1', name: 'Petrol' },
          { id: '2', name: 'Diesel' },
          { id: '3', name: 'CNG' },
          { id: '4', name: 'Electric' },
          { id: '5', name: 'Hybrid' }
        ];
        setFuelTypes(defaultFuelTypes);
      } else {
        setFuelTypes(uniqueFuelTypes);
      }

    } catch (error) {
      console.error("Error fetching fuel types:", error);
      setError("Failed to load fuel types. Please try again.");
      
      // Fallback to default fuel types on error
      const defaultFuelTypes: FuelType[] = [
        { id: '1', name: 'Petrol' },
        { id: '2', name: 'Diesel' },
        { id: '3', name: 'CNG' },
        { id: '4', name: 'Electric' },
        { id: '5', name: 'Hybrid' }
      ];
      setFuelTypes(defaultFuelTypes);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (bookingData.car && bookingData.model) {
      fetchFuelTypes();
    } else {
      // Reset fuel types if no car/model selected
      setFuelTypes([]);
      setError(null);
    }
  }, [bookingData.car, bookingData.model]);

  useEffect(() => {
    if (bookingData.fuelType) {
      onFieldValidation?.('fuelType', true);
    } else {
      onFieldValidation?.('fuelType', false);
    }
  }, [bookingData.fuelType, onFieldValidation]);

  const handleFuelSelect = (fuelType: FuelType) => {
    setBookingData({ fuelType });
    onFieldValidation?.('fuelType', true);
  };

  const handleRetry = () => {
    fetchFuelTypes();
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
    'Hybrid': '🔌',
    'Unknown': '❓'
  };

  if (!bookingData.car || !bookingData.model) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Select Fuel Type</h2>
          <p className="text-muted-foreground">Choose your vehicle's fuel type</p>
        </div>

        <div className="text-center py-20">
          <div className="max-w-md mx-auto space-y-4">
            <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto opacity-50" />
            <h3 className="text-xl font-semibold text-foreground">
              Complete Previous Steps
            </h3>
            <p className="text-muted-foreground">
              Please select a car brand and model first to see available fuel types
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Select Fuel Type</h2>
          <p className="text-muted-foreground">
            Loading fuel types for {bookingData.car.name} {bookingData.model.name}...
          </p>
        </div>
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Fetching available fuel types...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && fuelTypes.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Select Fuel Type</h2>
          <p className="text-muted-foreground">Choose your vehicle's fuel type</p>
        </div>

        <Alert variant="destructive" className="border-2">
          <AlertCircle className="h-5 w-5" />
          <AlertDescription className="flex flex-col gap-3">
            <p className="font-semibold">{error}</p>
            <Button
              onClick={handleRetry}
              variant="outline"
              size="sm"
              className="w-full sm:w-auto bg-white hover:bg-gray-50"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry Loading
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Select Fuel Type</h2>
        <p className="text-muted-foreground">
          Choose fuel type for your {bookingData.car.name} {bookingData.model.name}
          {bookingData.model.year && ` (${bookingData.model.year})`}
        </p>
      </div>

      {error && (
        <Alert variant="warning" className="border-2 border-yellow-200 bg-yellow-50">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription>
            <span className="text-yellow-800">{error} Showing default fuel types.</span>
          </AlertDescription>
        </Alert>
      )}

      {fuelTypes.length === 0 && !isLoading ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-lg font-semibold text-foreground mb-1">
            No Fuel Types Available
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            No fuel types found for {bookingData.car.name} {bookingData.model.name}
          </p>
          <Button variant="outline" size="sm" onClick={handleRetry}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {fuelTypes.map((fuel, index) => (
            <motion.div
              key={fuel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
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
      )}

      <div className="text-center text-sm text-muted-foreground">
        {fuelTypes.length > 0 && 
          `Showing ${fuelTypes.length} fuel type${fuelTypes.length !== 1 ? 's' : ''} available for your vehicle`
        }
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