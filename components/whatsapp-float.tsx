'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(false);
  const whatsappNumber = "9900519565"; // Replace with actual number
  const defaultMessage = 'Hi, I need help with my car service booking.';

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-4 max-w-xs border"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-sm text-gray-800">Need Help?</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Message us on WhatsApp for instant support!
                </p>
                <p className="text-xs text-green-600 font-medium mt-2">
                  📞 +91 98765 43210
                </p>
              </div>
              <button
                onClick={() => setShowTooltip(false)}
                className="text-gray-400 hover:text-gray-600 ml-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white border-r border-b transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 group"
      >
        <MessageCircle className="h-6 w-6" />
        
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
        
        {/* Online indicator */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white">
          <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </motion.button>
    </div>
  );
}