'use client';

import { useBookingStore } from '@/store/booking-store';
import { CarModel } from '@/types';
import { motion } from 'framer-motion';

export function ModelStep() {
  const { bookingData, setBookingData } = useBookingStore();

  const handleModelSelect = (model: CarModel) => {
    setBookingData({ model });
  };

  if (!bookingData.car) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Please select a car first</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Select Your Car Model</h2>
        <p className="text-muted-foreground">Choose your {bookingData.car.name} model</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookingData.car.models.map((model) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: parseInt(model.id) * 0.1 }}
          >
            <div
              className={`border rounded-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                bookingData.model?.id === model.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleModelSelect(model)}
            >
              <img
                src={model.image}
                alt={model.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="font-semibold text-center text-lg">{model.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}