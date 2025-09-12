import { BookingStatus, STATUS_CONFIG, Booking, BookingFilters } from '../types/booking.types';

export const getStatusConfig = (status: BookingStatus) => {
  return STATUS_CONFIG[status];
};

export const getStatusIcon = (status: BookingStatus) => {
  const config = getStatusConfig(status);
  return config.icon;
};

export const getStatusColor = (status: BookingStatus) => {
  const config = getStatusConfig(status);
  return `${config.bgColor} ${config.color}`;
};

export const getNextStatuses = (currentStatus: BookingStatus) => {
  return STATUS_CONFIG[currentStatus].nextStatuses;
};

export const canUpdateToStatus = (currentStatus: BookingStatus, targetStatus: BookingStatus): boolean => {
  return getNextStatuses(currentStatus).includes(targetStatus);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const calculateTotalAmount = (booking: Booking): number => {
  const partsTotal = booking.parts.reduce((sum, part) => sum + part.totalPrice, 0);
  const chargesTotal = booking.charges.reduce((sum, charge) => sum + charge.amount, 0);
  return booking.service.basePrice + partsTotal + chargesTotal;
};

export const generateBookingNumber = (): string => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  
  return `BK${year}${month}${day}${random}`;
};

export const generateInvoiceNumber = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const random = Math.random().toString().slice(-4);
  
  return `INV-${year}${month}${day}-${random}`;
};

export const getBookingProgress = (status: BookingStatus): number => {
  const statusOrder: BookingStatus[] = [
    'pending',
    'confirmed',
    'vehicle_picked',
    'diagnosis_started',
    'diagnosis_completed',
    'parts_ordered',
    'parts_received',
    'work_in_progress',
    'work_completed',
    'quality_check',
    'ready_for_delivery',
    'delivered'
  ];
  
  const currentIndex = statusOrder.indexOf(status);
  return currentIndex >= 0 ? ((currentIndex + 1) / statusOrder.length) * 100 : 0;
};

export const isBookingCompleted = (status: BookingStatus): boolean => {
  return ['delivered', 'cancelled'].includes(status);
};

export const isBookingActive = (status: BookingStatus): boolean => {
  return !['delivered', 'cancelled'].includes(status);
};

export const getEstimatedCompletionDate = (booking: Booking): Date | null => {
  if (booking.estimatedCompletionDate) {
    return new Date(booking.estimatedCompletionDate);
  }
  
  // Calculate based on service duration and current status
  const serviceDate = new Date(booking.serviceDate);
  const estimatedHours = booking.service.estimatedDuration;
  
  // Add buffer based on current status
  let bufferHours = 0;
  switch (booking.status) {
    case 'parts_ordered':
    case 'parts_received':
      bufferHours = 24; // 1 day for parts
      break;
    case 'diagnosis_started':
    case 'diagnosis_completed':
      bufferHours = 4; // 4 hours for diagnosis
      break;
    default:
      bufferHours = 2; // 2 hours buffer
  }
  
  serviceDate.setHours(serviceDate.getHours() + estimatedHours + bufferHours);
  return serviceDate;
};

export const filterBookings = (bookings: Booking[], filters: BookingFilters): Booking[] => {
  return bookings.filter(booking => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const searchableText = [
        booking.bookingNumber,
        booking.customer.name,
        booking.customer.phone,
        booking.customer.email,
        booking.vehicle.model,
        booking.vehicle.brand,
        booking.vehicle.plateNumber,
        booking.service.name,
        booking.technician?.name || '',
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(searchTerm)) {
        return false;
      }
    }
    
    // Status filter
    if (filters.status && filters.status !== 'all' && booking.status !== filters.status) {
      return false;
    }
    
    // Date range filter
    if (filters.dateRange.from) {
      const bookingDate = new Date(booking.serviceDate);
      const fromDate = new Date(filters.dateRange.from);
      if (bookingDate < fromDate) {
        return false;
      }
    }
    
    if (filters.dateRange.to) {
      const bookingDate = new Date(booking.serviceDate);
      const toDate = new Date(filters.dateRange.to);
      if (bookingDate > toDate) {
        return false;
      }
    }
    
    // Technician filter
    if (filters.technician && booking.technician?.id !== filters.technician) {
      return false;
    }
    
    // Payment status filter
    if (filters.paymentStatus && filters.paymentStatus !== 'all' && booking.paymentStatus !== filters.paymentStatus) {
      return false;
    }
    
    return true;
  });
};

export const sortBookings = (bookings: Booking[], sortBy: 'date' | 'status' | 'amount' | 'customer', sortOrder: 'asc' | 'desc' = 'desc'): Booking[] => {
  return [...bookings].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.serviceDate).getTime() - new Date(b.serviceDate).getTime();
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      case 'amount':
        comparison = a.totalAmount - b.totalAmount;
        break;
      case 'customer':
        comparison = a.customer.name.localeCompare(b.customer.name);
        break;
      default:
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
};
