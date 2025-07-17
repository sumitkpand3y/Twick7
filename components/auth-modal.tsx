'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function AuthModal() {
  const { isAuthModalOpen, setAuthModalOpen, login } = useAuthStore();
  const [activeTab, setActiveTab] = useState('email');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    otp: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStep(2);
    setIsLoading(false);
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    const identifier = activeTab === 'email' ? formData.email : formData.mobile;
    const success = await login(identifier, formData.otp);
    setIsLoading(false);
    
    if (success) {
      setStep(1);
      setFormData({ email: '', mobile: '', otp: '' });
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleClose = () => {
    setAuthModalOpen(false);
    setStep(1);
    setFormData({ email: '', mobile: '', otp: '' });
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
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="mt-1"
                  />
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
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    className="mt-1"
                  />
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
                onChange={(e) =>
                  setFormData({ ...formData, otp: e.target.value })
                }
                className="mt-1 text-center text-xl tracking-widest"
                maxLength={4}
              />
              <p className="text-sm text-muted-foreground mt-2">
                Demo OTP: 1234
              </p>
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