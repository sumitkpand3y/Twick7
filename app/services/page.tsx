"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Filter,
  Search,
  Clock,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useServices } from "@/hooks/useServices";
import { ServiceType } from "@/types";
import { useBookingStore } from "@/store/booking-store";
import { useAuthStore } from "@/store/auth-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

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

const ITEMS_PER_PAGE = 9;

const ServicesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [uniqueCategories, setUniqueCategories] = useState<
    { value: string; label: string }[]
  >([]);

  // Use your custom hook
  const { services, isLoading, error, refetch } = useServices();

  const { setModalOpen, toggleServiceType } = useBookingStore();
  const { user, setAuthModalOpen } = useAuthStore();

  // Extract unique categories from services
  useEffect(() => {
    if (services && services.length > 0) {
      const categoriesMap = new Map();
      services.forEach((service: ApiService) => {
        if (service.category && !categoriesMap.has(service.category)) {
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
    }
  }, [services]);

  // Memoized filtered services for better performance
  const filteredServices = useMemo(() => {
    if (!services || services.length === 0) return [];

    return services.filter((service: ApiService) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "all" ||
        service.category?.toLowerCase().replace(/\s+/g, "-") ===
          selectedCategory;

      // Search filter - search in name, description, and skills
      const matchesSearch =
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.skillsRequired?.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
  }, [services, selectedCategory, searchTerm]);

  // Pagination logic
  const paginatedServices = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredServices.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredServices, currentPage]);

  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  const handleBookNow = (service: ApiService) => {
    if (user) {
      // Convert ApiService to ServiceType if needed
      const serviceType: ServiceType = {
        id: service.id,
        name: service.name,
        description: service.description,
        price: parseInt(service.price),
        duration: service.duration,
        category: service.category,
        isPopular: service.popularity === "High",
        features: service.skillsRequired,
        estimatedTime: service.duration,
        // Add any other required properties for ServiceType
      };
      toggleServiceType(serviceType);
      setModalOpen(true);
    } else {
      setAuthModalOpen(true);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Loading state
  if (isLoading) {
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

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-20">
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <div className="text-5xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Failed to Load Services
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">{error}</p>
              <Button onClick={refetch} variant="outline">
                Try Again
              </Button>
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
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Our <span className="text-blue-600"> Premium Services</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                Expert car care with transparent pricing and guaranteed quality.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-12 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 items-center justify-between"
            >
              <div className="w-full md:w-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Find Your Service
                </h2>
                <p className="text-gray-600">
                  Filter by category or search for specific services
                </p>
              </div>

              <div className="flex flex-col md:flex-row w-full md:w-auto space-y-4 md:space-y-0 md:space-x-4">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-600" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-sm text-gray-600"
            >
              Showing {paginatedServices.length} of {filteredServices.length}{" "}
              services
              {(selectedCategory !== "all" || searchTerm) && (
                <span>
                  {" "}
                  for{" "}
                  {selectedCategory !== "all" && (
                    <Badge variant="secondary" className="ml-1">
                      {
                        uniqueCategories.find(
                          (cat) => cat.value === selectedCategory
                        )?.label
                      }
                    </Badge>
                  )}
                  {searchTerm && (
                    <Badge variant="secondary" className="ml-1">
                      Search: "{searchTerm}"
                    </Badge>
                  )}
                </span>
              )}
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {paginatedServices.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedServices.map(
                    (service: ApiService, index: number) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="group"
                      >
                        <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
                          {/* Service Image - you can add images to your service data */}
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
                            <CardTitle className="text-xl md:text-2xl group-hover:text-primary transition-colors">
                              {service.name}
                            </CardTitle>
                            <Badge variant="outline" className="w-fit">
                              {service.category}
                            </Badge>
                          </CardHeader>

                          <CardContent className="space-y-4">
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
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
                                    {service.skillsRequired.map(
                                      (skill, idx) => (
                                        <Badge
                                          key={idx}
                                          variant="secondary"
                                          className="text-xs"
                                        >
                                          {skill}
                                        </Badge>
                                      )
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
                                  {parseInt(service.laborCost).toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Parts Cost:</span>
                                <span className="font-medium">
                                  ₹
                                  {parseInt(service.partsCost).toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between text-lg font-bold border-t pt-2">
                                <span>Total Price:</span>
                                <span className="text-primary">
                                  ₹{parseInt(service.price).toLocaleString()}
                                </span>
                              </div>
                            </div>

                            <Button
                              onClick={() => handleBookNow(service)}
                              className="w-full group-hover:bg-gray-900 group-hover:text-white transition-all duration-300 mt-4"
                              variant="outline"
                              size="lg"
                            >
                              Book Now
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center items-center space-x-4 mt-12"
                  >
                    <Button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      variant="outline"
                      className="flex items-center"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>

                    <div className="flex items-center space-x-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <Button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
                            className="w-10 h-10 p-0"
                          >
                            {page}
                          </Button>
                        )
                      )}
                    </div>

                    <Button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
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
                  {services.length === 0
                    ? "No services available at the moment."
                    : "We couldn't find any services matching your search. Try adjusting your filters."}
                </p>
                {(searchTerm || selectedCategory !== "all") && (
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    }}
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                )}
              </motion.div>
            )}
          </div>
        </section>

        {/* Service Features Section remains the same */}
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
