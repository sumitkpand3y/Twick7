"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useBookingStore } from "@/store/booking-store";
import { useBooking } from "@/hooks/useBooking";
import { CarModel } from "@/types";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search, CircleAlert as AlertCircle, Loader2, X, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FieldError } from "@/utils/form-validation.utils";
import { cn } from "@/lib/utils";
import { debounce } from "lodash";
import { Button } from "@/components/ui/button";

interface ModelStepProps {
  validationErrors: FieldError[];
  onFieldValidation?: (field: string, isValid: boolean) => void;
}

// Virtual scrolling constants
const ITEMS_PER_PAGE = 24;

export function ModelStep({
  validationErrors,
  onFieldValidation,
}: ModelStepProps) {
  const { bookingData, setBookingData } = useBookingStore();
  const { getVehicleCompatibility } = useBooking();
  const [searchTerm, setSearchTerm] = useState("");
  const [allModels, setAllModels] = useState<CarModel[]>([]);
  const [filteredModels, setFilteredModels] = useState<CarModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const observerTarget = useRef<HTMLDivElement>(null);
  const searchAbortController = useRef<AbortController | null>(null);

  // Memoized model data fetching
  const fetchModels = useCallback(
    async (searchQuery?: string) => {
      if (!bookingData.car) return;

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
          brand: bookingData.car.name,
          search: searchQuery || undefined,
        });

        if (!vehicles || vehicles.length === 0) {
          const errorMessage = searchQuery
            ? `No models found for "${searchQuery}" in ${bookingData.car.name}. Please try a different search term.`
            : `No models available for ${bookingData.car.name} at the moment.`;

          setError(errorMessage);

          if (searchQuery) {
            setFilteredModels([]);
          } else {
            setAllModels([]);
            setFilteredModels([]);
          }
          return;
        }

        const transformedModels: CarModel[] = vehicles
          .filter((v) => v.brand === bookingData.car!.name)
          .map((v) => ({
            id: v.id || `model-${v.model}-${Date.now()}`,
            name: v.model,
            image: `/cars/${bookingData.car!.name.toLowerCase()}-${v.model.toLowerCase()}.jpg`,
            year: v.year,
          }));

        const uniqueModels = transformedModels.filter(
          (model, index, self) =>
            index === self.findIndex((m) => m.name === model.name)
        );

        if (searchQuery) {
          setFilteredModels(uniqueModels);
        } else {
          setAllModels(uniqueModels);
          setFilteredModels(uniqueModels);
        }

        setVisibleCount(ITEMS_PER_PAGE);
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.error("Model search request cancelled");
          return;
        }
        console.error("Error fetching models:", error);

        const errorMessage = searchQuery
          ? `Failed to search for "${searchQuery}". Please try again.`
          : `Failed to load ${bookingData.car.name} models. Please check your connection and try again.`;

        setError(errorMessage);

        if (!searchQuery) {
          setAllModels([]);
          setFilteredModels([]);
        }
      } finally {
        setIsLoading(false);
        setIsSearching(false);
      }
    },
    [bookingData.car]
  );

  // Debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        if (query.trim()) {
          fetchModels(query);
        } else {
          // Reset to all models when search is cleared
          setFilteredModels(allModels);
          setVisibleCount(ITEMS_PER_PAGE);
          setError(null);
        }
      }, 500),
    [fetchModels, allModels]
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
        setFilteredModels(allModels);
        setVisibleCount(ITEMS_PER_PAGE);
        setError(null);
      }
    },
    [debouncedSearch, allModels]
  );

  // Clear search
  const handleClearSearch = useCallback(() => {
    setSearchTerm("");
    setFilteredModels(allModels);
    setVisibleCount(ITEMS_PER_PAGE);
    setError(null);
    debouncedSearch.cancel();
  }, [allModels, debouncedSearch]);

  // Initial load when car is selected
  useEffect(() => {
    if (bookingData.car) {
      fetchModels();
    } else {
      setAllModels([]);
      setFilteredModels([]);
      setError(null);
    }
  }, [bookingData.car, fetchModels]);

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
    if (bookingData.model) {
      onFieldValidation?.("model", true);
    } else {
      onFieldValidation?.("model", false);
    }
  }, [bookingData.model, onFieldValidation]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!observerTarget.current || visibleCount >= filteredModels.length)
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + ITEMS_PER_PAGE, filteredModels.length)
          );
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [filteredModels.length, visibleCount]);

  // Memoized visible models for virtual scrolling
  const visibleModels = useMemo(() => {
    return filteredModels.slice(0, visibleCount);
  }, [filteredModels, visibleCount]);

  const handleModelSelect = useCallback(
    (model: CarModel) => {
      setBookingData({ model });
      onFieldValidation?.("model", true);
    },
    [setBookingData, onFieldValidation]
  );

  const handleRetry = useCallback(() => {
    if (searchTerm) {
      fetchModels(searchTerm);
    } else {
      fetchModels();
    }
  }, [fetchModels, searchTerm]);

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

  // Optimized model item component
  const ModelItem = useCallback(
    ({ model, index }: { model: CarModel; index: number }) => (
      <motion.div
        key={model.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: Math.min(index * 0.03, 0.5) }}
      >
        <div
          className={cn(
            "border rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-md relative group",
            "active:scale-95 transform-gpu",
            bookingData.model?.id === model.id
              ? "border-primary bg-primary/5 ring-1 ring-primary/20"
              : "border-border hover:border-primary/30"
          )}
          onClick={() => handleModelSelect(model)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") && handleModelSelect(model)
          }
        >
          {bookingData.model?.id === model.id && (
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
          <div className="text-center">
            <h3 className="font-semibold text-sm mb-2 line-clamp-2 px-1">
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
    ),
    [bookingData.model?.id, handleModelSelect]
  );

  // Loading skeleton for better UX
  const LoadingSkeleton = useCallback(
    () => (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="border rounded-lg p-3 animate-pulse">
            <div className="h-16 bg-muted rounded-md mb-2"></div>
            <div className="h-4 bg-muted rounded mb-1 mx-2"></div>
            <div className="h-3 bg-muted rounded mx-4"></div>
          </div>
        ))}
      </div>
    ),
    []
  );

  // Render search input (always visible when car is selected)
  const renderSearchInput = () => (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={`Search ${bookingData.car?.name} models...`}
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
            No models found
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            No {bookingData.car?.name} models match "{searchTerm}"
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
          No models available
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          We couldn't find any models for {bookingData.car?.name} at the moment.
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

      {/* Show empty state below error when there are no models */}
      {filteredModels.length === 0 && renderEmptyState()}
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
            : `Loading ${bookingData.car?.name} models...`}
        </p>
      </div>
      <LoadingSkeleton />
    </>
  );

  // Render success state with models
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

      {/* Models grid */}
      {visibleModels.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {visibleModels.map((model, index) => (
              <ModelItem key={model.id} model={model} index={index} />
            ))}
          </div>

          {/* Loading more indicator */}
          {visibleCount < filteredModels.length && (
            <div ref={observerTarget} className="text-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto" />
            </div>
          )}

          {/* Results count */}
          <div className="text-center text-sm text-muted-foreground">
            Showing {Math.min(visibleCount, filteredModels.length)} of{" "}
            {filteredModels.length} model
            {filteredModels.length !== 1 ? "s" : ""}
            {searchTerm && ` for "${searchTerm}"`}
          </div>
        </>
      ) : (
        renderEmptyState()
      )}
    </>
  );

  // No car selected state
  if (!bookingData.car) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Select Your Car Model</h2>
          <p className="text-muted-foreground">Choose your car model</p>
        </div>

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

      {/* Always show search input and conditionally render content */}
      {error && filteredModels.length === 0
        ? renderErrorState()
        : isLoading && !isSearching
        ? renderLoadingState()
        : renderSuccessState()}

      {/* Validation error */}
      {hasError("model") && (
        <Alert variant="destructive" className="border-2 animate-in fade-in-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span className="font-medium">{getError("model")}</span>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
