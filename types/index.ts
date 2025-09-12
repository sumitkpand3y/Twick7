export interface State {
  id: string;
  name: string;
  image: string;
}

export interface Car {
  id: string;
  name: string;
  image: string;
  models: CarModel[];
}

export interface CarModel {
  id: string;
  name: string;
  image: string;
  carId: string;
}

export interface FuelType {
  id: string;
  name: string;
  image: string;
}

export interface ServiceType {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  originalPrice:number;
  icon:string;
  popular:boolean;
  estimatedTime:string;
}

export interface BookingData {
  state: State | 'Bangaluru';
  car: Car | null;
  model: CarModel | null;
  fuelType: FuelType | null;
  serviceType: ServiceType | null;
  complaint: string;
  serviceDate: string;
  plateNumber: string;
  yearOfManufacturing: string;
  kmReading: string;
  specificIssues: string;
  name: string;
  mobile: string;
  email: string;
  flatHouseNo: string;
  areaStreet: string;
  landmark: string;
  townCity: string;
  useCurrentLocation: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  isAuthenticated: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  carModel: string;
  plateNumber: string;
  serviceType: string;
  status: 'scheduled' | 'pickup-scheduled' | 'picked-up' | 'in-service' | 'washing' | 'quality-check' | 'ready-for-delivery' | 'delivered' | 'completed' | 'cancelled';
  date: string;
  time: string;
  price: number;
  statusHistory: BookingStatusHistory[];
  estimatedCompletion?: string;
  currentLocation?: string;
  services: string[];
}

export interface BookingStatusHistory {
  status: string;
  timestamp: string;
  description: string;
  estimatedTime?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  whatsappSent?: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  title: string;
  description: string;
  discount: number;
  type: 'percentage' | 'fixed';
  validUntil: string;
  minAmount?: number;
}

export interface PopularService {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  icon: string;
  popular?: boolean;
  estimatedTime: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}