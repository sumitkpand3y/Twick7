"use client";

import { useState, useEffect } from "react";
import { useBookingStore } from "@/store/booking-store";
import { useBooking } from "@/hooks/useBooking";
import { Car } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Search, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function CarStep() {
  const { bookingData, setBookingData } = useBookingStore();
  const { getVehicleCompatibility } = useBooking();
  const [searchTerm, setSearchTerm] = useState("");
  const [allCars, setAllCars] = useState<Car[]>([]); // Store all cars separately
  const [filteredCars, setFilteredCars] = useState<Car[]>([]); // Store filtered results
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch vehicle compatibility data on component mount
  useEffect(() => {
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

        // Transform API response to Car type
        const uniqueBrands = Array.from(
          new Map(vehicles.map((vehicle) => [vehicle.brand, vehicle])).values()
        );

        const transformedCars: Car[] = uniqueBrands.map((vehicle, index) => ({
          id: vehicle.id || `car-${index}`,
          name: vehicle.brand,
          image: `/cars/${vehicle.brand.toLowerCase()}.png`,
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
        setFilteredCars(transformedCars); // Initialize filtered cars with all cars
      } catch (error) {
        console.error("Error fetching vehicle compatibility:", error);
        setError("Failed to load vehicles. Please try again.");
        setAllCars([]);
        setFilteredCars([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicleCompatibility();
  }, []);

  // Filter cars based on search term - FIXED: No infinite loop
  useEffect(() => {
    if (allCars.length > 0) {
      const filtered = allCars.filter((car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCars(filtered);
    } else {
      setFilteredCars([]);
    }
  }, [searchTerm, allCars]); // Only depend on searchTerm and allCars

  const handleCarSelect = (car: Car) => {
    setBookingData({ car, model: null });
  };

  const handleRetry = () => {
    setError(null);
    // Re-fetch data
    const fetchVehicleCompatibility = async () => {
      setIsLoading(true);
      try {
        const vehicles = await getVehicleCompatibility({});
        // ... same transformation logic as above
        const uniqueBrands = Array.from(
          new Map(vehicles.map((vehicle) => [vehicle.brand, vehicle])).values()
        );

        const transformedCars: Car[] = uniqueBrands.map((vehicle, index) => ({
          id: vehicle.id || `car-${index}`,
          name: vehicle.brand,
          image: `/cars/${vehicle.brand.toLowerCase()}.jpg`,
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
        setFilteredCars(transformedCars);
      } catch (error) {
        setError("Failed to load vehicles. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicleCompatibility();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Select Your Car Brand</h2>
          <p className="text-muted-foreground">Loading cars...</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="border rounded-lg p-6 animate-pulse">
              <div className="w-full h-16 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
            </div>
          ))}
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

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
            >
              Retry
            </button>
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
      </div>

      {filteredCars.length === 0 && allCars.length > 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            No cars found matching "{searchTerm}"
          </p>
        </div>
      ) : filteredCars.length === 0 && allCars.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            No cars available at the moment
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={`border rounded-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  bookingData.car?.id === car.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => handleCarSelect(car)}
              >
                <Image
                  src={car.image}
                  alt={car.name}
                  className="w-full h-16 object-cover rounded-md mb-4"
                  width={240}
                  height={120}
                 
                />
                <h3 className="font-semibold text-center text-sm">
                  {car.name}
                </h3>
                <p className="text-sm text-muted-foreground text-center mt-1">
                  {car.models.length} models available
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
