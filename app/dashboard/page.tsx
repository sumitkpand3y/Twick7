'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Car, Clock, CreditCard, MapPin, Phone, User, Bell, Download } from 'lucide-react';
import { ServiceTracking } from '@/components/service-tracking';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { user, bookings, notifications, sendWhatsAppNotification } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Scheduled';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
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
      value: bookings.filter(b => b.status === 'completed').length,
      icon: Car,
      color: 'text-green-600',
    },
    {
      title: 'Upcoming Services',
      value: bookings.filter(b => !['completed', 'cancelled'].includes(b.status)).length,
      icon: Clock,
      color: 'text-yellow-600',
    },
    {
      title: 'Total Spent',
      value: `₹${bookings.reduce((sum, b) => sum + b.price, 0).toLocaleString()}`,
      icon: CreditCard,
      color: 'text-primary',
    },
  ];

  const handleWhatsAppUpdate = (booking: any) => {
    const message = `Hi! Here's an update on your ${booking.carModel} (${booking.plateNumber}) service: ${getStatusText(booking.status)}. Current status: ${booking.statusHistory[booking.statusHistory.length - 1]?.description}`;
    sendWhatsAppNotification(message, user?.mobile || '');
  };
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
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
          {bookings.filter(b => !['completed', 'cancelled'].includes(b.status)).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6">🚗 Active Services</h2>
              <div className="space-y-6">
                {bookings
                  .filter(b => !['completed', 'cancelled'].includes(b.status))
                  .map((booking) => (
                    <ServiceTracking
                      key={booking.id}
                      booking={booking}
                      onWhatsAppUpdate={() => handleWhatsAppUpdate(booking)}
                    />
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
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Car className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{booking.serviceType}</h3>
                          <p className="text-sm text-muted-foreground">
                            {booking.carModel} • {booking.plateNumber}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {booking.date} at {booking.time}
                          </p>
                          {booking.services && booking.services.length > 1 && (
                            <div className="flex gap-1 mt-1">
                              {booking.services.map((service, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(booking.status)}>
                          {getStatusText(booking.status)}
                        </Badge>
                        <p className="text-sm font-semibold mt-1">₹{booking.price}</p>
                        {!['completed', 'cancelled'].includes(booking.status) && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="mt-2"
                            onClick={() => handleWhatsAppUpdate(booking)}
                          >
                            Track Service
                          </Button>
                        )}
                      </div>
                    </div>
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