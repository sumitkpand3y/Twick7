"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Calendar,
  Car,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Phone,
  Mail
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  service: string;
  car: {
    model: string;
    plateNumber: string;
    year: string;
  };
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  statusDescription?: string;
  bookingDate: string;
  serviceDate: string;
  amount: number;
  technician?: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

const mockBookings: Booking[] = [
  {
    id: 'BK001',
    customer: {
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+91-98765-43210'
    },
    service: 'Periodic Service',
    car: {
      model: 'Maruti Swift',
      plateNumber: 'MH 01 AB 1234',
      year: '2020'
    },
    status: 'in-progress',
    statusDescription: 'Vehicle picked up, service in progress',
    bookingDate: '2024-01-20',
    serviceDate: '2024-01-25',
    amount: 2499,
    technician: 'Amit Sharma',
    address: 'Andheri East, Mumbai',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-25'
  },
  {
    id: 'BK002',
    customer: {
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91-98765-43211'
    },
    service: 'AC Service',
    car: {
      model: 'Hyundai Creta',
      plateNumber: 'MH 02 CD 5678',
      year: '2021'
    },
    status: 'completed',
    statusDescription: 'Service completed successfully',
    bookingDate: '2024-01-18',
    serviceDate: '2024-01-22',
    amount: 1299,
    technician: 'Rohit Patel',
    address: 'Bandra West, Mumbai',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-22'
  },
  {
    id: 'BK003',
    customer: {
      name: 'Amit Patel',
      email: 'amit@example.com',
      phone: '+91-98765-43212'
    },
    service: 'Battery Replacement',
    car: {
      model: 'Tata Nexon',
      plateNumber: 'MH 03 EF 9012',
      year: '2019'
    },
    status: 'pending',
    statusDescription: 'Waiting for customer confirmation',
    bookingDate: '2024-01-25',
    serviceDate: '2024-01-28',
    amount: 3499,
    address: 'Powai, Mumbai',
    createdAt: '2024-01-25',
    updatedAt: '2024-01-25'
  }
];

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState({
    status: '' as Booking['status'],
    description: ''
  });
  const { toast } = useToast();

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.car.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'confirmed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-orange-100 text-orange-800';
    }
  };

  const handleStatusUpdate = () => {
    if (!selectedBooking) return;

    const updatedBookings = bookings.map(booking =>
      booking.id === selectedBooking.id
        ? {
            ...booking,
            status: statusUpdate.status,
            statusDescription: statusUpdate.description,
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : booking
    );

    setBookings(updatedBookings);
    setIsStatusModalOpen(false);
    setStatusUpdate({ status: '' as Booking['status'], description: '' });
    
    toast({
      title: "Status Updated",
      description: `Booking ${selectedBooking.id} status updated to ${statusUpdate.status}`,
    });
  };

  const openStatusModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setStatusUpdate({
      status: booking.status,
      description: booking.statusDescription || ''
    });
    setIsStatusModalOpen(true);
  };

  const openViewModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsViewModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings Management</h1>
          <p className="text-gray-600">Manage customer service bookings</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-blue-100 text-blue-800">
            {filteredBookings.length} Total
          </Badge>
          <Badge className="bg-orange-100 text-orange-800">
            {filteredBookings.filter(b => b.status === 'pending').length} Pending
          </Badge>
          <Badge className="bg-green-100 text-green-800">
            {filteredBookings.filter(b => b.status === 'completed').length} Completed
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by customer, plate number, or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <div>
                          <h3 className="font-semibold text-gray-900">Booking #{booking.id}</h3>
                          <p className="text-sm text-gray-600">
                            Booked on {booking.bookingDate} • Service on {booking.serviceDate}
                          </p>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(booking.status)} flex items-center space-x-1`}>
                        {getStatusIcon(booking.status)}
                        <span className="capitalize">{booking.status}</span>
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{booking.customer.name}</p>
                          <p className="text-sm text-gray-600">{booking.customer.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Car className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{booking.car.model}</p>
                          <p className="text-sm text-gray-600">{booking.car.plateNumber}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white">₹</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{booking.service}</p>
                          <p className="text-sm text-gray-600">₹{booking.amount}</p>
                        </div>
                      </div>
                    </div>
                    
                    {booking.statusDescription && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Status Note:</strong> {booking.statusDescription}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openViewModal(booking)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openStatusModal(booking)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Update Status
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View Booking Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Booking Details - #{selectedBooking?.id}</DialogTitle>
            <DialogDescription>Complete booking information</DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Customer Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>{selectedBooking.customer.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{selectedBooking.customer.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{selectedBooking.customer.phone}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Vehicle Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Car className="w-4 h-4 text-gray-400" />
                      <span>{selectedBooking.car.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plate Number:</span>
                      <span className="font-medium">{selectedBooking.car.plateNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Year:</span>
                      <span className="font-medium">{selectedBooking.car.year}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Service Details</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{selectedBooking.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">₹{selectedBooking.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Date:</span>
                    <span className="font-medium">{selectedBooking.serviceDate}</span>
                  </div>
                  {selectedBooking.technician && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Technician:</span>
                      <span className="font-medium">{selectedBooking.technician}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Address:</span>
                    <span className="font-medium">{selectedBooking.address}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Status Information</h4>
                <div className="flex items-center space-x-3 mb-2">
                  <Badge className={`${getStatusColor(selectedBooking.status)} flex items-center space-x-1`}>
                    {getStatusIcon(selectedBooking.status)}
                    <span className="capitalize">{selectedBooking.status}</span>
                  </Badge>
                  <span className="text-sm text-gray-600">
                    Updated on {selectedBooking.updatedAt}
                  </span>
                </div>
                {selectedBooking.statusDescription && (
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                    {selectedBooking.statusDescription}
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Status Update Modal */}
      <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Booking Status</DialogTitle>
            <DialogDescription>
              Update the status for booking #{selectedBooking?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select 
                value={statusUpdate.status} 
                onValueChange={(value: Booking['status']) => 
                  setStatusUpdate(prev => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Status Description</Label>
              <Textarea
                id="description"
                value={statusUpdate.description}
                onChange={(e) => setStatusUpdate(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Add a note about this status update..."
                rows={3}
              />
            </div>
            <Button onClick={handleStatusUpdate} className="w-full">
              Update Status
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {filteredBookings.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria' 
                : 'No bookings have been made yet'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}