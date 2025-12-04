'use client';

import { useBookingStore } from '@/store/booking-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Loader as Loader2, CircleCheck as CheckCircle2, CircleAlert as AlertCircle } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { FieldError } from '@/utils/form-validation.utils';
import toast from 'react-hot-toast';

interface AddressStepProps {
  validationErrors: FieldError[];
  onFieldValidation?: (field: string, isValid: boolean) => void;
}

export function AddressStep({ validationErrors, onFieldValidation }: AddressStepProps) {
  const { bookingData, setBookingData } = useBookingStore();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const validateField = useCallback((field: string, value: any): boolean => {
    switch (field) {
      case 'name':
        return !!value && value.length >= 2;
      case 'mobile':
        return /^[6-9]\d{9}$/.test(value);
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'flatHouseNo':
      case 'areaStreet':
      case 'townCity':
        return !!value && value.trim().length > 0;
      case 'pincode':
        return /^\d{6}$/.test(value);
      default:
        return true;
    }
  }, []);

  const handleInputChange = useCallback((field: string, value: string) => {
    setBookingData({ [field]: value });

    const isValid = validateField(field, value);
    onFieldValidation?.(field, isValid);
  }, [setBookingData, validateField, onFieldValidation]);

  const getError = useCallback((fieldName: string): string | undefined => {
    return validationErrors.find((err) => err.field === fieldName)?.message;
  }, [validationErrors]);

  const hasError = useCallback((fieldName: string): boolean => {
    return validationErrors.some((err) => err.field === fieldName);
  }, [validationErrors]);

  useEffect(() => {
    const fieldsToCheck = ['name', 'mobile', 'email', 'flatHouseNo', 'areaStreet', 'townCity', 'pincode'];

    fieldsToCheck.forEach(field => {
      const value = bookingData[field as keyof typeof bookingData];
      const isValid = validateField(field, value);

      if (isValid && hasError(field)) {
        onFieldValidation?.(field, true);
      }
    });
  }, [bookingData, validateField, hasError, onFieldValidation]);

  const handleUseCurrentLocation = async () => {
    if (!('geolocation' in navigator)) {
      setLocationError('Geolocation is not supported by your browser');
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setIsLoadingLocation(true);
    setLocationError(null);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          maximumAge: 0,
          enableHighAccuracy: true
        });
      });
      const { latitude, longitude } = position.coords;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch address from coordinates');
      }

      const data = await response.json();
      const address = data.address || {};

      setBookingData({
        ...bookingData,
        useCurrentLocation: true,
        flatHouseNo: address.house_number || address.house || '',
        areaStreet: [address.road, address.suburb, address.neighbourhood]
          .filter(Boolean)
          .join(', '),
        landmark: address.landmark || address.neighbourhood || '',
        townCity: address.city || address.town || address.village || address.county || '',
        state: address.state || '',
        country: address.country || '',
        pincode: address.postcode || '',
      });

      toast.success('Location detected successfully!');
    } catch (error: any) {
      const errorMessage = error.message === 'User denied Geolocation'
        ? 'Please allow location access to use this feature'
        : 'Failed to get your location. Please enter address manually.';

      setLocationError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Address Details</h2>
        <p className="text-muted-foreground">Where should we pick up your vehicle?</p>
      </div>

      <div className="flex justify-center mb-6">
        <Button
          variant="outline"
          onClick={handleUseCurrentLocation}
          disabled={isLoadingLocation}
          className="flex items-center gap-2"
        >
          {isLoadingLocation ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
          {isLoadingLocation ? 'Detecting Location...' : 'Use My Current Location'}
        </Button>
      </div>

      {locationError && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p>{locationError}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={bookingData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={cn(
                'mt-1 transition-colors duration-200',
                hasError('name') && 'border-red-500 focus-visible:ring-red-500 bg-red-50',
                !hasError('name') && bookingData.name && bookingData.name.length >= 2 &&
                  'border-green-500 focus-visible:ring-green-500 bg-green-50'
              )}
            />
            {hasError('name') && (
              <p className="text-sm text-red-500 mt-1 animate-in fade-in-50 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {getError('name')}
              </p>
            )}
            {!hasError('name') && bookingData.name && bookingData.name.length >= 2 && (
              <p className="text-sm text-green-600 mt-1 animate-in fade-in-50 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Looks good!
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="mobile">Mobile Number *</Label>
            <Input
              id="mobile"
              placeholder="Enter 10-digit mobile number"
              value={bookingData.mobile || ''}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              maxLength={10}
              className={cn(
                'mt-1 transition-colors duration-200',
                hasError('mobile') && 'border-red-500 focus-visible:ring-red-500 bg-red-50',
                !hasError('mobile') && bookingData.mobile && /^[6-9]\d{9}$/.test(bookingData.mobile) &&
                  'border-green-500 focus-visible:ring-green-500 bg-green-50'
              )}
            />
            {hasError('mobile') && (
              <p className="text-sm text-red-500 mt-1 animate-in fade-in-50 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {getError('mobile')}
              </p>
            )}
            {!hasError('mobile') && bookingData.mobile && /^[6-9]\d{9}$/.test(bookingData.mobile) && (
              <p className="text-sm text-green-600 mt-1 animate-in fade-in-50 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Valid mobile number
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={bookingData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={cn(
                'mt-1 transition-colors duration-200',
                hasError('email') && 'border-red-500 focus-visible:ring-red-500 bg-red-50',
                !hasError('email') && bookingData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email) &&
                  'border-green-500 focus-visible:ring-green-500 bg-green-50'
              )}
            />
            {hasError('email') && (
              <p className="text-sm text-red-500 mt-1 animate-in fade-in-50 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {getError('email')}
              </p>
            )}
            {!hasError('email') && bookingData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email) && (
              <p className="text-sm text-green-600 mt-1 animate-in fade-in-50 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Valid email address
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="flatHouseNo">Flat/House No., Building *</Label>
            <Input
              id="flatHouseNo"
              placeholder="Enter flat/house number"
              value={bookingData.flatHouseNo || ''}
              onChange={(e) => handleInputChange('flatHouseNo', e.target.value)}
              className={cn(
                'mt-1 transition-colors duration-200',
                hasError('flatHouseNo') && 'border-red-500 focus-visible:ring-red-500 bg-red-50',
                !hasError('flatHouseNo') && bookingData.flatHouseNo &&
                  'border-green-500 focus-visible:ring-green-500 bg-green-50'
              )}
            />
            {hasError('flatHouseNo') && (
              <p className="text-sm text-red-500 mt-1 animate-in fade-in-50 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {getError('flatHouseNo')}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="areaStreet">Area/Colony, Street *</Label>
            <Input
              id="areaStreet"
              placeholder="Enter area/street"
              value={bookingData.areaStreet || ''}
              onChange={(e) => handleInputChange('areaStreet', e.target.value)}
              className={cn(
                'mt-1 transition-colors duration-200',
                hasError('areaStreet') && 'border-red-500 focus-visible:ring-red-500 bg-red-50',
                !hasError('areaStreet') && bookingData.areaStreet &&
                  'border-green-500 focus-visible:ring-green-500 bg-green-50'
              )}
            />
            {hasError('areaStreet') && (
              <p className="text-sm text-red-500 mt-1 animate-in fade-in-50 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {getError('areaStreet')}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="landmark">Landmark (Optional)</Label>
            <Input
              id="landmark"
              placeholder="Nearby landmark"
              value={bookingData.landmark || ''}
              onChange={(e) => handleInputChange('landmark', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="townCity">Town/City *</Label>
            <Input
              id="townCity"
              placeholder="Enter town/city"
              value={bookingData.townCity || ''}
              onChange={(e) => handleInputChange('townCity', e.target.value)}
              className={cn(
                'mt-1 transition-colors duration-200',
                hasError('townCity') && 'border-red-500 focus-visible:ring-red-500 bg-red-50',
                !hasError('townCity') && bookingData.townCity &&
                  'border-green-500 focus-visible:ring-green-500 bg-green-50'
              )}
            />
            {hasError('townCity') && (
              <p className="text-sm text-red-500 mt-1 animate-in fade-in-50 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {getError('townCity')}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="pincode">Pincode *</Label>
            <Input
              id="pincode"
              placeholder="Enter 6-digit pincode"
              value={bookingData.pincode || ''}
              onChange={(e) => handleInputChange('pincode', e.target.value)}
              maxLength={6}
              className={cn(
                'mt-1 transition-colors duration-200',
                hasError('pincode') && 'border-red-500 focus-visible:ring-red-500 bg-red-50',
                !hasError('pincode') && bookingData.pincode && /^\d{6}$/.test(bookingData.pincode) &&
                  'border-green-500 focus-visible:ring-green-500 bg-green-50'
              )}
            />
            {hasError('pincode') && (
              <p className="text-sm text-red-500 mt-1 animate-in fade-in-50 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {getError('pincode')}
              </p>
            )}
            {!hasError('pincode') && bookingData.pincode && /^\d{6}$/.test(bookingData.pincode) && (
              <p className="text-sm text-green-600 mt-1 animate-in fade-in-50 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Valid pincode
              </p>
            )}
          </div>
        </div>
      </div>

      <div
        className={cn(
          'p-4 rounded-lg border transition-all duration-300 animate-in fade-in-50',
          validationErrors.length === 0
            ? 'border-green-200 bg-green-50'
            : 'border-red-200 bg-red-50'
        )}
      >
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'w-3 h-3 rounded-full animate-pulse',
              validationErrors.length === 0 ? 'bg-green-500' : 'bg-red-500'
            )}
          />
          <p
            className={cn(
              'text-sm font-medium',
              validationErrors.length === 0 ? 'text-green-800' : 'text-red-800'
            )}
          >
            {validationErrors.length === 0
              ? 'All fields are valid ✓'
              : `Please fix ${validationErrors.length} error${
                  validationErrors.length > 1 ? 's' : ''
                } before proceeding`}
          </p>
        </div>
      </div>
    </div>
  );
}
