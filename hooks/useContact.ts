import { useState } from 'react';
import { contactService } from '@/services/contact.service';
import toast from 'react-hot-toast';

interface FieldErrors {
  [key: string]: string;
}

export function useContact() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const submitContact = async (data: {
    name: string;
    email: string;
    mobile: string;
    subject: string;
    message: string;
  }) => {
    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      const response = await contactService.submitContact(data);

      if (response.success) {
        toast.success('Message sent successfully! We will contact you soon.');
        return true;
      }

      throw new Error(response.error?.message || 'Failed to send message');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to send message';
      setError(errorMessage);
      toast.error(errorMessage);

      if (err.code === 'VALIDATION_ERROR' && err.fields) {
        setFieldErrors(err.fields);
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const submitQuickEnquiry = async (data: {
    name: string;
    mobile: string;
    email?: string;
    serviceType?: string;
    vehicleBrand?: string;
    message?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      const response = await contactService.submitQuickEnquiry(data);

      if (response.success) {
        toast.success('Enquiry submitted successfully! We will contact you soon.');
        return true;
      }

      throw new Error(response.error?.message || 'Failed to submit enquiry');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to submit enquiry';
      setError(errorMessage);
      toast.error(errorMessage);

      if (err.code === 'VALIDATION_ERROR' && err.fields) {
        setFieldErrors(err.fields);
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearErrors = () => {
    setError(null);
    setFieldErrors({});
  };

  return {
    isLoading,
    error,
    fieldErrors,
    submitContact,
    submitQuickEnquiry,
    clearErrors,
  };
}
