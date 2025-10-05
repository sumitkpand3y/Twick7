'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ServiceType } from '@/types';
import { useBookingStore } from '@/store/booking-store';
import { useAuthStore } from '@/store/auth-store';
import { useServices } from '@/hooks/useServices';
import { Clock, Star, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function PopularServices() {
  const { setModalOpen, toggleServiceType } = useBookingStore();
  const { user, setAuthModalOpen } = useAuthStore();
  const { services, isLoading, error } = useServices();
  const [popularServices, setPopularServices] = useState<ServiceType[]>([]);

  useEffect(() => {
    if (services && services.length > 0) {
      const popular = services
        .filter((service: any) => service.popularity === 'High')
        .slice(0, 6)
        .map((service: any) => ({
          id: service.id,
          title: service.name,
          name: service.name,
          description: service.description,
          price: parseInt(service.price),
          duration: service.duration,
          estimatedTime: service.duration,
          category: service.category,
          isPopular: true,
          features: service.skillsRequired || [],
          icon: '🔧',
          popular: true,
          originalPrice: parseInt(service.price) + 500,
        }));

      setPopularServices(popular);
    }
  }, [services]);

  const handleBookNow = (service: ServiceType) => {
    toggleServiceType(service);
    setModalOpen(true);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Popular Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Loading our most popular services...
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Popular Services
            </h2>
          </div>
          <div className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-sm">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">{error}</p>
            <Link href="/services">
              <Button variant="outline">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (popularServices.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Popular Services
            </h2>
          </div>
          <div className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-sm">
            <p className="text-gray-600 mb-4">No popular services available at the moment</p>
            <Link href="/services">
              <Button variant="outline">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
          >
            Popular Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Quick book our most popular car services with transparent pricing
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="relative">
                  <div className="flex items-start justify-between">
                    <div className="text-4xl mb-2">{service.icon}</div>
                    {service.popular && (
                      <Badge className="bg-orange-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {service.description}
                  </p>

                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {service.estimatedTime}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-primary">
                        ₹{service.price.toLocaleString()}
                      </span>
                      {service.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{service.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    {service.originalPrice && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Save ₹{(service.originalPrice - service.price).toLocaleString()}
                      </Badge>
                    )}
                  </div>

                  <Button
                    onClick={() => handleBookNow(service)}
                    className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300"
                    variant="outline"
                  >
                    Book Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href={'/services'}
            className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
