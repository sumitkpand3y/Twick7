import { State, Car, CarModel, FuelType, ServiceType, Review } from "@/types";
import { PopularService, Coupon } from "@/types";
const getImagePath = (fileName) => `../heroImages/${fileName}`;

export const states: State[] = [
  {
    id: "1",
    name: "Mumbai",
    image:
      "https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "2",
    name: "Delhi",
    image:
      "https://images.pexels.com/photos/1007025/pexels-photo-1007025.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "3",
    name: "Bangalore",
    image:
      "https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "4",
    name: "Chennai",
    image:
      "https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "5",
    name: "Kolkata",
    image:
      "https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "6",
    name: "Hyderabad",
    image:
      "https://images.pexels.com/photos/1141853/pexels-photo-1141853.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

export const cars: Car[] = [
  {
    id: "1",
    name: "Maruti Suzuki",
    image:
      "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400",
    models: [
      {
        id: "1",
        name: "Swift",
        image:
          "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400",
        carId: "1",
      },
      {
        id: "2",
        name: "Baleno",
        image:
          "https://images.pexels.com/photos/193819/pexels-photo-193819.jpeg?auto=compress&cs=tinysrgb&w=400",
        carId: "1",
      },
      {
        id: "3",
        name: "Alto",
        image:
          "https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg?auto=compress&cs=tinysrgb&w=400",
        carId: "1",
      },
    ],
  },
  {
    id: "2",
    name: "Hyundai",
    image:
      "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=400",
    models: [
      {
        id: "4",
        name: "Creta",
        image:
          "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400",
        carId: "2",
      },
      {
        id: "5",
        name: "i20",
        image:
          "https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=400",
        carId: "2",
      },
      {
        id: "6",
        name: "Verna",
        image:
          "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400",
        carId: "2",
      },
    ],
  },
  {
    id: "3",
    name: "Toyota",
    image:
      "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400",
    models: [
      {
        id: "7",
        name: "Innova",
        image:
          "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400",
        carId: "3",
      },
      {
        id: "8",
        name: "Camry",
        image:
          "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400",
        carId: "3",
      },
      {
        id: "9",
        name: "Fortuner",
        image:
          "https://images.pexels.com/photos/193819/pexels-photo-193819.jpeg?auto=compress&cs=tinysrgb&w=400",
        carId: "3",
      },
    ],
  },
];

export const fuelTypes: FuelType[] = [
  {
    id: "1",
    name: "Petrol",
    image:
      "https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "2",
    name: "Diesel",
    image:
      "https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "3",
    name: "CNG",
    image:
      "https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "4",
    name: "Electric",
    image:
      "https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpg?auto=compress&cs=tinysrgb&w=400",
  },
];

export const serviceTypes: ServiceType[] = [
  {
    id: "1",
    title: "Basic Car Service",
    description: "Oil change, filter replacement, basic checks",
    price: 2499,
    originalPrice: 2999,
    icon: "🔧",
    popular: true,
    estimatedTime: "2-3 hours",
    image:
      "https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "2",
    title: "AC Service & Repair",
    description: "AC gas refill, filter cleaning, cooling check",
    price: 1999,
    originalPrice: 2499,
    icon: "❄️",
    popular: true,
    estimatedTime: "1-2 hours",
    image:
      "https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "3",
    title: "Battery Replacement",
    description: "Battery testing and replacement with warranty",
    price: 3500,
     originalPrice: 3599,
    popular: true,
    icon: "🔋",
    estimatedTime: "30 minutes",
    image:
      "https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "4",
    title: "Brake Service",
    description: "Brake pad replacement and brake fluid change",
    price: 2999,
    icon: "🛑",
     originalPrice: 3499,
    popular: false,
    estimatedTime: "2 hours",
    image:
      "https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "5",
    title: "Car Wash & Detailing",
    description: "Complete car wash with interior cleaning",
    price: 799,
    originalPrice: 999,
    icon: "🚿",
    popular: true,
    estimatedTime: "1 hour",
    image:
      "https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "6",
    title: "Tyre Replacement",
    description: "Premium tyre replacement with alignment",
    price: 4999,
     originalPrice: 5499,
    popular: false,
    icon: "🛞",
    estimatedTime: "1 hour",
    image:
      "https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

export const reviews: Review[] = [
  {
    id: '9',
    name: 'Rajesh Kumar',
    rating: 5,
    comment: 'Excellent service! My car runs like new after the comprehensive service. Professional staff and transparent pricing.',
   avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: '2024-01-15'
  },
  {
    id: '8',
    name: 'Priya Sharma',
    rating: 5,
    comment: 'Very satisfied with the AC service. Quick turnaround time and reasonable prices. Highly recommended!',
   avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: '2024-01-12'
  },
  {
    id: '7',
    name: 'Amit Patel',
    rating: 4,
    comment: 'Good service quality. The brake service was done professionally. Will definitely come back for future services.',
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: '2024-01-10'
  },
  {
    id: '6',
    name: 'Sneha Reddy',
    rating: 5,
    comment: 'Pre-purchase inspection saved me from buying a problematic car. Detailed report and honest advice. Thank you!',
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: '2024-01-08'
  },
  {
    id: "1",
    name: "Rajesh Kumar",
    rating: 5,
    comment:
      "Excellent service! My car runs like new after the comprehensive service.",
    date: "2024-01-15",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "2",
    name: "Priya Sharma",
    rating: 4,
    comment:
      "Great experience with the booking process. Very professional team.",
    date: "2024-01-12",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "3",
    name: "Amit Patel",
    rating: 5,
    comment:
      "Quick and efficient service. Highly recommend for car maintenance.",
    date: "2024-01-10",
    avatar:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "4",
    name: "Sneha Reddy",
    rating: 5,
    comment: "Doorstep service was amazing. Very convenient and professional.",
    date: "2024-01-08",
    avatar:
      "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "5",
    name: "Vikram Singh",
    rating: 4,
    comment: "Good service quality and transparent pricing. Will book again.",
    date: "2024-01-05",
    avatar:
      "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

console.log(
  "dfdfd",
  getImagePath("Where_Technical_Expertise_Meets_Transparent_Service")
);

export const heroSlides = [
  {
    id: 1,
    type: "image",
    mediaUrl: getImagePath(
      "Where_Technical_Expertise_Meets_Transparent_Service.jpg"
    ),
    title: "Expert Service",
    subtitle: "Transparent care you can trust",
    cta: "Book Service Now",
  },
  {
    id: 2,
    type: "image",
    mediaUrl: getImagePath("Precision_Diagnostics_Engineered_Repairs.jpg"),
    title: "Precision Repairs",
    subtitle: "Advanced diagnostics, perfect results",
    cta: "Book Service Now",
  },
  {
    id: 3,
    type: "image",
    mediaUrl: getImagePath("We_Listen_First_We_Fix_Next.jpg"),
    title: "We Listen. We Fix.",
    subtitle: "Your needs first, solutions next",
    cta: "Book Service Now",
  },
  {
    id: 4,
    type: "image",
    mediaUrl: getImagePath("Drive_with_confidence.jpg"),
    title: "Drive Confident",
    subtitle: "Reliable service every time",
    cta: "Book Service Now",
  },
];


export const popularServices: PopularService[] = [
  {
    id: "1",
    title: "Basic Car Service",
    description: "Oil change, filter replacement, basic checks",
    price: 2499,
    originalPrice: 2999,
    icon: "🔧",
    popular: true,
    estimatedTime: "2-3 hours",
  },
  {
    id: "2",
    title: "AC Service & Repair",
    description: "AC gas refill, filter cleaning, cooling check",
    price: 1999,
    originalPrice: 2499,
    icon: "❄️",
    popular: true,
    estimatedTime: "1-2 hours",
  },
  {
    id: "3",
    title: "Battery Replacement",
    description: "Battery testing and replacement with warranty",
    price: 3500,
    icon: "🔋",
    estimatedTime: "30 minutes",
  },
  {
    id: "4",
    title: "Brake Service",
    description: "Brake pad replacement and brake fluid change",
    price: 2999,
    icon: "🛑",
    estimatedTime: "2 hours",
  },
  {
    id: "5",
    title: "Car Wash & Detailing",
    description: "Complete car wash with interior cleaning",
    price: 799,
    originalPrice: 999,
    icon: "🚿",
    popular: true,
    estimatedTime: "1 hour",
  },
  {
    id: "6",
    title: "Tyre Replacement",
    description: "Premium tyre replacement with alignment",
    price: 4999,
    icon: "🛞",
    estimatedTime: "1 hour",
  },
];

export const coupons: Coupon[] = [
  {
    id: "1",
    code: "FIRST50",
    title: "First Time User",
    description: "Get 50% off on your first service",
    discount: 50,
    type: "percentage",
    validUntil: "2024-12-31",
    minAmount: 1000,
  },
  {
    id: "2",
    code: "SAVE500",
    title: "Flat ₹500 Off",
    description: "Save ₹500 on services above ₹2000",
    discount: 500,
    type: "fixed",
    validUntil: "2024-06-30",
    minAmount: 2000,
  },
  {
    id: "3",
    code: "WEEKEND20",
    title: "Weekend Special",
    description: "20% off on weekend bookings",
    discount: 20,
    type: "percentage",
    validUntil: "2024-03-31",
    minAmount: 1500,
  },
];

export const carBrands = [
  {
    name: "Maruti Suzuki",
    logo: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Hyundai",
    logo: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Toyota",
    logo: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Honda",
    logo: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Tata",
    logo: "https://images.pexels.com/photos/193819/pexels-photo-193819.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Mahindra",
    logo: "https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg?auto=compress&cs=tinysrgb&w=200",
  },
];

export const whyChooseUs = [
  {
    icon: "🛡️",
    title: "Transparent & Honest Pricing",
    description: "Clear estimates with no hidden charges or surprise add-ons.",
  },
  {
    icon: "💰",
    title: "Expert Technicians",
    description:
      "Skilled professionals delivering accurate diagnosis and quality repairs.",
  },
  {
    icon: "🔧",
    title: "Real-Time Updates",
    description:
      "Photos, videos, and clear communication at every stage of the service.",
  },
  {
    icon: "🏠",
    title: "Genuine Parts with Warranty",
    description:
      "High-quality parts backed by Tweak7’s 9-month warranty for complete peace of mind.",
  },
  {
    icon: "⚡",
    title: "Advanced Diagnostics & Inspection",
    description:
      "Professional tools and in-depth inspection reports to prevent future issues.",
  },
  {
    icon: "📱",
    title: "Hassle-Free Appointment System",
    description:
      "Scheduled service slots, minimal waiting, and a smooth, organised workflow.",
  },
];

export const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Pimpri-Chinchwad",
];

export const faqs = [
  {
    category: "GENERAL SERVICE & MECHANICAL WORK",
    questions: [
      {
        question: "What services does Tweak7 offer?",
        answer:
          "We provide complete car care — periodic service, diagnostics, repairs, AC work, brakes, suspension, electrical, and detailed inspections.",
      },
      {
        question: "How do I book a service appointment?",
        answer:
          "Visit www.tweak7.co.in, click 'Schedule Appointment', fill your vehicle details, describe your issue, and submit. You'll receive instant confirmation.",
      },
      {
        question: "How do I book a service?",
        answer:
          "You can book a service by clicking the 'Book Service' button and following our simple 8-step process. Select your location, car details, service type, and preferred date.",
      },
      {
        question: "How soon can I get my car serviced?",
        answer: "Usually within 24–48 hours, depending on slot availability.",
      },
      {
        question: "Is pricing transparent? Any hidden charges?",
        answer:
          "No hidden charges. We share a clear estimate upfront and take your approval before any additional work.",
      },
      {
        question: "Do you use genuine parts?",
        answer:
          "Yes. Only genuine or OEM-quality parts are used for reliability and safety.",
      },
      {
        question: "Is there a warranty on parts or service?",
        answer: "Every part installed by Tweak7 carries a 9-month warranty.",
      },
      {
        question: "What is your service warranty?",
        answer:
          "All our services come with comprehensive warranty ranging from 3 to 12 months depending on the service type. Parts also come with manufacturer warranty.",
      },
      {
        question: "What does the 9-month parts warranty cover?",
        answer:
          "Covers manufacturing defects or premature failure under normal usage.",
      },
      {
        question: "How do I claim my warranty?",
        answer:
          "Contact us with your invoice and bring the vehicle for inspection. If the part is defective, replacement is free.",
      },
      {
        question: "Do I need the invoice for warranty claims?",
        answer: "Yes — digital or printed invoice is required.",
      },
      {
        question: "Will I receive updates during service?",
        answer:
          "Yes — you get regular photos, videos, and explanations at every stage.",
      },
      {
        question: "How can I track my service?",
        answer:
          "You can track your service in real-time through your dashboard. We also send WhatsApp updates at every stage of the service process.",
      },
      {
        question: "How long does servicing take?",
        answer:
          "Basic service: a few hours. Major repairs: based on parts availability. We provide an ETA during booking.",
      },
      {
        question: "Can I supply my own parts?",
        answer:
          "Not recommended. No warranty can be given on customer-supplied parts.",
      },
      {
        question: "Do you push unnecessary repairs?",
        answer:
          "No. Every recommendation is supported with photos + videos + explanation.",
      },
      {
        question: "What if a part is not in stock?",
        answer:
          "We update you immediately, share options & timelines, and proceed only with approval.",
      },
      {
        question: "What payment modes are accepted?",
        answer: "UPI, card, net banking, and cash.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major payment methods including cash, credit/debit cards, UPI, net banking, and digital wallets like Paytm, PhonePe, etc.",
      },
      {
        question: "Do you offer pickup & drop?",
        answer: "Available in select areas based on technician availability.",
      },
      {
        question: "Do you provide doorstep service?",
        answer:
          "Yes, we provide free doorstep pickup and delivery service in all our service areas. Our team will collect your vehicle and return it after service.",
      },
      {
        question: "Can I visit the workshop during service?",
        answer: "Yes — customers are welcome anytime with safety guidelines.",
      },
      {
        question: "Are walk-ins accepted?",
        answer:
          "Appointments are prioritised. Walk-ins are accepted based on slot availability.",
      },
      {
        question: "What if I am not satisfied with the service?",
        answer:
          "Your satisfaction matters. Contact us — we will resolve the issue promptly and fairly.",
      },
    ],
  },
  {
    category: "CUSTOMER RIGHTS AT TWEAK7",
    questions: [
      {
        question: "What can I demand during service?",
        answer:
          "✔ Photos & videos of every repair step ✔ Clear video proof of any doubtful repair ✔ Before & After comparisons ✔ Detailed explanation of what was done ✔ Itemised estimate & bill ✔ Clarification or re-check for any concern ✔ Transparency & approval before any additional work",
      },
      {
        question: "What if the same issue appears again?",
        answer:
          "Contact us immediately. We inspect and resolve based on the cause and warranty status.",
      },
    ],
  },
  {
    category: "BODY REPAIR, PAINTING & RESTORATION",
    questions: [
      {
        question: "Do you offer body repair services?",
        answer:
          "Yes — from minor dents to major accident repairs, panel replacements, structural alignment, and rust treatment.",
      },
      {
        question: "How is denting work carried out?",
        answer:
          "✔ Dent pulling ✔ Panel straightening ✔ Welding (if required) ✔ Putty levelling ✔ Primer + paint prep. All stages include photos & videos.",
      },
      {
        question: "What paint system do you use?",
        answer:
          "High-quality base coat + clear coat paint with professional colour-matching technology.",
      },
      {
        question: "Will the paint match the original?",
        answer:
          "Yes — we perform spray-out tests, shade matching, and panel blending to achieve factory-like finish.",
      },
      {
        question: "Do you share before & after photos for body/paint work?",
        answer:
          "Yes. You receive: ✔ Damage photos ✔ Repair stage photos ✔ Paint prep photos ✔ After-paint finishing ✔ Sunlight video proof",
      },
      {
        question: "Is there a warranty on paintwork?",
        answer:
          "Yes — warranty on peeling, blistering, cracking, and fading (under normal conditions).",
      },
      {
        question: "How long does body/paint work take?",
        answer:
          "Minor dent + paint: 1–2 days. Panel repaint: 2–3 days. Accident repair: 3–7 days. Full body paint: 10–20 days.",
      },
      {
        question: "Do you do full car restoration?",
        answer: "Yes — mechanical, electrical, body, and painting restoration.",
      },
      {
        question: "What does restoration include?",
        answer:
          "✔ Engine, suspension, brake overhaul ✔ Full body denting & painting ✔ Electrical rewiring ✔ Interior refurbishment ✔ Trim & light restoration ✔ Final detailing + polishing ✔ Full documentation with photos/videos",
      },
    ],
  },
  {
    category: "ELECTRICAL WORKS",
    questions: [
      {
        question: "Do you offer electrical diagnostics?",
        answer:
          "Yes — we handle: ✔ Wiring repairs ✔ Sensor issues ✔ ECU diagnostics ✔ Battery/alternator issues ✔ Headlights & door electricals",
      },
      {
        question: "How are electrical problems diagnosed?",
        answer:
          "Using: ✔ OBD scanner ✔ Multimeter tests ✔ Circuit tracing ✔ Load testing ✔ Fault demonstration videos",
      },
    ],
  },
  {
    category: "DETAILING & CLEANING",
    questions: [
      {
        question: "What detailing services do you provide?",
        answer:
          "✔ Exterior foam wash ✔ Machine polishing ✔ Ceramic coating ✔ Interior deep cleaning ✔ Engine bay detailing ✔ Headlight restoration ✔ Water spot & swirl removal",
      },
      {
        question: "Do you offer ceramic coating?",
        answer:
          "Yes — 1, 3, and 5-year ceramic coating packages with warranty.",
      },
      {
        question: "How long does detailing take?",
        answer:
          "Basic detailing: 3–5 hours. Full interior: 1 day. Polishing + coating: 1–2 days. Premium detailing: 2–3 days.",
      },
      {
        question: "Will I get photos/videos of detailing work?",
        answer:
          "Yes — complete before/after and step-by-step videos are shared.",
      },
    ],
  },
];

export const statsData = [
  {
    id: 1,
    title: "Years Of Service",
    subtitle: "Keeping Bangalore vehicles running smoothly since 2020.",
    value: 5,
    prefix: "",
    suffix: "+",
  },
  {
    id: 2,
    title: "Expert Technicians",
    subtitle: "Trained mechanics for all type of multi-brand cars ",
    value: 25,
    prefix: "",
    suffix: "+",
  },
  {
    id: 3,
    title: "Happy Customers",
    subtitle: "Regulars who rely on us for genuine and transparent service.",
    value: 5500,
    prefix: "",
    suffix: "+",
  },
  {
    id: 4,
    title: "Vehicles Repaired",
    subtitle: "From minor fixes to full overhauls, done right the first time.",
    value: 4200,
    prefix: "",
    suffix: "+",
  },
];
