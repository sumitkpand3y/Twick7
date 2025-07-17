'use client';

import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  onDownloadInvoice?: () => void;
  onWhatsAppUpdate?: () => void;
}

export function ConfirmationModal({ 
  isOpen, 
  onClose, 
  bookingId,
  onDownloadInvoice,
  onWhatsAppUpdate
}: ConfirmationModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      className="max-w-md"
      showHeader={false}
    >
      <div className="p-6 sm:p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-4" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600 mb-6">
            Your service has been booked successfully
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-semibold">
              Booking ID: #{bookingId}
            </p>
            <p className="text-green-600 text-sm mt-1">
              You will receive a confirmation SMS and WhatsApp message shortly
            </p>
          </div>
          
          <div className="space-y-3">
            <Button
              onClick={onWhatsAppUpdate}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Get WhatsApp Updates
            </Button>
            
            <Button
              onClick={onDownloadInvoice}
              variant="outline"
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Booking Details
            </Button>
            
            <Button
              onClick={onClose}
              variant="ghost"
              className="w-full"
            >
              Close
            </Button>
          </div>
        </motion.div>
      </div>
    </Modal>
  );
}