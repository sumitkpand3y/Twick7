'use client';

import { carBrands } from '@/lib/data';
import { motion } from 'framer-motion';

export function BrandsWeService() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
          >
            🚗 Brands We Service
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            We service all major car brands with genuine parts and expert technicians
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {carBrands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <div className="bg-gray-50 rounded-xl p-6 text-center hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-16 h-16 mx-auto mb-3 rounded-lg object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="font-semibold text-sm text-gray-800 group-hover:text-primary transition-colors">
                  {brand.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Don't see your brand? <span className="text-primary font-semibold cursor-pointer hover:underline">Contact us</span> - we service 50+ brands!
          </p>
        </div>
      </div>
    </section>
  );
}