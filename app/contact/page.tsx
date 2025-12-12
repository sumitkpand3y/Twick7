"use client";

import { useState } from "react";
import { useContact } from "@/hooks/useContact";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Wrench,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// Live Map Component
const LiveMap = () => {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.881284382299!2d77.63232497599645!3d12.897514487406345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1495d1e40d73%3A0x7a1a2cbed3a3d4a4!2sRoopena%20Agrahara%2C%20Bengaluru%2C%20Karnataka%20560068!5e0!3m2!1sen!2sin!4v1699876543210!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Tweak7 Service Center Location"
        className="min-h-[300px] lg:min-h-[400px]"
      />
    </div>
  );
};

export default function Contact() {
  const { submitContact, isLoading, error, fieldErrors, clearErrors } =
    useContact();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    priority: "MEDIUM" as "LOW" | "MEDIUM" | "HIGH" | "URGENT",
    category: "OTHER" as
      | "TECHNICAL"
      | "BILLING"
      | "SERVICE"
      | "COMPLAINT"
      | "SUGGESTION"
      | "FEEDBACK"
      | "OTHER",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();

    // Prepare data for contact support API
    const contactSupportData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      priority: formData.priority,
      category: formData.category,
    };

    const success = await submitContact(contactSupportData);

    if (success) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        priority: "MEDIUM",
        category: "OTHER",
      });
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />,
      title: "Phone",
      details: ["+91 99005 19565", "+91 1800-123-4567"],
      description: "Available 24/7 for emergency support",
      link: "tel:+919900519565",
    },
    {
      icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />,
      title: "Email",
      details: ["info@tweak7.com", "support@tweak7.com"],
      description: "We respond within 2 hours",
      link: "mailto:info@tweak7.com",
    },
    {
      icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />,
      title: "Address",
      details: [
        "446/5/14 6th Cross Road",
        "Roopena Agrahara, Bengaluru, Karnataka 560068",
      ],
      description: "Visit our main service center",
      link: "https://maps.google.com/?q=12.8975,77.6349",
    },
    {
      icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />,
      title: "Hours",
      details: ["Mon-Sat: 8:00 AM - 8:00 PM", "Sun: 9:00 AM - 6:00 PM"],
      description: "Extended hours for your convenience",
    },
  ];

  const offices = [
    {
      city: "Bengaluru Headquarters",
      address:
        "446/5/14 6th Cross Road Roopena Agrahara, Begur Hobli, Silk Board Flyover, Roopena Agrahara, Bommanahalli, Bengaluru, Karnataka 560068",
      phone: "+91 99005 19565",
      email: "info@tweak7.com",
      coordinates: { lat: 12.8975, lng: 77.6349 },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="pt-14">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center p-2 bg-white/10 backdrop-blur-sm rounded-full mb-4">
                <Wrench className="w-6 h-6 sm:w-8 sm:h-8 mr-2" />
                <span className="font-semibold text-sm sm:text-base">
                  Expert Automotive Care
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                Get in <span className="text-yellow-300">Touch</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto mb-8 sm:mb-12 text-blue-100 px-4">
                Have questions about our services? Need support? We're here to
                help you with all your automotive care needs.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 sm:py-16 bg-white relative">
          <div className="absolute inset-0 bg-grid-blue-100/50 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0.3))]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              className="text-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                How Can We Help You?
              </h2>
              <p className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
                Reach out to us through any of these channels and our team will
                be happy to assist you.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center h-full hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group hover:-translate-y-1">
                    <CardHeader className="pb-3">
                      <div className="flex justify-center mb-3">
                        <div className="p-2 sm:p-3 bg-blue-50 rounded-full group-hover:scale-110 transition-transform duration-300">
                          {info.icon}
                        </div>
                      </div>
                      <CardTitle className="text-lg sm:text-xl">
                        {info.title}
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        {info.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {info.details.map((detail, idx) => (
                        <p
                          key={idx}
                          className="font-medium text-gray-900 mb-1 text-sm sm:text-base"
                        >
                          {detail}
                        </p>
                      ))}
                      {info.link && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 text-xs sm:text-sm"
                          asChild
                        >
                          <a
                            href={info.link}
                            target={
                              info.link.startsWith("http") ? "_blank" : "_self"
                            }
                          >
                            {info.title === "Address"
                              ? "Get Directions"
                              : `Contact via ${info.title}`}
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                Contact Support
              </h2>
              <p className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
                Have a question or need technical support? Fill out the form
                below and we'll get back to you as soon as possible.
              </p>
            </motion.div>

            {/* Global Error Alert */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="shadow-lg border-0">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg py-4 sm:py-6">
                    <CardTitle className="text-xl sm:text-2xl">
                      Support Request
                    </CardTitle>
                    <CardDescription className="text-blue-100 text-sm sm:text-base">
                      Fill out the form below for technical support, billing
                      issues, or general inquiries.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 sm:pt-6">
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-4 sm:space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="name"
                            className="text-sm sm:text-base"
                          >
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            placeholder="Enter your full name"
                            className="text-sm sm:text-base"
                          />
                          {fieldErrors.name && (
                            <p className="text-xs sm:text-sm text-red-600 mt-1">
                              {fieldErrors.name}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="phone"
                            className="text-sm sm:text-base"
                          >
                            Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                phone: e.target.value,
                              }))
                            }
                            placeholder="Enter your phone number"
                            className="text-sm sm:text-base"
                          />
                          {fieldErrors.phone && (
                            <p className="text-xs sm:text-sm text-red-600 mt-1">
                              {fieldErrors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm sm:text-base">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          placeholder="Enter your email address"
                          className="text-sm sm:text-base"
                        />
                        {fieldErrors.email && (
                          <p className="text-xs sm:text-sm text-red-600 mt-1">
                            {fieldErrors.email}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="subject"
                          className="text-sm sm:text-base"
                        >
                          Subject *
                        </Label>
                        <Input
                          id="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              subject: e.target.value,
                            }))
                          }
                          placeholder="Enter your subject"
                          className="text-sm sm:text-base"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="priority"
                            className="text-sm sm:text-base"
                          >
                            Priority
                          </Label>
                          <Select
                            value={formData.priority}
                            onValueChange={(value: any) =>
                              setFormData((prev) => ({
                                ...prev,
                                priority: value,
                              }))
                            }
                          >
                            <SelectTrigger className="text-sm sm:text-base">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="LOW">Low</SelectItem>
                              <SelectItem value="MEDIUM">Medium</SelectItem>
                              <SelectItem value="HIGH">High</SelectItem>
                              <SelectItem value="URGENT">Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="category"
                            className="text-sm sm:text-base"
                          >
                            Category
                          </Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value: any) =>
                              setFormData((prev) => ({
                                ...prev,
                                category: value,
                              }))
                            }
                          >
                            <SelectTrigger className="text-sm sm:text-base">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="TECHNICAL">
                                Technical
                              </SelectItem>
                              <SelectItem value="BILLING">Billing</SelectItem>
                              <SelectItem value="SERVICE">Service</SelectItem>
                              <SelectItem value="COMPLAINT">
                                Complaint
                              </SelectItem>
                              <SelectItem value="SUGGESTION">
                                Suggestion
                              </SelectItem>
                              <SelectItem value="FEEDBACK">Feedback</SelectItem>
                              <SelectItem value="OTHER">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="message"
                          className="text-sm sm:text-base"
                        >
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              message: e.target.value,
                            }))
                          }
                          placeholder="Tell us how we can help you..."
                          className="text-sm sm:text-base resize-vertical min-h-[100px]"
                        />
                        {fieldErrors.message && (
                          <p className="text-xs sm:text-sm text-red-600 mt-1">
                            {fieldErrors.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-sm sm:text-base py-2 sm:py-3"
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                        ) : (
                          <Send className="w-4 h-4 mr-2" />
                        )}
                        {isLoading ? "Sending..." : "Send Support Request"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Map & Location Details */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col h-full"
              >
                <Card className="shadow-lg border-0 h-full flex flex-col">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg py-4 sm:py-6">
                    <CardTitle className="text-xl sm:text-2xl">
                      Find Us
                    </CardTitle>
                    <CardDescription className="text-blue-100 text-sm sm:text-base">
                      Visit our service center in Bengaluru
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 sm:pt-6 flex-1 flex flex-col">
                    {/* Live Map */}
                    <div className="rounded-lg overflow-hidden mb-4 sm:mb-6 flex-1 min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]">
                      <LiveMap />
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="font-semibold text-lg flex items-center text-sm sm:text-base lg:text-lg">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                        Our Location
                      </h3>
                      {offices.map((office, index) => (
                        <div
                          key={index}
                          className="border-l-4 border-blue-600 pl-3 sm:pl-4 py-2 bg-blue-50/50 rounded-r-lg"
                        >
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                            {office.city}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 mt-1 leading-relaxed">
                            {office.address}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 mt-2 sm:mt-3">
                            <a
                              href={`tel:${office.phone.replace(/\s/g, "")}`}
                              className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 flex items-center"
                            >
                              <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              {office.phone}
                            </a>
                            <a
                              href={`mailto:${office.email}`}
                              className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 flex items-center"
                            >
                              <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              {office.email}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
