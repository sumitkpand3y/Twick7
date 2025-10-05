"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Filter,
  Search,
  Clock,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";
import { useServices } from "@/hooks/useServices";
import { ServiceType } from "@/types";
import { useBookingStore } from "@/store/booking-store";
import { useAuthStore } from "@/store/auth-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define the service interface based on your API response
interface ApiService {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  estimatedTime: number;
  category: string;
  categoryId: string;
  popularity: string;
  laborCost: string;
  partsCost: string;
  skillsRequired: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface ServiceFilters {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

const ITEMS_PER_PAGE = 10;
const DEBOUNCE_DELAY = 500;

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Service Card Skeleton Loader
const ServiceCardSkeleton = () => (
  <Card className="h-full border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
    <Skeleton className="h-48 w-full" />
    <CardHeader>
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/3" />
    </CardHeader>
    <CardContent className="space-y-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-10 w-full mt-4" />
    </CardContent>
  </Card>
);

const ServicesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [uniqueCategories, setUniqueCategories] = useState<
    { value: string; label: string }[]
  >([]);
  const [hasInitialLoad, setHasInitialLoad] = useState<boolean>(false);

  // Debounced search term
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);

  // Build API filters
  const apiFilters = useMemo((): ServiceFilters => {
    const filters: ServiceFilters = {
      page: currentPage,
      limit: ITEMS_PER_PAGE,
    };

    if (selectedCategory !== "all") {
      filters.category = selectedCategory;
    }

    if (debouncedSearchTerm.trim()) {
      filters.search = debouncedSearchTerm.trim();
    }

    return filters;
  }, [selectedCategory, debouncedSearchTerm, currentPage]);

  // Use your custom hook with API filters
  const { services, isLoading, error, refetch, pagination } =
    useServices(apiFilters);

  const { setModalOpen, toggleServiceType } = useBookingStore();
  const { user, setAuthModalOpen } = useAuthStore();

