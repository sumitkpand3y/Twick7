'use client';

import { useState, useEffect } from 'react';
import { useBookingStore } from '@/store/booking-store';
import { useBooking } from '@/hooks/useBooking';
import { cars } from '@/lib/data';
import { Car } from '@/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function CarStep() {
  const { bookingData, setBookingData } = useBookingStore();
  const { getVehicleCompatibility } = useBooking();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCars, setFilteredCars] = useState(cars);
  const [apiCars, setApiCars] = useState<any[]>([]);

  useEffect(() => {
    setFilteredCars(
      cars.filter((car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const handleCarSelect = (car: Car) => {
    setBookingData({ car, model: null }); // Reset model when car changes
  };

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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {filteredCars.map((car) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: parseInt(car.id) * 0.1 }}
          >
            <div
              className={`border rounded-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                bookingData.car?.id === car.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
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
              <h3 className="font-semibold text-center text-sm">{car.name}</h3>
              <p className="text-sm text-muted-foreground text-center mt-1">
                {car.models.length} models available
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}