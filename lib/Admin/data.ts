// data.ts
import {
  Search, Filter, Eye, Edit, Calendar, Car, User, Clock, CheckCircle,
  AlertCircle, XCircle, Phone, Mail, Plus, Camera, Send, FileText,
  Download, Printer, MapPin, Wrench, Package, CreditCard, MessageSquare,
  Truck, Shield, PackageCheck, CheckCircle2, Pause, ClipboardCheck,
  ClipboardList, HardHat, Check, X, AlertTriangle
} from "lucide-react";

export const mechanics = [
  { id: "m1", name: "Amit Sharma", phone: "+91-98765-12345", specialization: "General", available: true },
  { id: "m2", name: "Raj Patel", phone: "+91-98765-54321", specialization: "Electrical", available: true },
  { id: "m3", name: "Vijay Singh", phone: "+91-98765-67890", specialization: "Engine", available: false },
];

export const serviceTypes = [
  { id: "st1", name: "Periodic Service", category: "Maintenance", basePrice: 2500 },
  { id: "st2", name: "AC Repair", category: "AC", basePrice: 1500 },
  { id: "st3", name: "Brake Repair", category: "Brakes", basePrice: 3000 },
];

export const partsInventory = [
  { id: "p1", name: "Engine Oil", partNumber: "EO-001", price: 250, stock: 50 },
  { id: "p2", name: "Oil Filter", partNumber: "OF-002", price: 300, stock: 30 },
  { id: "p3", name: "AC Filter", partNumber: "ACF-003", price: 450, stock: 20 },
  { id: "p4", name: "Brake Pads", partNumber: "BP-004", price: 1200, stock: 15 },
];

export const STATUS_CONFIG = {
  new: {
    label: "New Booking",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    icon: ClipboardList,
  },
  mechanic_assigned: {
    label: "Mechanic Assigned",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    icon: HardHat,
  },
  inspection: {
    label: "Inspection",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    icon: Search,
  },
  quotation_sent: {
    label: "Quotation Sent",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    icon: ClipboardCheck,
  },
  quotation_approved: {
    label: "Quotation Approved",
    color: "text-green-600",
    bgColor: "bg-green-100",
    icon: Check,
  },
  quotation_rejected: {
    label: "Quotation Rejected",
    color: "text-red-600",
    bgColor: "bg-red-100",
    icon: X,
  },
  work_in_progress: {
    label: "Work In Progress",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    icon: Wrench,
  },
  parts_ordered: {
    label: "Parts Ordered",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    icon: Package,
  },
  quality_check: {
    label: "Quality Check",
    color: "text-teal-600",
    bgColor: "bg-teal-100",
    icon: Shield,
  },
  ready_for_delivery: {
    label: "Ready For Delivery",
    color: "text-green-600",
    bgColor: "bg-green-100",
    icon: Car,
  },
  delivered: {
    label: "Delivered",
    color: "text-green-700",
    bgColor: "bg-green-200",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-600",
    bgColor: "bg-red-100",
    icon: XCircle,
  },
};

export const mockBookings = [
  {
    id: "1",
    bookingNumber: "BK24010001",
    customer: {
      id: "c1",
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "+91-98765-43210",
      address: "Andheri East, Mumbai",
      whatsappNumber: "+91-98765-43210",
    },
    vehicle: {
      id: "v1",
      model: "Swift",
      brand: "Maruti",
      plateNumber: "MH 01 AB 1234",
      year: "2020",
      color: "White",
    },
    serviceType: serviceTypes[0],
    status: "mechanic_assigned",
    assignedMechanic: mechanics[0],
    inspection: {
      notes: "Engine oil needs change, brake pads worn out",
      images: ["https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400"],
      timestamp: "2024-01-25T10:30:00Z",
    },
    quotation: {
      parts: [
        { ...partsInventory[0], quantity: 4, total: 1000 },
        { ...partsInventory[1], quantity: 1, total: 300 },
      ],
      laborCharges: [
        { name: "Basic Service", amount: 500 },
      ],
      additionalCharges: [],
      totalAmount: 1800,
      approved: false,
      rejected: false,
      customerNotes: "",
    },
    statusHistory: [
      {
        status: "new",
        timestamp: "2024-01-20T09:00:00Z",
        updatedBy: "System",
      },
      {
        status: "mechanic_assigned",
        timestamp: "2024-01-20T10:00:00Z",
        updatedBy: "Admin",
      },
    ],
    bookingDate: "2024-01-20",
    serviceDate: "2024-01-25",
    estimatedCompletionDate: "2024-01-26",
    invoice: null,
    createdAt: "2024-01-20T09:00:00Z",
    updatedAt: "2024-01-25T10:30:00Z",
  },
];