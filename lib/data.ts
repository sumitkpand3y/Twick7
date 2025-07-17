import { State, Car, CarModel, FuelType, ServiceType, Review } from '@/types';
import { PopularService, Coupon } from '@/types';

export const states: State[] = [
  { id: '1', name: 'Mumbai', image: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '2', name: 'Delhi', image: 'https://images.pexels.com/photos/1007025/pexels-photo-1007025.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '3', name: 'Bangalore', image: 'https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '4', name: 'Chennai', image: 'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '5', name: 'Kolkata', image: 'https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '6', name: 'Hyderabad', image: 'https://images.pexels.com/photos/1141853/pexels-photo-1141853.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

export const cars: Car[] = [
  {
    id: '1',
    name: 'Maruti Suzuki',
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400',
    models: [
      { id: '1', name: 'Swift', image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400', carId: '1' },
      { id: '2', name: 'Baleno', image: 'https://images.pexels.com/photos/193819/pexels-photo-193819.jpeg?auto=compress&cs=tinysrgb&w=400', carId: '1' },
      { id: '3', name: 'Alto', image: 'https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg?auto=compress&cs=tinysrgb&w=400', carId: '1' },
    ]
  },
  {
    id: '2',
    name: 'Hyundai',
    image: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=400',
    models: [
      { id: '4', name: 'Creta', image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400', carId: '2' },
      { id: '5', name: 'i20', image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=400', carId: '2' },
      { id: '6', name: 'Verna', image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400', carId: '2' },
    ]
  },
  {
    id: '3',
    name: 'Toyota',
    image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400',
    models: [
      { id: '7', name: 'Innova', image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400', carId: '3' },
      { id: '8', name: 'Camry', image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400', carId: '3' },
      { id: '9', name: 'Fortuner', image: 'https://images.pexels.com/photos/193819/pexels-photo-193819.jpeg?auto=compress&cs=tinysrgb&w=400', carId: '3' },
    ]
  },
];

export const fuelTypes: FuelType[] = [
  { id: '1', name: 'Petrol', image: 'https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpg?auto=compress&cs=tinysrgb&w=400' },
  { id: '2', name: 'Diesel', image: 'https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpg?auto=compress&cs=tinysrgb&w=400' },
  { id: '3', name: 'CNG', image: 'https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpg?auto=compress&cs=tinysrgb&w=400' },
  { id: '4', name: 'Electric', image: 'https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpg?auto=compress&cs=tinysrgb&w=400' },
];

export const serviceTypes: ServiceType[] = [
  {
    id: '1',
    title: 'Basic Service',
    description: 'Oil change, filter replacement, basic checks',
    price: 2499,
    image: 'https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    title: 'Standard Service',
    description: 'Complete service with brake check, battery test',
    price: 4999,
    image: 'https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    title: 'Comprehensive Service',
    description: 'Full service with AC service, alignment check',
    price: 7999,
    image: 'https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    title: 'Battery Replacement',
    description: 'Battery testing and replacement service',
    price: 3500,
    image: 'https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '5',
    title: 'Brake Service',
    description: 'Brake pad replacement and brake fluid change',
    price: 2999,
    image: 'https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '6',
    title: 'AC Service',
    description: 'AC gas refill and complete AC system check',
    price: 1999,
    image: 'https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
];

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    rating: 5,
    comment: 'Excellent service! My car runs like new after the comprehensive service.',
    date: '2024-01-15',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    rating: 4,
    comment: 'Great experience with the booking process. Very professional team.',
    date: '2024-01-12',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'Amit Patel',
    rating: 5,
    comment: 'Quick and efficient service. Highly recommend for car maintenance.',
    date: '2024-01-10',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    rating: 5,
    comment: 'Doorstep service was amazing. Very convenient and professional.',
    date: '2024-01-08',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '5',
    name: 'Vikram Singh',
    rating: 4,
    comment: 'Good service quality and transparent pricing. Will book again.',
    date: '2024-01-05',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const heroSlides = [
  {
    id: 1,
    title: 'Professional Car Service',
    subtitle: 'Expert care for your vehicle',
    image: 'https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?auto=compress&cs=tinysrgb&w=1920',
    cta: 'Book Service Now'
  },
  {
    id: 2,
    title: 'Doorstep Service',
    subtitle: 'Convenient car care at your location',
    image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1920',
    cta: 'Book Service Now'
  },
  {
    id: 3,
    title: 'Trusted Mechanics',
    subtitle: 'Skilled professionals you can rely on',
    image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=1920',
    cta: 'Book Service Now'
  }
];

export const popularServices: PopularService[] = [
  {
    id: '1',
    title: 'Basic Car Service',
    description: 'Oil change, filter replacement, basic checks',
    price: 2499,
    originalPrice: 2999,
    icon: '🔧',
    popular: true,
    estimatedTime: '2-3 hours'
  },
  {
    id: '2',
    title: 'AC Service & Repair',
    description: 'AC gas refill, filter cleaning, cooling check',
    price: 1999,
    originalPrice: 2499,
    icon: '❄️',
    popular: true,
    estimatedTime: '1-2 hours'
  },
  {
    id: '3',
    title: 'Battery Replacement',
    description: 'Battery testing and replacement with warranty',
    price: 3500,
    icon: '🔋',
    estimatedTime: '30 minutes'
  },
  {
    id: '4',
    title: 'Brake Service',
    description: 'Brake pad replacement and brake fluid change',
    price: 2999,
    icon: '🛑',
    estimatedTime: '2 hours'
  },
  {
    id: '5',
    title: 'Car Wash & Detailing',
    description: 'Complete car wash with interior cleaning',
    price: 799,
    originalPrice: 999,
    icon: '🚿',
    popular: true,
    estimatedTime: '1 hour'
  },
  {
    id: '6',
    title: 'Tyre Replacement',
    description: 'Premium tyre replacement with alignment',
    price: 4999,
    icon: '🛞',
    estimatedTime: '1 hour'
  }
];

export const coupons: Coupon[] = [
  {
    id: '1',
    code: 'FIRST50',
    title: 'First Time User',
    description: 'Get 50% off on your first service',
    discount: 50,
    type: 'percentage',
    validUntil: '2024-12-31',
    minAmount: 1000
  },
  {
    id: '2',
    code: 'SAVE500',
    title: 'Flat ₹500 Off',
    description: 'Save ₹500 on services above ₹2000',
    discount: 500,
    type: 'fixed',
    validUntil: '2024-06-30',
    minAmount: 2000
  },
  {
    id: '3',
    code: 'WEEKEND20',
    title: 'Weekend Special',
    description: '20% off on weekend bookings',
    discount: 20,
    type: 'percentage',
    validUntil: '2024-03-31',
    minAmount: 1500
  }
];

export const carBrands = [
  { name: 'Maruti Suzuki', logo: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'Hyundai', logo: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'Toyota', logo: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'Honda', logo: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'Tata', logo: 'https://images.pexels.com/photos/193819/pexels-photo-193819.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'Mahindra', logo: 'https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg?auto=compress&cs=tinysrgb&w=200' }
];

export const whyChooseUs = [
  {
    icon: '🛡️',
    title: 'Trusted Service',
    description: 'Over 50,000+ satisfied customers trust us with their vehicles'
  },
  {
    icon: '💰',
    title: 'Transparent Pricing',
    description: 'No hidden charges. What you see is what you pay'
  },
  {
    icon: '🔧',
    title: 'Genuine Spares',
    description: 'We use only genuine OEM parts with manufacturer warranty'
  },
  {
    icon: '🏠',
    title: 'Doorstep Service',
    description: 'Free pickup and drop service at your convenience'
  },
  {
    icon: '⚡',
    title: 'Quick Service',
    description: 'Fast turnaround time without compromising quality'
  },
  {
    icon: '📱',
    title: 'Real-time Updates',
    description: 'Track your service status in real-time via WhatsApp'
  }
];

export const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
  'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur',
  'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad'
];

export const faqs = [
  {
    question: 'How do I book a service?',
    answer: 'You can book a service by clicking the "Book Service" button and following our simple 8-step process. Select your location, car details, service type, and preferred date.'
  },
  {
    question: 'Do you provide doorstep service?',
    answer: 'Yes, we provide free doorstep pickup and delivery service in all our service areas. Our team will collect your vehicle and return it after service.'
  },
  {
    question: 'What is your service warranty?',
    answer: 'All our services come with comprehensive warranty ranging from 3 to 12 months depending on the service type. Parts also come with manufacturer warranty.'
  },
  {
    question: 'How can I track my service?',
    answer: 'You can track your service in real-time through your dashboard. We also send WhatsApp updates at every stage of the service process.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major payment methods including cash, credit/debit cards, UPI, net banking, and digital wallets like Paytm, PhonePe, etc.'
  }
];