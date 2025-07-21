'use client';

import { useBookingStore } from '@/store/booking-store';
import { serviceTypes } from '@/lib/data';
import { ServiceType } from '@/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Check } from 'lucide-react';

export function ServiceStep() {
  const { bookingData, toggleServiceType } = useBookingStore();

  const isServiceSelected = (service: ServiceType) => {
    return Array.isArray(bookingData.serviceType)
      ? bookingData.serviceType.some(s => s.id === service.id)
      : false;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Select Service Type</h2>
        <p className="text-muted-foreground">Choose one or more services you need</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {serviceTypes.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: parseInt(service.id) * 0.1 }}
          >
            <div
              className={`border rounded-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-lg relative ${
                isServiceSelected(service)
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => toggleServiceType(service)}
            >
              {isServiceSelected(service) && (
                <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full">
                  <Check className="h-4 w-4" />
                </div>
              )}
              <Image
                src={service.image}
                alt={service.title}
                className="w-full h-32 object-cover rounded-md mb-4"
                width={240}
                height={120}
              />
              <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-primary">₹{service.price}</span>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  Recommended
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}