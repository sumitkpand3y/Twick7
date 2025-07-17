'use client';

import { useBookingStore } from '@/store/booking-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

export function AddressStep() {
  const { bookingData, setBookingData } = useBookingStore();

  const handleInputChange = (field: string, value: string) => {
    setBookingData({ [field]: value });
  };

  const handleUseCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setBookingData({ useCurrentLocation: true });
          // Mock address filling
          setBookingData({
            flatHouseNo: '123',
            areaStreet: 'MG Road',
            landmark: 'Near Metro Station',
            townCity: 'Mumbai',
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
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
          className="flex items-center gap-2"
        >
          <MapPin className="h-4 w-4" />
          Use My Current Location
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={bookingData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="mobile">Mobile Number *</Label>
            <Input
              id="mobile"
              placeholder="Enter your mobile number"
              value={bookingData.mobile}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={bookingData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="flatHouseNo">Flat/House No., Building *</Label>
            <Input
              id="flatHouseNo"
              placeholder="Enter flat/house number"
              value={bookingData.flatHouseNo}
              onChange={(e) => handleInputChange('flatHouseNo', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="areaStreet">Area/Colony, Street *</Label>
            <Input
              id="areaStreet"
              placeholder="Enter area/street"
              value={bookingData.areaStreet}
              onChange={(e) => handleInputChange('areaStreet', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="landmark">Landmark</Label>
            <Input
              id="landmark"
              placeholder="Enter landmark"
              value={bookingData.landmark}
              onChange={(e) => handleInputChange('landmark', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="townCity">Town/City *</Label>
            <Input
              id="townCity"
              placeholder="Enter town/city"
              value={bookingData.townCity}
              onChange={(e) => handleInputChange('townCity', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}