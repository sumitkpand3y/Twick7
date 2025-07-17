'use client';

import { useBookingStore } from '@/store/booking-store';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Car, Calendar, MapPin, User, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function ConfirmStep() {
  const { bookingData, setModalOpen, resetBooking } = useBookingStore();
  const { user, addBooking } = useAuthStore();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirmBooking = () => {
    if (user) {
      const newBooking = {
        id: Date.now().toString(),
        userId: user.id,
        carModel: bookingData.model?.name || '',
        plateNumber: bookingData.plateNumber,
        serviceType: bookingData.serviceType?.title || '',
        status: 'scheduled' as const,
        date: bookingData.serviceDate,
        time: '10:00 AM',
        price: bookingData.serviceType?.price || 0,
      };

      addBooking(newBooking);
      setIsConfirmed(true);
      
      setTimeout(() => {
        setModalOpen(false);
        resetBooking();
        setIsConfirmed(false);
      }, 3000);
    }
  };

  if (isConfirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20"
      >
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
        <p className="text-lg text-muted-foreground mb-4">
          Your service has been booked successfully
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-green-800 font-semibold">Booking ID: #BK{Date.now().toString().slice(-6)}</p>
          <p className="text-green-600 text-sm mt-1">
            You will receive a confirmation SMS shortly
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Confirm Your Booking</h2>
        <p className="text-muted-foreground">Please review your booking details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Vehicle Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">State:</span>
              <span className="font-medium">{bookingData.state?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Car:</span>
              <span className="font-medium">{bookingData.car?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Model:</span>
              <span className="font-medium">{bookingData.model?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fuel Type:</span>
              <span className="font-medium">{bookingData.fuelType?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Plate Number:</span>
              <span className="font-medium">{bookingData.plateNumber}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Service Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service:</span>
              <span className="font-medium">{bookingData.serviceType?.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-medium">{bookingData.serviceDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Price:</span>
              <span className="font-medium text-primary">₹{bookingData.serviceType?.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">KM Reading:</span>
              <span className="font-medium">{bookingData.kmReading} km</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Contact Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span className="font-medium">{bookingData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mobile:</span>
              <span className="font-medium">{bookingData.mobile}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">{bookingData.email}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <p className="font-medium">{bookingData.flatHouseNo}</p>
              <p>{bookingData.areaStreet}</p>
              <p>{bookingData.landmark}</p>
              <p>{bookingData.townCity}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center pt-6">
        <Button
          size="lg"
          onClick={handleConfirmBooking}
          className="px-8 py-3 text-lg"
          disabled={!user}
        >
          {!user ? 'Please Login to Confirm' : 'Confirm Booking'}
        </Button>
      </div>
    </div>
  );
}