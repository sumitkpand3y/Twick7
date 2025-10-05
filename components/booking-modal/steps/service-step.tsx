"use client";

import { useState, useEffect } from "react";
import { useBookingStore } from "@/store/booking-store";
import { useServices } from "@/hooks/useServices";
import { ServiceType } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { Check, Clock, Loader2 } from "lucide-react";

// Define the API service interface
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
}

export function ServiceStep() {
  const { bookingData, toggleServiceType } = useBookingStore();
  const { services, isLoading, error, refetch } = useServices();
  const [mappedServices, setMappedServices] = useState<ServiceType[]>([]);

  // Map API services to ServiceType when services are loaded
  useEffect(() => {
    if (services && services.length > 0) {
      const mapped = services.map((service: any) => ({
        id: service.id,
        title: service.name,
        name: service.name,
        description: service.description,
        price: parseInt(service.price),
        duration: service.duration,
        estimatedTime: service.estimatedTime,
        category: service.category,
        isPopular: service.popularity === "High",
        features: service.skillsRequired,
        // You can add a default image or use category-based images
        image: getServiceImage(service.category),
        originalPrice: parseInt(service.price) + 500, // Example: add some markup for original price
        laborCost: parseInt(service.laborCost),
        partsCost: parseInt(service.partsCost),
      }));
      setMappedServices(mapped);
    }
  }, [services]);

  // Helper function to get service image based on category
  const getServiceImage = (category: string): string => {
    const imageMap: { [key: string]: string } = {
      "AC Service": "/images/services/ac-service.jpg",
      "Basic Service": "/images/services/basic-service.jpg",
      "Advanced Service": "/images/services/advanced-service.jpg",
      "Inspection Service": "/images/services/inspection-service.jpg",
      "Engine Service": "/images/services/engine-service.jpg",
      "Brake Service": "/images/services/brake-service.jpg",
    };

    return imageMap[category] || "/images/services/default-service.jpg";
  };

  const isServiceSelected = (service: ServiceType) => {
    return Array.isArray(bookingData.serviceType)
      ? bookingData.serviceType.some((s) => s.id === service.id)
      : false;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Select Service Type</h2>
          <p className="text-muted-foreground">
            Choose one or more services you need
          </p>
        </div>

        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading services...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Select Service Type</h2>
          <p className="text-muted-foreground">
            Choose one or more services you need
          </p>
        </div>

        <div className="text-center py-8 bg-destructive/10 rounded-lg">
          <div className="text-destructive mb-2">Failed to load services</div>
          <p className="text-muted-foreground text-sm mb-4">{error}</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!isLoading && mappedServices.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Select Service Type</h2>
          <p className="text-muted-foreground">
            Choose one or more services you need
          </p>
        </div>

        <div className="text-center py-8 bg-muted/50 rounded-lg">
          <div className="text-muted-foreground mb-2">
            No services available
          </div>
          <p className="text-muted-foreground text-sm">
            Please check back later or contact support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Select Service Type</h2>
        <p className="text-muted-foreground">
          Choose one or more services you need
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mappedServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg relative h-full flex flex-col ${
                isServiceSelected(service)
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => toggleServiceType(service)}
            >
              {isServiceSelected(service) && (
                <div className="absolute top-3 right-3 bg-primary text-white p-1 rounded-full z-10">
                  <Check className="h-3 w-3" />
                </div>
              )}

              {/* Service Image */}
              <div className="relative w-full h-32 mb-3 rounded-md overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {service.isPopular && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                )}
              </div>

              {/* Service Content */}
              <div className="flex-1 flex flex-col">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
                  {service.description}
                </p>

                {/* Service Duration */}
                <div className="flex items-center text-xs text-muted-foreground mb-3">
                  <Clock className="h-3 w-3 mr-1" />
                  {service.duration}
                </div>

                {/* Skills/Features */}
                {service.features && service.features.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {service.features.slice(0, 2).map((feature, idx) => (
                        <span
                          key={idx}
                          className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                      {service.features.length > 2 && (
                        <span className="text-xs text-muted-foreground">
                          +{service.features.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Price and Action */}
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-primary">
                      ₹{service.price.toLocaleString()}
                    </span>
                    {service.originalPrice &&
                      service.originalPrice > service.price && (
                        <span className="text-xs text-muted-foreground line-through">
                          ₹{service.originalPrice.toLocaleString()}
                        </span>
                      )}
                  </div>

                  <div className="text-right">
                    {service.isPopular && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded block mb-1">
                        Recommended
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {service.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Services Summary */}
      {Array.isArray(bookingData.serviceType) &&
        bookingData.serviceType.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-6"
          >
            <h3 className="font-semibold text-lg mb-2">Selected Services</h3>
            <div className="space-y-2">
              {bookingData.serviceType.map((service) => (
                <div
                  key={service.id}
                  className="flex justify-between items-center text-sm"
                >
                  <span>{service.title}</span>
                  <span className="font-semibold">
                    ₹{service.price.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2 flex justify-between items-center font-semibold">
                <span>Total</span>
                <span>
                  ₹
                  {bookingData.serviceType
                    .reduce((total, service) => total + service.price, 0)
                    .toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        )}
    </div>
  );
}
