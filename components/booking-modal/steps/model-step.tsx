// 'use client';

// import { useState, useEffect } from 'react';
// import { useBookingStore } from '@/store/booking-store';
// import { CarModel } from '@/types';
// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import { Input } from '@/components/ui/input';
// import { Search } from 'lucide-react';

// export function ModelStep() {
//   const { bookingData, setBookingData } = useBookingStore();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredModels, setFilteredModels] = useState<CarModel[]>([]);

//   useEffect(() => {
//     if (bookingData.car) {
//       setFilteredModels(
//         bookingData.car.models.filter((model) =>
//           model.name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     }
//   }, [searchTerm, bookingData.car]);

//   const handleModelSelect = (model: CarModel) => {
//     setBookingData({ model });
//   };

//   if (!bookingData.car) {
//     return (
//       <div className="text-center py-20">
//         <p className="text-muted-foreground">Please select a car first</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="text-center">
//         <h2 className="text-2xl font-bold mb-2">Select Your Car Model</h2>
//         <p className="text-muted-foreground">Choose your {bookingData.car.name} model</p>
//       </div>

//       <div className="relative">
//         <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//         <Input
//           placeholder={`Search ${bookingData.car.name} models...`}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="pl-10"
//         />
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
//         {filteredModels.map((model) => (
//           <motion.div
//             key={model.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: parseInt(model.id) * 0.1 }}
//           >
//             <div
//               className={`border rounded-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
//                 bookingData.model?.id === model.id
//                   ? 'border-primary bg-primary/5'
//                   : 'border-border hover:border-primary/50'
//               }`}
//               onClick={() => handleModelSelect(model)}
//             >
//               <Image
//                 src={model.image}
//                 alt={model.name}
//                 className="w-full h-16 object-cover rounded-md mb-4"
//                 width={240}
//                 height={120}
//               />
//               <h3 className="font-semibold text-center text-lg">{model.name}</h3>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useBookingStore } from "@/store/booking-store";
import { CarModel } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function ModelStep() {
  const { bookingData, setBookingData } = useBookingStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredModels, setFilteredModels] = useState<CarModel[]>([]);

  useEffect(() => {
    if (bookingData.car) {
      const filtered = bookingData.car.models.filter((model) =>
        model.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Remove duplicates by model name
      const uniqueModels = filtered.filter(
        (model, index, self) =>
          index === self.findIndex((m) => m.name === model.name)
      );

      setFilteredModels(uniqueModels);
    }
  }, [searchTerm, bookingData.car]);

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
        <p className="text-muted-foreground">
          Choose your {bookingData.car.name} model
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={`Search ${bookingData.car.name} models...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {filteredModels.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            No models found for {bookingData.car.name}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredModels.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={`border rounded-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  bookingData.model?.id === model.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => handleModelSelect(model)}
              >
                {/* <Image
                  src={model.image}
                  alt={model.name}
                  className="w-full h-16 object-cover rounded-md mb-4"
                  width={240}
                  height={120}
                  
                /> */}
                <h3 className="font-semibold text-center text-lg">
                  {model.name}
                </h3>
                {model.year && (
                  <p className="text-sm text-muted-foreground text-center mt-1">
                    Year: {model.year}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
