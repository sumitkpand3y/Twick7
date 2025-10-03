'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { useAuth } from '@/hooks/useAuth';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FormError } from '@/components/ui/form-error';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function AuthModal() {
  const { isAuthModalOpen, setAuthModalOpen } = useAuthStore();
  const {
    isLoading,
    error,
    sendMobileOTP,
    verifyMobileOTP,
    sendEmailOTP,
    verifyEmailOTP,
  } = useAuth();
  const [activeTab, setActiveTab] = useState('email');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    otp: '',
  });
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const handleSendOTP = async () => {
    setFieldErrors({});

    if (activeTab === 'email') {
      if (!formData.email) {
        setFieldErrors({ email: 'Please enter your email' });
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setFieldErrors({ email: 'Please enter a valid email' });
        return;
      }
      const success = await sendEmailOTP(formData.email);
      if (success) setStep(2);
    } else {
      if (!formData.mobile) {
        setFieldErrors({ mobile: 'Please enter your mobile number' });
        return;
      }
      if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
        setFieldErrors({ mobile: 'Please enter a valid 10-digit mobile number' });
        return;
      }
      const success = await sendMobileOTP(formData.mobile);
      if (success) setStep(2);
    }
  };

  const handleVerifyOTP = async () => {
    setFieldErrors({});

    if (!formData.otp || formData.otp.length < 4) {
      setFieldErrors({ otp: 'Please enter a valid OTP' });
      return;
    }

    let success = false;
    if (activeTab === 'email') {
      success = await verifyEmailOTP(formData.email, formData.otp);
    } else {
      success = await verifyMobileOTP(formData.mobile, formData.otp);
    }

    if (success) {
      setAuthModalOpen(false);
      setStep(1);
      setFormData({ email: '', mobile: '', otp: '' });
    }
  };

  const handleClose = () => {
    setAuthModalOpen(false);
    setStep(1);
    setFormData({ email: '', mobile: '', otp: '' });
    setFieldErrors({});
  };

  return (
    <Modal
      isOpen={isAuthModalOpen}
      onClose={handleClose}
      title="Login to Your Account"
    >
      <div className="p-6">
        {step === 1 ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
              <p className="text-muted-foreground">
                Enter your details to continue
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="mobile" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Mobile
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      setFieldErrors({});
                    }}
                    className="mt-1"
                  />
                  {fieldErrors.email && (
                    <FormError message={fieldErrors.email} className="mt-1" />
                  )}
                </div>
              </TabsContent>

              <TabsContent value="mobile" className="space-y-4">
                <div>
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={(e) => {
                      setFormData({ ...formData, mobile: e.target.value });
                      setFieldErrors({});
                    }}
                    className="mt-1"
                  />
                  {fieldErrors.mobile && (
                    <FormError message={fieldErrors.mobile} className="mt-1" />
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <Button
              onClick={handleSendOTP}
              disabled={isLoading || (!formData.email && !formData.mobile)}
              className="w-full"
            >
              {isLoading ? 'Sending...' : 'Send OTP'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>
              <p className="text-muted-foreground">
                Enter the OTP sent to {activeTab === 'email' ? formData.email : formData.mobile}
              </p>
            </div>

            <div>
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 4-digit OTP"
                value={formData.otp}
                onChange={(e) => {
                  setFormData({ ...formData, otp: e.target.value });
                  setFieldErrors({});
                }}
                className="mt-1 text-center text-xl tracking-widest"
                maxLength={6}
              />
              {fieldErrors.otp && (
                <FormError message={fieldErrors.otp} className="mt-1" />
              )}
              {error && !fieldErrors.otp && (
                <FormError message={error} className="mt-2" />
              )}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleVerifyOTP}
                disabled={isLoading || formData.otp.length !== 4}
                className="flex-1"
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </Modal>
  );
}