"use client";

import { useState } from "react";
import { useContact } from "@/hooks/useContact";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, Wrench, Navigation } from "lucide-react";
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
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Contact() {
  const { submitContact, isLoading, fieldErrors } = useContact();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await submitContact(formData);

    if (success) {
      setFormData({
        name: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
      });
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      title: "Phone",
      details: ["+91 99005 19565", "+91 1800-123-4567"],
      description: "Available 24/7 for emergency support",
      link: "tel:+919900519565",
    },
    {
      icon: <Mail className="w-6 h-6 text-green-600" />,
      title: "Email",
      details: ["info@tweak7.com", "support@tweak7.com"],
      description: "We respond within 2 hours",
      link: "mailto:info@tweak7.com",
    },
    {
      icon: <MapPin className="w-6 h-6 text-orange-600" />,
      title: "Address",
      details: ["446/5/14 6th Cross Road", "Roopena Agrahara, Bengaluru, Karnataka 560068"],
      description: "Visit our main service center",
      link: "https://maps.google.com/?q=12.8975,77.6349",
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-600" />,
      title: "Hours",
      details: ["Mon-Sat: 8:00 AM - 8:00 PM", "Sun: 9:00 AM - 6:00 PM"],
      description: "Extended hours for your convenience",
    },
  ];

  const offices = [
    {
      city: "Bengaluru Headquarters",
      address: "446/5/14 6th Cross Road Roopena Agrahara, Begur Hobli, Silk Board Flyover, Roopena Agrahara, Bommanahalli, Bengaluru, Karnataka 560068",
      phone: "+91 99005 19565",
      email: "info@tweak7.com",
      coordinates: { lat: 12.8975, lng: 77.6349 }
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="pt-14">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center p-2 bg-white/10 backdrop-blur-sm rounded-full mb-4">
                <Wrench className="w-8 h-8 mr-2" />
                <span className="font-semibold">Expert Automotive Care</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Get in <span className="text-yellow-300">Touch</span>
              </h1>
              <p className="text-xl max-w-3xl mx-auto mb-12 text-blue-100">
                Have questions about our services? Need support? We're here to help you with all your automotive care needs.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-white relative">
          <div className="absolute inset-0 bg-grid-blue-100/50 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0.3))]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How Can We Help You?</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Reach out to us through any of these channels and our team will be happy to assist you.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center h-full hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex justify-center mb-4">
                        <div className="p-3 bg-blue-50 rounded-full group-hover:scale-110 transition-transform duration-300">
                          {info.icon}
                        </div>
                      </div>
                      <CardTitle className="text-xl">{info.title}</CardTitle>
                      <CardDescription>{info.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="font-medium text-gray-900 mb-1">
                          {detail}
                        </p>
                      ))}
                      {info.link && (
                        <Button variant="outline" size="sm" className="mt-4" asChild>
                          <a href={info.link} target={info.link.startsWith('http') ? '_blank' : '_self'}>
                            {info.title === 'Address' ? 'Get Directions' : `Contact via ${info.title}`}
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
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Have a question or need a service? Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="shadow-lg border-0">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg">
                    <CardTitle className="text-2xl">Contact Form</CardTitle>
                    <CardDescription className="text-blue-100">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
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
                          />
                        </div>
                        <div>
                          <Label htmlFor="mobile">Phone Number *</Label>
                          <Input
                            id="mobile"
                            type="tel"
                            required
                            value={formData.mobile}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                mobile: e.target.value,
                              }))
                            }
                            placeholder="Enter your phone number"
                          />
                          {fieldErrors.mobile && (
                            <p className="text-sm text-red-600 mt-1">{fieldErrors.mobile}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
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
                        />
                      </div>

                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Select
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, subject: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">
                              General Inquiry
                            </SelectItem>
                            <SelectItem value="booking">
                              Booking Support
                            </SelectItem>
                            <SelectItem value="complaint">Complaint</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                            <SelectItem value="partnership">
                              Partnership
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              message: e.target.value,
                            }))
                          }
                          placeholder="Tell us how we can help you..."
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
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
                        {isLoading ? "Sending..." : "Send Message"}
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
              >
                <Card className="shadow-lg border-0 h-full">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg">
                    <CardTitle className="text-2xl">Find Us</CardTitle>
                    <CardDescription className="text-blue-100">
                      Visit our service center in Bengaluru
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="rounded-lg h-64 mb-6 flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 relative overflow-hidden">
                      <div className="absolute inset-0 bg-grid-blue-300/30 [mask-image:radial-gradient(white,transparent_70%)]"></div>
                      <div className="relative z-10 text-center p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                        <MapPin className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                        <p className="font-medium">Tweak7 Service Center</p>
                        <p className="text-sm text-gray-600 max-w-xs">
                          446/5/14 6th Cross Road, Roopena Agrahara, Bengaluru
                        </p>
                        <Button size="sm" className="mt-3" asChild>
                          <a 
                            href="https://maps.google.com/?q=12.8975,77.6349" 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Navigation className="w-4 h-4 mr-1" />
                            Open in Maps
                          </a>
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                        Our Location
                      </h3>
                      {offices.map((office, index) => (
                        <div
                          key={index}
                          className="border-l-4 border-blue-600 pl-4 py-2 bg-blue-50/50 rounded-r-lg"
                        >
                          <h4 className="font-semibold text-gray-900">
                            {office.city}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2 mt-1">
                            {office.address}
                          </p>
                          <div className="flex flex-wrap gap-3 mt-3">
                            <a 
                              href={`tel:${office.phone.replace(/\s/g, '')}`} 
                              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                            >
                              <Phone className="w-4 h-4 mr-1" />
                              {office.phone}
                            </a>
                            <a 
                              href={`mailto:${office.email}`} 
                              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                            >
                              <Mail className="w-4 h-4 mr-1" />
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