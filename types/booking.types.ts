// types/booking.types.ts
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  whatsappNumber?: string;
}

export interface Vehicle {
  id: string;
  model: string;
  brand: string;
  plateNumber: string;
  year: string;
  color?: string;
  engineNumber?: string;
  chassisNumber?: string;
}

export interface ServicePart {
  id: string;
  name: string;
  partNumber?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  description?: string;
  image?: string;
}

export interface ServiceCharge {
  id: string;
  name: string;
  description: string;
  amount: number;
  type: 'labor' | 'material' | 'misc';
}

export interface StatusUpdate {
  id: string;
  status: BookingStatus;
  title: string;
  description: string;
  image?: string;
  timestamp: string;
  updatedBy: string;
  notificationSent: boolean;
  whatsappSent: boolean;
}

export type BookingStatus = 
  | 'pending'
  | 'confirmed' 
  | 'vehicle_picked'
  | 'diagnosis_started'
  | 'diagnosis_completed'
  | 'parts_ordered'
  | 'parts_received'
  | 'work_in_progress'
  | 'work_completed'
  | 'quality_check'
  | 'ready_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'on_hold';

export interface ServiceDetails {
  id: string;
  name: string;
  category: string;
  description: string;
  estimatedDuration: number; // in hours
  basePrice: number;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  customer: Customer;
  vehicle: Vehicle;
  service: ServiceDetails;
  status: BookingStatus;
  currentStatusUpdate?: StatusUpdate;
  statusHistory: StatusUpdate[];
  bookingDate: string;
  serviceDate: string;
  estimatedCompletionDate?: string;
  actualCompletionDate?: string;
  technician?: {
    id: string;
    name: string;
    phone: string;
  };
  parts: ServicePart[];
  charges: ServiceCharge[];
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  paymentStatus: 'pending' | 'partial' | 'completed' | 'refunded';
  address: string;
  notes?: string;
  images: string[];
  invoiceGenerated: boolean;
  invoiceNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingFilters {
  search: string;
  status: BookingStatus | 'all';
  dateRange: {
    from?: string;
    to?: string;
  };
  technician?: string;
  paymentStatus?: 'pending' | 'partial' | 'completed' | 'refunded' | 'all';
}

export interface CreateBookingRequest {
  customerId: string;
  vehicleId: string;
  serviceId: string;
  serviceDate: string;
  address: string;
  notes?: string;
}

export interface UpdateStatusRequest {
  bookingId: string;
  status: BookingStatus;
  title: string;
  description: string;
  image?: File;
  sendWhatsApp?: boolean;
  sendEmail?: boolean;
}

export interface AddPartRequest {
  bookingId: string;
  parts: Omit<ServicePart, 'id'>[];
}

export interface AddChargeRequest {
  bookingId: string;
  charges: Omit<ServiceCharge, 'id'>[];
}

export interface InvoiceData {
  bookingId: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  subtotal: number;
  tax: number;
  total: number;
  terms?: string;
}

// Status configuration for UI and business logic
export const STATUS_CONFIG: Record<BookingStatus, {
  label: string;
  color: string;
  bgColor: string;
  icon: string;
  nextStatuses: BookingStatus[];
  allowsImageUpload: boolean;
  requiresDescription: boolean;
  autoNotify: boolean;
}> = {
  pending: {
    label: 'Pending Confirmation',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    icon: 'AlertCircle',
    nextStatuses: ['confirmed', 'cancelled'],
    allowsImageUpload: false,
    requiresDescription: true,
    autoNotify: true
  },
  confirmed: {
    label: 'Confirmed',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    icon: 'CheckCircle',
    nextStatuses: ['vehicle_picked', 'cancelled'],
    allowsImageUpload: false,
    requiresDescription: true,
    autoNotify: true
  },
  vehicle_picked: {
    label: 'Vehicle Picked Up',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    icon: 'Truck',
    nextStatuses: ['diagnosis_started'],
    allowsImageUpload: true,
    requiresDescription: true,
    autoNotify: true
  },
  diagnosis_started: {
    label: 'Diagnosis Started',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    icon: 'Search',
    nextStatuses: ['diagnosis_completed', 'on_hold'],
    allowsImageUpload: true,
    requiresDescription: true,
    autoNotify: true
  },
  diagnosis_completed: {
    label: 'Diagnosis Completed',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-100',
    icon: 'FileText',
    nextStatuses: ['parts_ordered', 'work_in_progress'],
    allowsImageUpload: true,
    requiresDescription: true,
    autoNotify: true
  },
  parts_ordered: {
    label: 'Parts Ordered',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    icon: 'Package',
    nextStatuses: ['parts_received', 'on_hold'],
    allowsImageUpload: false,
    requiresDescription: true,
    autoNotify: true
  },
  parts_received: {
    label: 'Parts Received',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    icon: 'PackageCheck',
    nextStatuses: ['work_in_progress'],
    allowsImageUpload: true,
    requiresDescription: true,
    autoNotify: true
  },
  work_in_progress: {
    label: 'Work in Progress',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    icon: 'Wrench',
    nextStatuses: ['work_completed', 'on_hold'],
    allowsImageUpload: true,
    requiresDescription: true,
    autoNotify: false
  },
  work_completed: {
    label: 'Work Completed',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    icon: 'CheckCircle2',
    nextStatuses: ['quality_check'],
    allowsImageUpload: true,
    requiresDescription: true,
    autoNotify: true
  },
  quality_check: {
    label: 'Quality Check',
    color: 'text-teal-600',
    bgColor: 'bg-teal-100',
    icon: 'Shield',
    nextStatuses: ['ready_for_delivery', 'work_in_progress'],
    allowsImageUpload: true,
    requiresDescription: true,
    autoNotify: false
  },
  ready_for_delivery: {
    label: 'Ready for Delivery',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    icon: 'Car',
    nextStatuses: ['delivered'],
    allowsImageUpload: true,
    requiresDescription: true,
    autoNotify: true
  },
  delivered: {
    label: 'Delivered',
    color: 'text-green-700',
    bgColor: 'bg-green-200',
    icon: 'CheckCircle',
    nextStatuses: [],
    allowsImageUpload: true,
    requiresDescription: true,
    autoNotify: true
  },
  cancelled: {
    label: 'Cancelled',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    icon: 'XCircle',
    nextStatuses: [],
    allowsImageUpload: false,
    requiresDescription: true,
    autoNotify: true
  },
  on_hold: {
    label: 'On Hold',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    icon: 'Pause',
    nextStatuses: ['work_in_progress', 'cancelled'],
    allowsImageUpload: false,
    requiresDescription: true,
    autoNotify: true
  }
};