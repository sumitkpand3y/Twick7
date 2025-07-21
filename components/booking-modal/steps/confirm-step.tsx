'use client';

import { useBookingStore } from '@/store/booking-store';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Car, Calendar, MapPin, User, Wrench, Fuel, Gauge, Smartphone, Mail, Hash, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

export function ConfirmStep() {
  const { bookingData, setModalOpen, resetBooking } = useBookingStore();
  const { user, addBooking } = useAuthStore();
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Get service types as an array
  const serviceTypes = Array.isArray(bookingData.serviceType) 
    ? bookingData.serviceType 
    : bookingData.serviceType 
      ? [bookingData.serviceType] 
      : [];

  const totalPrice = serviceTypes.reduce((sum, st) => sum + (st.price || 0), 0);

  const handleConfirmBooking = () => {
    if (user) {
      const newBooking = {
        id: `BK-${Date.now().toString().slice(-6)}`,
        userId: user.id,
        carDetails: {
          make: bookingData.car?.name || '',
          model: bookingData.model?.name || '',
          fuelType: bookingData.fuelType?.name || '',
          plateNumber: bookingData.plateNumber,
          year: bookingData.yearOfManufacturing,
          kmReading: bookingData.kmReading,
          state: bookingData.state?.name || ''
        },
        services: serviceTypes.map(service => ({
          id: service.id,
          title: service.title,
          price: service.price
        })),
        status: 'scheduled' as const,
        date: bookingData.serviceDate,
        time: '10:00 AM',
        totalPrice: totalPrice,
        customer: {
          name: bookingData.name,
          mobile: bookingData.mobile,
          email: bookingData.email
        },
        address: {
          flatHouseNo: bookingData.flatHouseNo,
          areaStreet: bookingData.areaStreet,
          landmark: bookingData.landmark,
          townCity: bookingData.townCity
        },
        createdAt: new Date().toISOString()
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
        className="text-center py-10"
      >
        <div className="mx-auto max-w-md">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Your {serviceTypes.length > 1 ? 'services have' : 'service has'} been booked successfully
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold text-lg mb-3 text-green-800">Booking Summary</h3>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-muted-foreground">Booking ID:</span>
                <span className="font-medium">BK-{Date.now().toString().slice(-6)}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Vehicle:</span>
                <span className="font-medium">
                  {bookingData.car?.name} {bookingData.model?.name}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Services:</span>
                <span className="font-medium text-right">
                  {serviceTypes.map(st => st.title).join(', ')}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Total:</span>
                <span className="font-medium text-primary">₹{totalPrice}</span>
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 font-medium mb-1">What's next?</p>
            <p className="text-sm text-blue-600">
              Our service advisor will contact you shortly to confirm the details.
              You'll receive an SMS with service preparation instructions.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Confirm Your Booking</h2>
        <p className="text-muted-foreground">Review all details before confirmation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Vehicle Details Card */}
        <Card className="border-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Car className="h-5 w-5 text-primary" />
              Vehicle Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <DetailRow 
              icon={<Hash className="h-4 w-4 text-muted-foreground" />}
              label="Plate Number"
              value={bookingData.plateNumber}
            />
            <DetailRow 
              icon={<Car className="h-4 w-4 text-muted-foreground" />}
              label="Make & Model"
              value={`${bookingData.car?.name} ${bookingData.model?.name}`}
            />
            <DetailRow 
              icon={<Fuel className="h-4 w-4 text-muted-foreground" />}
              label="Fuel Type"
              value={bookingData.fuelType?.name}
            />
            <DetailRow 
              icon={<Gauge className="h-4 w-4 text-muted-foreground" />}
              label="KM Reading"
              value={`${bookingData.kmReading} km`}
            />
            <DetailRow 
              icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
              label="Registered State"
              value={bookingData.state?.name}
            />
          </CardContent>
        </Card>

        {/* Service Details Card */}
        <Card className="border-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wrench className="h-5 w-5 text-primary" />
              Service Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Selected Services</h3>
              <div className="space-y-2">
                {serviceTypes.length > 0 ? (
                  serviceTypes.map((service, index) => (
                    <div key={index} className="flex justify-between items-center bg-muted/50 p-2 rounded">
                      <span className="font-medium">{service.title}</span>
                      <Badge variant="outline" className="text-primary">
                        ₹{service.price}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground italic">No services selected</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <DetailRow 
                icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
                label="Service Date"
                value={bookingData.serviceDate}
              />
              <DetailRow 
                icon={<Clock className="h-4 w-4 text-muted-foreground" />}
                label="Estimated Time"
                value="10:00 AM - 12:00 PM"
              />
            </div>

            <div className="border-t pt-3 mt-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Amount</span>
                <span className="text-xl font-bold text-primary">₹{totalPrice}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Details Card */}
        <Card className="border-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5 text-primary" />
              Customer Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <DetailRow 
              icon={<User className="h-4 w-4 text-muted-foreground" />}
              label="Full Name"
              value={bookingData.name}
            />
            <DetailRow 
              icon={<Smartphone className="h-4 w-4 text-muted-foreground" />}
              label="Mobile Number"
              value={bookingData.mobile}
            />
            <DetailRow 
              icon={<Mail className="h-4 w-4 text-muted-foreground" />}
              label="Email Address"
              value={bookingData.email}
            />
          </CardContent>
        </Card>

        {/* Address Card */}
        <Card className="border-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5 text-primary" />
              Service Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">{bookingData.flatHouseNo}</p>
              <p>{bookingData.areaStreet}</p>
              {bookingData.landmark && <p>Near {bookingData.landmark}</p>}
              <p>{bookingData.townCity}</p>
              {bookingData.useCurrentLocation && (
                <Badge variant="secondary" className="mt-2">
                  Using Current Location
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col items-center pt-6 gap-3">
        <Button
          size="lg"
          onClick={handleConfirmBooking}
          className="px-8 py-3 text-lg w-full max-w-md"
          disabled={!user || serviceTypes.length === 0}
        >
          {!user 
            ? 'Please Login to Confirm' 
            : serviceTypes.length === 0
              ? 'Please Select at Least One Service'
              : 'Confirm Booking'}
        </Button>
        
        <p className="text-sm text-muted-foreground text-center max-w-md">
          By confirming, you agree to our terms of service. A service advisor will contact you shortly.
        </p>
      </div>
    </div>
  );
}

// Reusable component for detail rows
function DetailRow({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string | number }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="font-medium">{value || '-'}</p>
      </div>
    </div>
  );
}