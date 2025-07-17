'use client';

import { useBookingStore } from '@/store/booking-store';
import { fuelTypes } from '@/lib/data';
import { FuelType } from '@/types';
import { motion } from 'framer-motion';

export function FuelStep() {
  const { bookingData, setBookingData } = useBookingStore();

  const handleFuelSelect = (fuelType: FuelType) => {
    setBookingData({ fuelType });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Select Fuel Type</h2>
        <p className="text-muted-foreground">Choose your vehicle's fuel type</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {fuelTypes.map((fuel) => (
          <motion.div
            key={fuel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: parseInt(fuel.id) * 0.1 }}
          >
            <div
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                bookingData.fuelType?.id === fuel.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleFuelSelect(fuel)}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {fuel.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold">{fuel.name}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}