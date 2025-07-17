"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, ArrowRight, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppStore } from '@/lib/store';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [step, setStep] = useState<'login' | 'otp' | 'success'>('login');
  const [loginType, setLoginType] = useState<'email' | 'mobile'>('mobile');
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    otp: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAppStore();

  const handleSendOTP = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep('otp');
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock user data
    const userData = {
      id: '1',
      name: 'John Doe',
      email: loginType === 'email' ? formData.email : undefined,
      mobile: loginType === 'mobile' ? formData.mobile : undefined,
      isAuthenticated: true
    };
    
    setUser(userData);
    setIsLoading(false);
    setStep('success');
    
    setTimeout(() => {
      onClose();
      setStep('login');
      setFormData({ email: '', mobile: '', otp: '' });
    }, 2000);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md z-50">
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-gray-900">
              {step === 'login' && 'Welcome Back'}
              {step === 'otp' && 'Verify OTP'}
              {step === 'success' && 'Login Successful'}
            </DialogTitle>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {step === 'login' && (
              <motion.div
                key="login"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6 py-6"
              >
                <Tabs value={loginType} onValueChange={(value) => setLoginType(value as 'email' | 'mobile')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="mobile" className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>Mobile</span>
                    </TabsTrigger>
                    <TabsTrigger value="email" className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="mobile" className="space-y-4">
                    <div>
                      <Label htmlFor="mobile">Mobile Number</Label>
                      <Input
                        id="mobile"
                        type="tel"
                        placeholder="Enter your mobile number"
                        value={formData.mobile}
                        onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="email" className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <Button 
                  onClick={handleSendOTP}
                  disabled={isLoading || (!formData.email && !formData.mobile)}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      Send OTP
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </motion.div>
            )}

            {step === 'otp' && (
              <motion.div
                key="otp"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6 py-6"
              >
                <div className="text-center">
                  <p className="text-gray-600">
                    We`&apos;`ve sent a 6-digit OTP to
                  </p>
                  <p className="font-semibold text-blue-600">
                    {loginType === 'email' ? formData.email : formData.mobile}
                  </p>
                </div>

                <div>
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={formData.otp}
                    onChange={(e) => setFormData(prev => ({ ...prev, otp: e.target.value }))}
                    className="mt-1 text-center text-lg tracking-widest"
                    maxLength={6}
                  />
                </div>

                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep('login')}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleVerifyOTP}
                    disabled={isLoading || formData.otp.length !== 6}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      'Verify OTP'
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <button className="text-blue-600 hover:underline text-sm">
                    Resend OTP
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                key="success"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Welcome to Tweak7!
                </h3>
                <p className="text-gray-600">
                  You have been successfully logged in.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}