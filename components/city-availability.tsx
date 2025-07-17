'use client';

import { cities } from '@/lib/data';
import { MapPin, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function CityAvailability() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
          >
            📍 Service Available In
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-8"
          >
            We provide doorstep car service in these cities
          </motion.p>
          
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search your city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {filteredCities.map((city, index) => (
            <motion.div
              key={city}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
            >
              <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-primary hover:text-white transition-all duration-300 border border-gray-100">
                <MapPin className="w-5 h-5 mx-auto mb-2 group-hover:text-white" />
                <span className="text-sm font-medium">{city}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCities.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No cities found matching "{searchTerm}"</p>
          </div>
        )}

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Don't see your city? <span className="text-primary font-semibold cursor-pointer hover:underline">Request Service</span> in your area!
          </p>
        </div>
      </div>
    </section>
  );
}