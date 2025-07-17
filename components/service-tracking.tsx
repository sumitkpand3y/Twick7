'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Booking, BookingStatusHistory } from '@/types';
import { Clock, MapPin, Phone, CheckCircle, AlertCircle, Truck, Wrench, Droplets, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface ServiceTrackingProps {
  booking: Booking;
  onWhatsAppUpdate: () => void;
}

export function ServiceTracking({ booking, onWhatsAppUpdate }: ServiceTrackingProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="w-5 h-5" />;
      case 'pickup-scheduled':
        return <Truck className="w-5 h-5" />;
      case 'picked-up':
        return <Truck className="w-5 h-5" />;
      case 'in-service':
        return <Wrench className="w-5 h-5" />;
      case 'washing':
        return <Droplets className="w-5 h-5" />;
      case 'quality-check':
        return <Shield className="w-5 h-5" />;
      case 'ready-for-delivery':
        return <CheckCircle className="w-5 h-5" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'pickup-scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'picked-up':
        return 'bg-orange-100 text-orange-800';
      case 'in-service':
        return 'bg-purple-100 text-purple-800';
      case 'washing':
        return 'bg-cyan-100 text-cyan-800';
      case 'quality-check':
        return 'bg-indigo-100 text-indigo-800';
      case 'ready-for-delivery':
        return 'bg-green-100 text-green-800';
      case 'delivered':
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Service Scheduled';
      case 'pickup-scheduled':
        return 'Pickup Scheduled';
      case 'picked-up':
        return 'Vehicle Picked Up';
      case 'in-service':
        return 'Service in Progress';
      case 'washing':
        return 'Washing & Detailing';
      case 'quality-check':
        return 'Quality Check';
      case 'ready-for-delivery':
        return 'Ready for Delivery';
      case 'delivered':
        return 'Vehicle Delivered';
      case 'completed':
        return 'Service Completed';
      default:
        return status;
    }
  };

  const currentStatusIndex = booking.statusHistory.length - 1;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {getStatusIcon(booking.status)}
            Service Tracking - {booking.carModel}
          </CardTitle>
          <Badge className={getStatusColor(booking.status)}>
            {getStatusText(booking.status)}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>📋 {booking.plateNumber}</span>
          <span>🔧 {booking.serviceType}</span>
          <span>💰 ₹{booking.price.toLocaleString()}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-blue-800">Current Status</h3>
            {booking.estimatedCompletion && (
              <div className="flex items-center text-sm text-blue-600">
                <Clock className="w-4 h-4 mr-1" />
                ETA: {format(new Date(booking.estimatedCompletion), 'MMM dd, HH:mm')}
              </div>
            )}
          </div>
          <p className="text-blue-700">
            {booking.statusHistory[currentStatusIndex]?.description}
          </p>
          {booking.currentLocation && (
            <div className="flex items-center mt-2 text-sm text-blue-600">
              <MapPin className="w-4 h-4 mr-1" />
              {booking.currentLocation}
            </div>
          )}
        </div>

        {/* Status Timeline */}
        <div>
          <h3 className="font-semibold mb-4">Service Timeline</h3>
          <div className="space-y-4">
            {booking.statusHistory.map((status, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className={`p-2 rounded-full ${index === currentStatusIndex ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {getStatusIcon(status.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{getStatusText(status.status)}</h4>
                    <span className="text-sm text-gray-500">
                      {format(new Date(status.timestamp), 'MMM dd, HH:mm')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{status.description}</p>
                  {status.estimatedTime && (
                    <p className="text-xs text-gray-500 mt-1">
                      Estimated: {format(new Date(status.estimatedTime), 'MMM dd, HH:mm')}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={onWhatsAppUpdate}
            className="flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            WhatsApp Updates
          </Button>
          <Button variant="outline">
            Call Support
          </Button>
          {booking.status === 'ready-for-delivery' && (
            <Button className="bg-green-600 hover:bg-green-700">
              Schedule Delivery
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}