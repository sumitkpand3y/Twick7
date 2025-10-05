"use client";

import { useState, useEffect, useMemo } from "react";
import { useBookingStore } from "@/store/booking-store";
import { useBooking } from "@/hooks/useBooking";
import { Car } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Search, AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/utils/form-validation.utils";
import { cn } from "@/lib/utils";

interface CarStepProps {
  validationErrors: FieldError[];
  onFieldValidation?: (field: string, isValid: boolean) => void;
}

export function CarStep({ validationErrors, onFieldValidation }: CarStepProps) {
  const { bookingData, setBookingData } = useBookingStore();
  const { getVehicleCompatibility } = useBooking();
  const [searchTerm, setSearchTerm] = useState("");
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicleCompatibility = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const vehicles = await getVehicleCompatibility({});

      if (!vehicles || vehicles.length === 0) {
        setError("No vehicles found. Please try again later.");
        setAllCars([]);
        return;
      }

      const uniqueBrands = Array.from(
        new Map(vehicles.map((vehicle) => [vehicle.brand, vehicle])).values()
      );

      const transformedCars: Car[] = uniqueBrands.map((vehicle, index) => ({
        id: vehicle.id || `car-${index}`,
        name: vehicle.brand,
        image: `/cars/${vehicle.brand.toLowerCase().replace(/\s+/g, '-')}.png`,
        models: vehicles
          .filter((v) => v.brand === vehicle.brand)
          .map((v) => ({
            id: v.id,
            name: v.model,
            image: `/cars/${vehicle.brand.toLowerCase()}-${v.model.toLowerCase()}.jpg`,
            year: v.year,
          })),
      }));

      setAllCars(transformedCars);
      onFieldValidation?.('car', false);
    } catch (error) {
      console.error("Error fetching vehicle compatibility:", error);
      setError("Failed to load vehicles. Please try again.");
      setAllCars([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicleCompatibility();
  }, []);

  useEffect(() => {
    if (bookingData.car) {
      onFieldValidation?.('car', true);
    }
  }, [bookingData.car, onFieldValidation]);

  const filteredCars = useMemo(() => {
    if (allCars.length === 0) return [];
    return allCars.filter((car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allCars]);

  const handleCarSelect = (car: Car) => {
    setBookingData({ car, model: null });
    onFieldValidation?.('car', true);
  };

  const handleRetry = () => {
    fetchVehicleCompatibility();
  };

  const getError = (fieldName: string): string | undefined => {
    return validationErrors.find((err) => err.field === fieldName)?.message;
  };

  const hasError = (fieldName: string): boolean => {
    return validationErrors.some((err) => err.field === fieldName);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Select Your Car Brand</h2>
          <p className="text-muted-foreground">Loading cars...</p>
        </div>
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Fetching vehicle brands...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Select Your Car Brand</h2>
          <p className="text-muted-foreground">Choose your car brand</p>
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
        <h2 className="text-2xl font-bold mb-2">Select Your Car Brand</h2>
        <p className="text-muted-foreground">Choose your car brand</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search car brands..."
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

      {filteredCars.length === 0 && allCars.length > 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-lg font-semibold text-foreground mb-1">
            No cars found
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            No cars match "{searchTerm}"
          </p>
          <Button variant="outline" size="sm" onClick={() => setSearchTerm("")}>
            Clear Search
          </Button>
        </div>
      ) : filteredCars.length === 0 && allCars.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-lg font-semibold text-foreground mb-1">
            No cars available
          </p>
          <p className="text-sm text-muted-foreground">
            No cars available at the moment
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {filteredCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div
                  className={cn(
                    "border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg relative",
                    bookingData.car?.id === car.id
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  )}
                  onClick={() => handleCarSelect(car)}
                >
                  {bookingData.car?.id === car.id && (
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
                  <div className="relative w-full h-16 mb-3">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      className="object-contain rounded-md"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/cars/default-car.png';
                      }}
                    />
                  </div>
                  <h3 className="font-semibold text-center text-sm truncate">
                    {car.name}
                  </h3>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    {car.models.length} {car.models.length === 1 ? 'model' : 'models'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Showing {filteredCars.length} of {allCars.length} brands
          </div>
        </>
      )}

      {hasError('car') && (
        <Alert variant="destructive" className="border-2 animate-in fade-in-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span className="font-medium">{getError('car')}</span>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
