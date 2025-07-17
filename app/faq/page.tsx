// import { Header } from '@/components/header';
// import { Footer } from '@/components/footer';
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// export default function FAQ() {
//   const faqs = [
//     {
//       question: 'How do I book a service?',
//       answer: 'You can book a service by clicking the "Book Service" button on our homepage and following the simple step-by-step process. You\'ll need to select your location, car details, service type, and preferred date.',
//     },
//     {
//       question: 'Do you provide doorstep service?',
//       answer: 'Yes, we provide doorstep pickup and delivery service in all our service areas. Our technicians will come to your location, pick up your vehicle, service it at our facility, and deliver it back to you.',
//     },
//     {
//       question: 'What is your service warranty?',
//       answer: 'All our services come with a comprehensive warranty ranging from 3 to 12 months depending on the service type. We also provide warranty on parts and labor.',
//     },
//     {
//       question: 'How much does a basic service cost?',
//       answer: 'Our basic service starts from ₹2,499 and includes oil change, filter replacement, and basic checks. The exact price may vary based on your car model and requirements.',
//     },
//     {
//       question: 'Can I track my service status?',
//       answer: 'Yes, you can track your service status in real-time through our dashboard. You\'ll receive SMS and email updates at each stage of the service process.',
//     },
//     {
//       question: 'What if I\'m not satisfied with the service?',
//       answer: 'Customer satisfaction is our top priority. If you\'re not satisfied with our service, please contact our support team within 24 hours, and we\'ll resolve the issue promptly.',
//     },
//     {
//       question: 'Do you use genuine parts?',
//       answer: 'Yes, we use only genuine OEM parts and high-quality aftermarket parts from trusted brands. All parts come with manufacturer warranty.',
//     },
//     {
//       question: 'How long does a service take?',
//       answer: 'Basic service typically takes 2-3 hours, while comprehensive service may take 4-6 hours. We\'ll provide you with an estimated completion time when you book.',
//     },
//     {
//       question: 'Can I reschedule my appointment?',
//       answer: 'Yes, you can reschedule your appointment up to 2 hours before the scheduled time through our dashboard or by calling our support team.',
//     },
//     {
//       question: 'What payment methods do you accept?',
//       answer: 'We accept all major payment methods including cash, credit/debit cards, UPI, net banking, and digital wallets.',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <main className="pt-16">
//         <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
//           <div className="container mx-auto px-4 text-center">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
//             <p className="text-xl max-w-2xl mx-auto">
//               Find answers to common questions about our services
//             </p>
//           </div>
//         </div>

