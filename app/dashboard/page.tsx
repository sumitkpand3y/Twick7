'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Car, Clock, CreditCard, MapPin, Phone, User, ChevronDown, ChevronUp } from 'lucide-react';
import { ServiceTracking } from '@/components/service-tracking';
import { motion } from 'framer-motion';
import { Booking } from '@/types';

export default function Dashboard() {
  const { user, bookings, notifications, sendWhatsAppNotification } = useAuthStore();
  const router = useRouter();
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);
  const [expandedActiveService, setExpandedActiveService] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  const toggleBooking = (bookingId: string) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  const toggleActiveService = (bookingId: string) => {
    setExpandedActiveService(expandedActiveService === bookingId ? null : bookingId);
  };

  if (!user) {
    return null;
  }

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

  const stats = [
    {
      title: 'Total Bookings',
      value: bookings.length,
      icon: Calendar,
      color: 'text-blue-600',
    },
    {
      title: 'Completed Services',
      value: bookings.filter((b: Booking) => b.status === 'completed').length,
      icon: Car,
      color: 'text-green-600',
    },
    {
      title: 'Upcoming Services',
      value: bookings.filter((b: Booking) => !['completed', 'cancelled'].includes(b.status)).length,
      icon: Clock,
      color: 'text-yellow-600',
    },
    {
      title: 'Total Spent',
      value: `₹${bookings.reduce((sum: number, b: Booking) => sum + b.price, 0).toLocaleString()}`,
      icon: CreditCard,
      color: 'text-primary',
    },
  ];

  const handleWhatsAppUpdate = (booking: Booking) => {
    const message = `Hi! Here's an update on your ${booking.carModel} (${booking.plateNumber}) service: ${getStatusText(booking.status)}. Current status: ${booking?.statusHistory[booking.statusHistory?.length - 1]?.description}`;
    sendWhatsAppNotification(message, user?.mobile || '');
  };

  const activeServices = bookings.filter((b: Booking) => !['completed', 'cancelled'].includes(b.status));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="bg-gradient-to-r from-gray-900 to-gray-900/80 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-full">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Welcome back, {user.name}!</h1>
                <p className="text-xl opacity-90">Manage your car service bookings</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Stats Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Active Service Tracking */}
          {activeServices.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6">🚗 Active Services</h2>
              <div className="space-y-4">
                {activeServices.map((booking: Booking) => (
                  <Card key={booking.id} className="overflow-hidden">
                    <button
                      className="w-full text-left"
                      onClick={() => toggleActiveService(booking.id)}
                    >
                      <CardHeader className="flex flex-row items-center justify-between p-4 hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-full ${getStatusColor(booking.status)}`}>
                            <Car className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{booking.serviceType}</h3>
                            <p className="text-sm text-muted-foreground">
                              {booking.carModel} • {booking.plateNumber} • <span>💰 ₹{typeof booking.price === 'number' ? booking.price.toLocaleString() : '0'}</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className={getStatusColor(booking.status)}>
                            {getStatusText(booking.status)}
                          </Badge>
                          {expandedActiveService === booking.id ? (
                            <ChevronUp className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </CardHeader>
                    </button>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: expandedActiveService === booking.id ? 1 : 0,
                        height: expandedActiveService === booking.id ? 'auto' : 0
                      }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <CardContent className="p-4 pt-0">
                        <ServiceTracking
                          booking={booking}
                          onWhatsAppUpdate={() => handleWhatsAppUpdate(booking)}
                        />
                      </CardContent>
                    </motion.div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Profile Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span>{user.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span>{user.mobile}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Car className="h-6 w-6" />
                    <span>Book New Service</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Calendar className="h-6 w-6" />
                    <span>View All Bookings</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Phone className="h-6 w-6" />
                    <span>Contact Support</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <CreditCard className="h-6 w-6" />
                    <span>Payment History</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Bookings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Bookings
                  <Badge variant="secondary">{bookings.length} total</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No bookings yet</p>
                    <Button className="mt-4">Book Your First Service</Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {bookings.map((booking: Booking) => (
                      <Card key={booking.id} className="overflow-hidden">
                        <button
                          className="w-full text-left"
                          onClick={() => toggleBooking(booking.id)}
                        >
                          <CardHeader className="flex flex-row items-center justify-between p-4 hover:bg-gray-50">
                            <div className="flex items-center gap-4">
                              <div className={`p-2 rounded-full ${getStatusColor(booking.status)}`}>
                                <Car className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{booking.serviceType}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {booking.carModel} • {booking.plateNumber}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <Badge className={getStatusColor(booking.status)}>
                                {getStatusText(booking.status)}
                              </Badge>
                              {expandedBooking === booking.id ? (
                                <ChevronUp className="h-5 w-5 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                          </CardHeader>
                        </button>
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{
                            opacity: expandedBooking === booking.id ? 1 : 0,
                            height: expandedBooking === booking.id ? 'auto' : 0
                          }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <CardContent className="p-4 pt-0 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Date</p>
                                <p>{booking.date} at {booking.time}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Price</p>
                                <p className="font-semibold">₹{booking.price}</p>
                              </div>
                            </div>
                            {booking.services && (
                              <div>
                                <p className="text-sm text-muted-foreground">Services</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {Array.isArray(booking.services) ? (
                                    booking.services.map((service: string, idx: number) => (
                                      <Badge key={idx} variant="outline" className="text-xs">
                                        {typeof service === 'string' ? service : JSON.stringify(service)}
                                      </Badge>
                                    ))
                                  ) : (
                                    <Badge variant="outline" className="text-xs">
                                      {JSON.stringify(booking.services)}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            )}
                            {!['completed', 'cancelled'].includes(booking.status) && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="w-full"
                                onClick={() => handleWhatsAppUpdate(booking)}
                              >
                                Track Service
                              </Button>
                            )}
                          </CardContent>
                        </motion.div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}