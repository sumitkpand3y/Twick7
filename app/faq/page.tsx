
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
          answer:
            "Yes — mechanical, electrical, body, and painting restoration.",
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
              <p>✉️ support@Tweak7.com</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
