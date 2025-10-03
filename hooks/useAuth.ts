import { useState } from 'react';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth-store';
import toast from 'react-hot-toast';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser, user } = useAuthStore();

  const sendMobileOTP = async (mobile: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.sendMobileOTP(mobile);
      if (response.success) {
        toast.success('OTP sent successfully to your mobile');
        return true;
      }
      return false;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to send OTP';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyMobileOTP = async (mobile: string, otp: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.verifyMobileOTP(mobile, otp);
      if (response.success && response.data) {
        authService.setAuthToken(response.data.token);
        setUser({
          id: response.data.user.id,
          name: response.data.user.name,
          mobile: response.data.user.mobile || mobile,
          email: response.data.user.email || '',
          isAuthenticated: true,
        });
        toast.success('Login successful!');
        return true;
      }
      return false;
    } catch (err: any) {
      const errorMessage = err.message || 'Invalid OTP';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmailOTP = async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.sendEmailOTP(email);
      if (response.success) {
        toast.success('OTP sent successfully to your email');
        return true;
      }
      return false;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to send OTP';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmailOTP = async (email: string, otp: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.verifyEmailOTP(email, otp);
      if (response.success && response.data) {
        authService.setAuthToken(response.data.token);
        setUser({
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email || email,
          mobile: response.data.user.mobile || '',
          isAuthenticated: true,
        });
        toast.success('Login successful!');
        return true;
      }
      return false;
    } catch (err: any) {
      const errorMessage = err.message || 'Invalid OTP';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.removeAuthToken();
    setUser(null);
    toast.success('Logged out successfully');
  };

  return {
    user,
    isLoading,
    error,
    sendMobileOTP,
    verifyMobileOTP,
    sendEmailOTP,
    verifyEmailOTP,
    logout,
    isAuthenticated: authService.isAuthenticated(),
  };
}
