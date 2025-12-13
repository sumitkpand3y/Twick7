"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useBookingStore } from "@/store/booking-store";
import { useBooking } from "@/hooks/useBooking";
import { Car } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Search,
  CircleAlert as AlertCircle,
  Loader as Loader2,
  RefreshCw,
  X,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/utils/form-validation.utils";
import { cn } from "@/lib/utils";
import { debounce } from "lodash";

interface CarStepProps {
  validationErrors: FieldError[];
  onFieldValidation?: (field: string, isValid: boolean) => void;
}

// Virtual scrolling constants
const ITEMS_PER_PAGE = 24;

export function CarStep({ validationErrors, onFieldValidation }: CarStepProps) {
  const { bookingData, setBookingData } = useBookingStore();
  const { getVehicleCompatibility } = useBooking();
  const [searchTerm, setSearchTerm] = useState("");
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const observerTarget = useRef<HTMLDivElement>(null);
  const searchAbortController = useRef<AbortController | null>(null);

  // Memoized car data fetching
  const fetchVehicleCompatibility = useCallback(
    async (searchQuery?: string) => {
      // Cancel previous request if any
      if (searchAbortController.current) {
        searchAbortController.current.abort();
      }

      searchAbortController.current = new AbortController();

      if (searchQuery) {
        setIsSearching(true);
      } else {
        setIsLoading(true);
      }

      setError(null);

      try {
        const vehicles = await getVehicleCompatibility({
          search: searchQuery || undefined,
        });

        if (!vehicles || vehicles.length === 0) {
          const errorMessage = searchQuery
            ? `No vehicles found for "${searchQuery}". Please try a different search term.`
            : "No car brands available at the moment. Please try again later.";

          setError(errorMessage);

          if (searchQuery) {
            setFilteredCars([]);
          } else {
            setAllCars([]);
            setFilteredCars([]);
          }
          return;
        }

        const uniqueBrands = Array.from(
          new Map(vehicles.map((vehicle) => [vehicle.brand, vehicle])).values()
        );

        const transformedCars: Car[] = uniqueBrands.map((vehicle, index) => ({
          id: vehicle.id || `car-${index}-${Date.now()}`,
          name: vehicle.brand,
          image: `/cars/${vehicle.brand
            .toLowerCase()
            .replace(/\s+/g, "-")}.png`,
          models: vehicles
            .filter((v) => v.brand === vehicle.brand)
            .map((v) => ({
              id: v.id,
              name: v.model,
              image: `/cars/${vehicle.brand.toLowerCase()}-${v.model.toLowerCase()}.jpg`,
              year: v.year,
            })),
        }));

        if (searchQuery) {
          setFilteredCars(transformedCars);
        } else {
          setAllCars(transformedCars);
          setFilteredCars(transformedCars);
        }

        setVisibleCount(ITEMS_PER_PAGE);
        onFieldValidation?.("car", false);
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.error("Search request cancelled");
          return;
        }
        console.error("Error fetching vehicle compatibility:", error);

        const errorMessage = searchQuery
          ? `Failed to search for "${searchQuery}". Please try again.`
          : "Failed to load car brands. Please check your connection and try again.";

        setError(errorMessage);

        if (!searchQuery) {
          setAllCars([]);
          setFilteredCars([]);
        }
      } finally {
        setIsLoading(false);
        setIsSearching(false);
      }
    },
    [onFieldValidation]
  );

  // Debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        if (query.trim()) {
          fetchVehicleCompatibility(query);
        } else {
          // Reset to all cars when search is cleared
          setFilteredCars(allCars);
          setVisibleCount(ITEMS_PER_PAGE);
          setError(null);
        }
      }, 500), // Increased debounce time for better performance
    [fetchVehicleCompatibility, allCars]
  );

  // Handle search input change
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchTerm(value);

      if (value.trim()) {
        debouncedSearch(value);
      } else {
        // Immediate reset when clearing search
        debouncedSearch.cancel();
        setFilteredCars(allCars);
        setVisibleCount(ITEMS_PER_PAGE);
        setError(null);
      }
    },
    [debouncedSearch, allCars]
  );

  // Clear search
  const handleClearSearch = useCallback(() => {
    setSearchTerm("");
    setFilteredCars(allCars);
    setVisibleCount(ITEMS_PER_PAGE);
    setError(null);
    debouncedSearch.cancel();
  }, [allCars, debouncedSearch]);

  // Initial load
  useEffect(() => {
    fetchVehicleCompatibility();
  }, [fetchVehicleCompatibility]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
      if (searchAbortController.current) {
        searchAbortController.current.abort();
      }
    };
  }, [debouncedSearch]);

  // Validation effect
  useEffect(() => {
    if (bookingData.car) {
      onFieldValidation?.("car", true);
    }
  }, [bookingData.car, onFieldValidation]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!observerTarget.current || visibleCount >= filteredCars.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + ITEMS_PER_PAGE, filteredCars.length)
          );
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px", // Load more before reaching the bottom
      }
    );

    observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [filteredCars.length, visibleCount]);

  // Memoized visible cars for virtual scrolling
  const visibleCars = useMemo(() => {
    return filteredCars.slice(0, visibleCount);
  }, [filteredCars, visibleCount]);

  const handleCarSelect = useCallback(
    (car: Car) => {
      setBookingData({ car, model: null });
      onFieldValidation?.("car", true);
    },
    [setBookingData, onFieldValidation]
  );

  const handleRetry = useCallback(() => {
    if (searchTerm) {
      fetchVehicleCompatibility(searchTerm);
    } else {
      fetchVehicleCompatibility();
    }
  }, [fetchVehicleCompatibility, searchTerm]);

  const getError = useCallback(
    (fieldName: string): string | undefined => {
      return validationErrors.find((err) => err.field === fieldName)?.message;
    },
    [validationErrors]
  );

  const hasError = useCallback(
    (fieldName: string): boolean => {
      return validationErrors.some((err) => err.field === fieldName);
    },
    [validationErrors]
  );

  // Optimized car item component
  const CarItem = useCallback(
    ({ car, index }: { car: Car; index: number }) => (
      <motion.div
        key={car.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: Math.min(index * 0.03, 0.5) }}
      >
        <div
          className={cn(
            "border rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-md relative group",
            "active:scale-95 transform-gpu",
            bookingData.car?.id === car.id
              ? "border-primary bg-primary/5 ring-1 ring-primary/20"
              : "border-border hover:border-primary/30"
          )}
          onClick={() => handleCarSelect(car)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") && handleCarSelect(car)
          }
        >
          {bookingData.car?.id === car.id && (
            <div className="absolute -top-1 -right-1 bg-primary text-white rounded-full p-1 z-10 shadow-sm">
              <svg
                className="h-3 w-3"
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
          <div className="relative w-full aspect-square mb-2">
            <Image
              src={car.image}
              alt={car.name}
              fill
              className="object-contain rounded-md"
              sizes="(max-width: 640px) 25vw, (max-width: 768px) 16vw, (max-width: 1024px) 12vw, 8vw"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Ik0zMiAxNkMyOC42ODYzIDE2IDI2IDE4LjY4NjMgMjYgMjJDMjYgMjUuMzEzNyAyOC42ODYzIDI4IDMyIDI4QzM1LjMxMzcgMjggMzggMjUuMzEzNyAzOCAyMkMzOCAxOC42ODYzIDM1LjMxMzcgMTYgMzIgMTZaIiBmaWxsPSIjZGRlMWU2Ii8+CjxwYXRoIGQ9Ik0yMiAzNkMxOS43OTEgMzYgMTggMzcuNzkxIDE4IDQwVjQ4QzE4IDUwLjIwOSAxOS43OTEgNTIgMjIgNTJINDJDNDQuMjA5IDUyIDQ2IDUwLjIwOSA0NiA0OFY0MEM0NiAzNy43OTEgNDQuMjA5IDM2IDQyIDM2SDIyWiIgZmlsbD0iI2RkZTFlNiIvPgo8L3N2Zz4K"
            />
          </div>
          <h3 className="font-semibold text-center text-xs sm:text-sm truncate px-1">
            {car.name}
          </h3>
          <p className="text-xs text-muted-foreground text-center mt-1">
            {car.models.length} {car.models.length === 1 ? "model" : "models"}
          </p>
        </div>
      </motion.div>
    ),
    [bookingData.car?.id, handleCarSelect]
  );

  // Loading skeleton for better UX
  const LoadingSkeleton = useCallback(
    () => (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="border rounded-lg p-3 animate-pulse">
            <div className="w-full aspect-square bg-muted rounded-md mb-2"></div>
            <div className="h-3 bg-muted rounded mb-1 mx-2"></div>
            <div className="h-2 bg-muted rounded mx-4"></div>
          </div>
        ))}
      </div>
    ),
    []
  );

  // Render search input (always visible)
  const renderSearchInput = () => (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search car brands..."
        value={searchTerm}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="pl-10 pr-10"
        disabled={isLoading && !isSearching}
      />
      {(searchTerm || isSearching) && (
        <button
          onClick={handleClearSearch}
          disabled={isSearching}
          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors"
          aria-label="Clear search"
        >
          {isSearching ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <X className="h-4 w-4" />
          )}
        </button>
      )}
    </div>
  );

  // Render empty state
  const renderEmptyState = () => {
    if (searchTerm) {
      return (
        <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-lg font-semibold text-foreground mb-1">
            No cars found
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            No car brands match "{searchTerm}"
          </p>
          <Button variant="outline" size="sm" onClick={handleClearSearch}>
            Clear Search
          </Button>
        </div>
      );
    }

    return (
      <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
        <p className="text-lg font-semibold text-foreground mb-1">
          No car brands available
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          We couldn't find any car brands at the moment.
        </p>
        <Button variant="outline" size="sm" onClick={handleRetry}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  };

  // Render error state with search input
  const renderErrorState = () => (
    <>
      {renderSearchInput()}

      {/* Show empty state below error when there are no cars */}
      {filteredCars.length === 0 && renderEmptyState()}
    </>
  );

  // Render loading state
  const renderLoadingState = () => (
    <>
      {renderSearchInput()}
      <div className="text-center py-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">
          {isSearching
            ? `Searching for "${searchTerm}"...`
            : "Loading car brands..."}
        </p>
      </div>
      <LoadingSkeleton />
    </>
  );

  // Render success state with cars
  const renderSuccessState = () => (
    <>
      {renderSearchInput()}

      {/* Search status */}
      {isSearching && (
        <div className="text-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Searching for "{searchTerm}"...
          </p>
        </div>
      )}

      {/* Cars grid */}
      {visibleCars.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {visibleCars.map((car, index) => (
              <CarItem key={car.id} car={car} index={index} />
            ))}
          </div>

          {/* Loading more indicator */}
          {visibleCount < filteredCars.length && (
            <div ref={observerTarget} className="text-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto" />
            </div>
          )}

          {/* Results count */}
          <div className="text-center text-sm text-muted-foreground">
            Showing {Math.min(visibleCount, filteredCars.length)} of{" "}
            {filteredCars.length} brand{filteredCars.length !== 1 ? "s" : ""}
            {searchTerm && ` for "${searchTerm}"`}
          </div>
        </>
      ) : (
        renderEmptyState()
      )}
    </>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Select Your Car Brand</h2>
        <p className="text-muted-foreground">Choose your car brand</p>
      </div>

      {/* Always show search input and conditionally render content */}
      {error && filteredCars.length === 0
        ? renderErrorState()
        : isLoading && !isSearching
        ? renderLoadingState()
        : renderSuccessState()}

      {/* Validation error */}
      {hasError("car") && (
        <Alert variant="destructive" className="border-2 animate-in fade-in-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span className="font-medium">{getError("car")}</span>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
