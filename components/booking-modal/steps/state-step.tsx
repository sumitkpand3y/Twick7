"use client";

import { useState, useEffect } from "react";
import { useBookingStore } from "@/store/booking-store";
import { states } from "@/lib/data";
import { State } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function StateStep() {
  const { bookingData, setBookingData } = useBookingStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStates, setFilteredStates] = useState(states);

  useEffect(() => {
    setFilteredStates(
      states.filter((state) =>
        state.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const handleStateSelect = (state: State) => {
    setBookingData({ state });
  };

  const handleUseCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Mock location detection - in real app, use reverse geocoding
          const mockState = states[0]; // Mumbai as default
          setBookingData({ state: mockState });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">Select Your State</h2>
        <p className="text-sm text-muted-foreground">
          Choose your state to continue
        </p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search states..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={handleUseCurrentLocation}
          className="flex items-center gap-2"
        >
          <MapPin className="h-4 w-4" />
          Use Current Location
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {filteredStates.map((state) => (
          <motion.div
            key={state.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: parseInt(state.id) * 0.1 }}
          >
            <div
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                bookingData.state?.id === state.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => handleStateSelect(state)}
            >
              <Image
                src={state.image}
                alt={state.name}
                className="w-full h-16 object-cover rounded-md mb-3"
                width={240}
                height={120}
              />
              <h3 className="font-semibold text-center">{state.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