  // Extract unique categories from services (initial load)
  useEffect(() => {
    if (
      services &&
      Array.isArray(services) &&
      services.length > 0 &&
      !hasInitialLoad
    ) {
      try {
        const categoriesMap = new Map();
        services.forEach((service: ApiService) => {
          if (service?.category && !categoriesMap.has(service.category)) {
            categoriesMap.set(service.category, {
              value: service.category.toLowerCase().replace(/\s+/g, "-"),
              label: service.category,
            });
          }
        });

        const categoriesArray = Array.from(categoriesMap.values());
        setUniqueCategories([
          { value: "all", label: "All Services" },
          ...categoriesArray,
        ]);
        setHasInitialLoad(true);
      } catch (err) {
        console.error("Error processing categories:", err);
      }
    }
  }, [services, hasInitialLoad]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, debouncedSearchTerm]);

  // Safe number parsing utility
  const safeParseInt = useCallback(
    (value: string, fallback: number = 0): number => {
      try {
        const parsed = parseInt(value);
        return isNaN(parsed) ? fallback : parsed;
      } catch {
        return fallback;
      }
    },
    []
  );

  // Safe service conversion
  const convertToServiceType = useCallback(
    (service: ApiService): ServiceType => {
      return {
        id: service.id,
        name: service.name || "Unnamed Service",
        description: service.description || "",
        price: safeParseInt(service.price, 0),
        duration: service.duration || "Not specified",
        category: service.category || "General",
        isPopular: service.popularity === "High",
        features: Array.isArray(service.skillsRequired)
          ? service.skillsRequired
          : [],
        estimatedTime: service.duration,
      };
    },
    [safeParseInt]
  );

  const handleBookNow = useCallback(
    (service: ApiService) => {
      if (!service?.id) {
        console.error("Invalid service data");
        toast.error("Invalid service data. Please try again.");
        return;
      }

      if (user) {
        try {
          const serviceType = convertToServiceType(service);
          toggleServiceType(serviceType);
          setModalOpen(true);
        } catch (err) {
          console.error("Error booking service:", err);
          toast.error("Failed to book service. Please try again.");
        }
      } else {
        setAuthModalOpen(true);
      }
    },
    [
      user,
      convertToServiceType,
      toggleServiceType,
      setModalOpen,
      setAuthModalOpen,
    ]
  );

  const handlePreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, pagination.totalPages));
  }, [pagination.totalPages]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedCategory("all");
    setCurrentPage(1);
  }, []);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  // Generate pagination buttons with ellipsis for many pages
  const paginationButtons = useMemo(() => {
    const buttons = [];
    const totalPages = pagination.totalPages;
    const current = currentPage;

    if (totalPages <= 7) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      // Show first page, last page, and pages around current page
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) buttons.push(i);
        buttons.push("...");
        buttons.push(totalPages);
      } else if (current >= totalPages - 3) {
        buttons.push(1);
        buttons.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) buttons.push(i);
      } else {
        buttons.push(1);
        buttons.push("...");
        for (let i = current - 1; i <= current + 1; i++) buttons.push(i);
        buttons.push("...");
        buttons.push(totalPages);
      }
    }

    return buttons;
  }, [currentPage, pagination.totalPages]);

  // Loading state
  if (isLoading && !hasInitialLoad) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-20">
            <div className="flex justify-center items-center min-h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading services...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="pt-16">
        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-6">
                Our <span className="text-blue-600"> Premium Services</span>
              </h1>
              <p className="text-l text-gray-600 max-w-3xl mx-auto mb-12">
                Expert car care with transparent pricing and guaranteed quality.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 items-center justify-between"
            >
              <div className="w-full md:w-auto">
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  Find Your Service
                </h2>
                <p className="text-gray-600 text-sm">
                  Filter by category or search for specific services
                </p>
              </div>

              <div className="flex flex-col md:flex-row w-full md:w-auto space-y-4 md:space-y-0 md:space-x-4">
                {/* Search with loading indicator */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full pl-10 pr-10"
                  />
                  {isLoading && (
                    <RefreshCw className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 animate-spin" />
                  )}
                </div>

                {/* Category Filter */}
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-600" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    disabled={isLoading}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uniqueCategories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Error Alert */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="flex items-center justify-between">
                    <span>{error}</span>
                    <Button variant="outline" size="sm" onClick={handleRetry}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Retry
                    </Button>
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-sm text-gray-600 flex items-center flex-wrap gap-2"
            >
              <span>
                Showing {services.length} of {pagination.total} services
              </span>
              {(selectedCategory !== "all" || debouncedSearchTerm) && (
                <>
                  <span>for</span>
                  {selectedCategory !== "all" && (
                    <Badge variant="secondary">
                      {
                        uniqueCategories.find(
                          (cat) => cat.value === selectedCategory
                        )?.label
                      }
                    </Badge>
                  )}
                  {debouncedSearchTerm && (
                    <Badge variant="secondary">
                      Search: "{debouncedSearchTerm}"
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                    className="h-6 px-2 text-xs"
                  >
                    Clear all
                  </Button>
                </>
              )}
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {error && services.length === 0 ? (
              // Error state
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white rounded-lg shadow-sm"
              >
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Failed to Load Services
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">{error}</p>
                <Button onClick={handleRetry} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </motion.div>
            ) : services.length > 0 ? (
              // Success state
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.map((service: ApiService, index: number) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="group"
                    >
                      <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
                        {/* Service Image */}
                        <div className="relative h-48 w-full bg-gradient-to-br from-blue-100 to-indigo-200">
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-4xl mb-2">🔧</div>
                              <p className="text-sm text-gray-600 font-medium">
                                {service.category}
                              </p>
                            </div>
                          </div>
                          {service.popularity === "High" && (
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-orange-500 text-white">
                                <Star className="w-3 h-3 mr-1" />
                                Popular
                              </Badge>
                            </div>
                          )}
                        </div>

                        <CardHeader>
                          <CardTitle className="text-xl md:text-2xl group-hover:text-primary transition-colors line-clamp-1">
                            {service.name}
                          </CardTitle>
                          <Badge variant="outline" className="w-fit">
                            {service.category}
                          </Badge>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-3">
                            {service.description}
                          </p>

                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {service.duration}
                          </div>

                          {/* Skills Required */}
                          {service.skillsRequired &&
                            service.skillsRequired.length > 0 && (
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-700">
                                  Skills Required:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {service.skillsRequired
                                    .slice(0, 3)
                                    .map((skill, idx) => (
                                      <Badge
                                        key={idx}
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        {skill}
                                      </Badge>
                                    ))}
                                  {service.skillsRequired.length > 3 && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      +{service.skillsRequired.length - 3} more
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            )}

                          {/* Cost Breakdown */}
                          <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                            <div className="flex justify-between text-sm">
                              <span>Labor Cost:</span>
                              <span className="font-medium">
                                ₹
                                {safeParseInt(
                                  service.laborCost
                                ).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Parts Cost:</span>
                              <span className="font-medium">
                                ₹
                                {safeParseInt(
                                  service.partsCost
                                ).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-lg font-bold border-t pt-2">
                              <span>Total Price:</span>
                              <span className="text-primary">
                                ₹{safeParseInt(service.price).toLocaleString()}
                              </span>
                            </div>
                          </div>

                          <Button
                            onClick={() => handleBookNow(service)}
                            disabled={isLoading}
                            className="w-full group-hover:bg-gray-900 group-hover:text-white transition-all duration-300 mt-4"
                            variant="outline"
                            size="lg"
                          >
                            {isLoading ? (
                              <>
                                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                Booking...
                              </>
                            ) : (
                              <>
                                Book Now
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center items-center space-x-2 mt-12"
                  >
                    <Button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1 || isLoading}
                      variant="outline"
                      className="flex items-center"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>

                    <div className="flex items-center space-x-1">
                      {paginationButtons.map((page, index) =>
                        page === "..." ? (
                          <span
                            key={`ellipsis-${index}`}
                            className="px-2 text-gray-500"
                          >
                            ...
                          </span>
                        ) : (
                          <Button
                            key={page}
                            onClick={() => setCurrentPage(page as number)}
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
                            disabled={isLoading}
                            className="w-10 h-10 p-0"
                          >
                            {page}
                          </Button>
                        )
                      )}
                    </div>

                    <Button
                      onClick={handleNextPage}
                      disabled={
                        currentPage === pagination.totalPages || isLoading
                      }
                      variant="outline"
                      className="flex items-center"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                )}
              </>
            ) : (
              // Empty state
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white rounded-lg shadow-sm"
              >
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  No Services Found
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  {isLoading
                    ? "Loading services..."
                    : pagination.total === 0
                    ? "No services available at the moment."
                    : "We couldn't find any services matching your search. Try adjusting your filters."}
                </p>
                {(debouncedSearchTerm || selectedCategory !== "all") && (
                  <Button onClick={handleClearFilters} variant="outline">
                    Clear Filters
                  </Button>
                )}
              </motion.div>
            )}

            {/* Loading skeletons for subsequent loads */}
            {isLoading && services.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {Array.from({ length: 3 }, (_, i) => (
                  <ServiceCardSkeleton key={i} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Service Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                Why Choose Our Services
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                We go the extra mile to ensure your complete satisfaction
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🔧",
                  title: "Professional Tools",
                  description:
                    "Latest diagnostic equipment and professional-grade tools for precise work",
                  bg: "bg-blue-100",
                },
                {
                  icon: "✅",
                  title: "Quality Assurance",
                  description:
                    "Multiple quality checks before vehicle delivery with warranty",
                  bg: "bg-green-100",
                },
                {
                  icon: "🚗",
                  title: "Pickup & Drop",
                  description:
                    "Free pickup and drop service within city limits at your convenience",
                  bg: "bg-orange-100",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div
                    className={`${feature.bg} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
