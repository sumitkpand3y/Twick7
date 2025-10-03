'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useContact } from '@/hooks/useContact';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormError } from '@/components/ui/form-error';
import { Phone, MessageCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid mobile number'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  vehicleBrand: z.string().min(1, 'Please enter your car model'),
  message: z.string().min(10, 'Please describe your issue (minimum 10 characters)'),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

interface QuickEnquiryProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickEnquiry({ isOpen, onClose }: QuickEnquiryProps) {
  const { submitQuickEnquiry, isLoading } = useContact();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
  });

  const onSubmit = async (data: EnquiryFormData) => {
    const success = await submitQuickEnquiry(data);

    if (success) {
      reset();
      onClose();
    }
  };

  const handleWhatsAppEnquiry = () => {
    const message = "Hi! I need help with my car service. Please contact me.";
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Quick Enquiry"
      className="max-w-md"
      // stickyHeader
    >
      <div className="p-4 sm:p-6">
        {/* <div className="text-center mb-6">
          <Phone className="w-6 h-6 text-primary mx-auto mb-3" />
          <p className="text-gray-600 text-sm">
            Get instant help for your car service needs
          </p>
        </div> */}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Enter your full name"
              className="mt-1"
            />
            <FormError message={errors.name?.message} />
          </div>

          <div>
            <Label htmlFor="mobile">Mobile Number *</Label>
            <Input
              id="mobile"
              {...register('mobile')}
              placeholder="Enter your mobile number"
              className="mt-1"
            />
            <FormError message={errors.mobile?.message} />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="Enter your email (optional)"
              className="mt-1"
            />
            <FormError message={errors.email?.message} />
          </div>

          <div>
            <Label htmlFor="vehicleBrand">Car Model *</Label>
            <Input
              id="vehicleBrand"
              {...register('vehicleBrand')}
              placeholder="e.g., Maruti Swift, Hyundai Creta"
              className="mt-1"
            />
            <FormError message={errors.vehicleBrand?.message} />
          </div>

          <div>
            <Label htmlFor="message">Describe Your Issue *</Label>
            <Textarea
              id="message"
              {...register('message')}
              placeholder="Describe your car issue or service requirement..."
              rows={3}
              className="mt-1"
            />
            <FormError message={errors.message?.message} />
          </div>

          <div className="space-y-3 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              {isLoading ? 'Submitting...' : 'Submit Enquiry'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleWhatsAppEnquiry}
              className="w-full border-green-500 text-green-600 hover:bg-green-50"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp Us Directly
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}