// components/MechanicAssignmentModal.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, HardHat, X } from "lucide-react";
import { mechanics } from "@/lib/Admin/data";

export const MechanicAssignmentModal = ({
  booking,
  isOpen,
  onClose,
  onAssign,
}: {
  booking: any;
  isOpen: boolean;
  onClose: () => void;
  onAssign: (mechanicId: string) => void;
}) => {
  const [selectedMechanic, setSelectedMechanic] = useState("");

  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg max-w-md w-full p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Assign Mechanic</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Select Mechanic</label>
            <select
              value={selectedMechanic}
              onChange={(e) => setSelectedMechanic(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select a mechanic</option>
              {mechanics
                .filter((m) => m.available)
                .map((mechanic) => (
                  <option key={mechanic.id} value={mechanic.id}>
                    {mechanic.name} ({mechanic.specialization})
                  </option>
                ))}
            </select>
          </div>

          <button
            onClick={() => {
              if (selectedMechanic) {
                onAssign(selectedMechanic);
                onClose();
              }
            }}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center"
            disabled={!selectedMechanic}
          >
            <HardHat className="w-4 h-4 mr-2" />
            Assign Mechanic
          </button>
        </div>
      </motion.div>
    </div>
  );
};