//         <div className="container mx-auto px-4 py-16">
//           <div className="max-w-3xl mx-auto">
//             <Accordion type="single" collapsible className="w-full">
//               {faqs.map((faq, index) => (
//                 <AccordionItem key={index} value={`item-${index}`}>
//                   <AccordionTrigger className="text-left">
//                     {faq.question}
//                   </AccordionTrigger>
//                   <AccordionContent>
//                     {faq.answer}
//                   </AccordionContent>
//                 </AccordionItem>
//               ))}
//             </Accordion>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Phone,
  Mail,
  Wrench,
  HelpCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqs = [
    {
      category: "Booking & Services",
      questions: [
        {
          question: "How do I book a service with AutoCare?",
          answer:
            "You can book a service in multiple ways: 1) Through our website by clicking 'Book Now' and following the step-by-step process, 2) By calling our customer service at 1800-123-4567, 3) Through our mobile app. The booking process is simple and takes just a few minutes.",
        },
        {
          question: "What types of services do you offer?",
          answer:
            "We offer comprehensive automotive services including: Periodic/Regular servicing, AC service and repair, Battery replacement, Tyre and wheel care, Engine diagnostics, Brake service, Oil changes, and many more. All services are performed by certified technicians using genuine parts.",
        },
        {
          question: "Do you provide pickup and drop service?",
          answer:
            "Yes, we provide free pickup and drop service within city limits for all our customers. Our trained drivers will collect your vehicle from your preferred location and return it after service completion. This service is available 6 days a week.",
        },
        {
          question: "How much advance notice do I need to book a service?",
          answer:
            "We recommend booking at least 24-48 hours in advance to ensure your preferred time slot. However, we also accommodate same-day bookings based on availability. For urgent services, please call our helpline.",
        },
      ],
    },
    {
      category: "Pricing & Payment",
      questions: [
        {
          question: "How is the service cost calculated?",
          answer:
            "Our pricing is transparent and based on: 1) Type of service required, 2) Car make and model, 3) Parts needed (if any), 4) Labor charges. You'll receive a detailed estimate before any work begins, with no hidden charges.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major payment methods including: Cash, Credit/Debit cards, UPI payments, Net banking, Digital wallets (Paytm, PhonePe, etc.). Payment can be made online during booking or after service completion.",
        },
        {
          question: "Do you offer any discounts or packages?",
          answer:
            "Yes, we regularly offer: Seasonal discounts, First-time customer offers, Loyalty program benefits, Annual maintenance packages, Referral bonuses. Check our website or app for current offers.",
        },
      ],
    },
    {
      category: "Service Quality & Warranty",
      questions: [
        {
          question: "What warranty do you provide on services?",
          answer:
            "We provide a comprehensive warranty: 1 year warranty on all services, 6 months warranty on parts, 30-day satisfaction guarantee. If you face any issues related to our service within the warranty period, we'll fix it free of charge.",
        },
        {
          question: "Do you use genuine parts?",
          answer:
            "Yes, we use only genuine OEM parts or high-quality aftermarket parts from trusted brands. All parts come with manufacturer warranty. We never compromise on quality to ensure your vehicle's optimal performance and safety.",
        },
        {
          question: "How do you ensure service quality?",
          answer:
            "Our quality assurance includes: Certified and trained technicians, Standardized service procedures, Quality checks at each stage, Customer feedback system, Regular training updates, Modern diagnostic equipment.",
        },
      ],
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "How can I track my service status?",
          answer:
            "You can track your service in real-time through: Our website dashboard, Mobile app notifications, SMS updates at each stage, WhatsApp status updates, Customer service helpline. You'll know exactly what's happening with your vehicle.",
        },
        {
          question: "What if I'm not satisfied with the service?",
          answer:
            "Customer satisfaction is our priority. If you're not satisfied: Contact us within 24 hours, We'll investigate the issue immediately, Free re-service if needed, Full refund if issue can't be resolved, Escalation to senior management if required.",
        },
        {
          question: "Do you provide emergency roadside assistance?",
          answer:
            "Yes, we offer 24/7 emergency roadside assistance for: Battery jumpstart, Flat tyre assistance, Emergency fuel delivery, Lockout assistance, Towing service. Call our emergency helpline for immediate support.",
        },
      ],
    },
    {
      category: "Account & Profile",
      questions: [
        {
          question: "How do I create an account?",
          answer:
            "Creating an account is simple: Click 'Login' on our website, Choose email or mobile login, Enter OTP for verification, Complete your profile. Having an account helps you track bookings, view service history, and get personalized offers.",
        },
        {
          question: "Can I reschedule or cancel my booking?",
          answer:
            "Yes, you can reschedule or cancel: Up to 4 hours before scheduled time, Through website, app, or customer service, No cancellation charges, Easy rescheduling options available. We understand plans can change.",
        },
        {
          question: "How do I update my contact information?",
          answer:
            "You can update your information by: Logging into your account, Going to Profile section, Editing required fields, Saving changes. You can also call customer service for assistance with profile updates.",
        },
      ],
    },
  ];

  const filteredFAQs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HelpCircle className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Find quick answers to common questions about our services, booking
              process, and more. Can't find what you're looking for? Contact our
              support team.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500"
            />
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                No results found for "{searchTerm}"
              </p>
              <p className="text-gray-500 mt-2">
                Try different keywords or browse all categories below
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredFAQs.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
                    {category.category}
                  </h2>

                  <div className="space-y-4">
                    {category.questions.map((faq, index) => {
                      const globalIndex = categoryIndex * 100 + index; // Unique index
                      const isOpen = openItems.includes(globalIndex);

                      return (
                        <Card key={index} className="overflow-hidden">
                          <CardHeader
                            className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                            onClick={() => toggleItem(globalIndex)}
                          >
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-lg text-left pr-4">
                                {faq.question}
                              </CardTitle>
                              <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                              </motion.div>
                            </div>
                          </CardHeader>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <CardContent className="pt-0">
                                  <p className="text-gray-600 leading-relaxed">
                                    {faq.answer}
                                  </p>
                                </CardContent>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Card>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Still Need Help?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our customer support team is available 24/7 to assist you with any
              questions or concerns you may have.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Support
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Us
              </Button>
            </div>

            <div className="mt-8 text-blue-100">
              <p className="mb-2">📞 1800-123-4567 (Toll Free)</p>
              <p>✉️ support@autocare.com</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
