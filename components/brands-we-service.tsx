'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBooking } from '@/hooks/useBooking';
import { Loader2, AlertCircle } from 'lucide-react';

interface Brand {
  name: string;
  logo: string;
}

export function BrandsWeService() {
  const { getVehicleCompatibility } = useBooking();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const vehicles = await getVehicleCompatibility({});

        if (!vehicles || vehicles.length === 0) {
          setError('No brands available');
          setBrands([]);
          return;
        }

        const uniqueBrands = Array.from(
          new Map(vehicles.map((vehicle) => [vehicle.brand, vehicle])).values()
        )
          .slice(0, 12)
          .map((vehicle) => ({
            name: vehicle.brand,
            logo: `/cars/${vehicle.brand.toLowerCase().replace(/\s+/g, '-')}.png`,
          }));

        setBrands(uniqueBrands);
      } catch (err) {
        console.error('Error fetching brands:', err);
        setError('Failed to load brands');
        setBrands([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Brands We Service
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Loading brands...
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Brands We Service
            </h2>
          </div>
          <div className="max-w-md mx-auto text-center p-8 bg-gray-50 rounded-lg">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
          >
            Brands We Service
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
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <div className="bg-gray-50 rounded-xl p-6 text-center hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-16 h-16 mx-auto mb-3 rounded-lg object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/cars/default-car.png';
                  }}
                />
                <h3 className="font-semibold text-sm text-gray-800 group-hover:text-primary transition-colors truncate">
                  {brand.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Don't see your brand?{' '}
            <a href="/contact" className="text-primary font-semibold hover:underline">
              Contact us
            </a>{' '}
            - we service 50+ brands!
          </p>
        </div>
      </div>
    </section>
  );
}
