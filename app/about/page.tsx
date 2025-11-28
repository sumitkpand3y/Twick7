"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Users,
  Award,
  Clock,
  Shield,
  Wrench,
  Star,
  CheckCircle,
  X,
  Phone,
  Mail,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { useBookingStore } from "@/store/booking-store";
import { BookingModal } from "@/components/booking-modal/booking-modal";

export default function About() {
  const [selectedTeamMember, setSelectedTeamMember] = useState<any>(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const { setModalOpen } = useBookingStore();

  const features = [
    {
      icon: Users,
      title: "Expert Technicians",
      description:
        "Our skilled professionals have years of experience in automotive repair and maintenance.",
    },
    {
      icon: Award,
      title: "Quality Service",
      description:
        "We use only genuine parts and follow industry best practices for all services.",
    },
    {
      icon: Clock,
      title: "Quick Turnaround",
      description:
        "Efficient service delivery without compromising on quality.",
    },
    {
      icon: Shield,
      title: "Warranty Protection",
      description:
        "All our services come with comprehensive warranty coverage.",
    },
  ];

  const stats = [
    {
      number: "1025+",
      label: "Happy Customers",
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />,
    },
    {
      number: "100+",
      label: "Expert Technicians",
      icon: <Wrench className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />,
    },
    {
      number: "25+",
      label: "Cities Covered",
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />,
    },
    {
      number: "99%",
      label: "Customer Satisfaction",
      icon: <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />,
    },
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600" />,
      title: "Quality Assurance",
      description:
        "We use only genuine parts and follow manufacturer guidelines to ensure the highest quality service.",
    },
    {
      icon: <Clock className="w-8 h-8 sm:w-12 sm:h-12 text-green-600" />,
      title: "Timely Service",
      description:
        "We respect your time and ensure all services are completed within the promised timeframe.",
    },
    {
      icon: <Users className="w-8 h-8 sm:w-12 sm:h-12 text-orange-600" />,
      title: "Expert Team",
      description:
        "Our certified technicians have years of experience and undergo regular training updates.",
    },
    {
      icon: <Award className="w-8 h-8 sm:w-12 sm:h-12 text-purple-600" />,
      title: "Customer First",
      description:
        "Your satisfaction is our priority. We go above and beyond to exceed your expectations.",
    },
  ];

  const team = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "15+ years in automotive industry",
      bio: "Rajesh founded Tweak7 with a vision to revolutionize car servicing in India. With over 15 years of experience in the automotive industry, he leads the company with passion and innovation.",
      email: "rajesh@tweak7.com",
      phone: "+91 98765 43210",
      linkedin: "https://linkedin.com/in/rajeshkumar",
      expertise: [
        "Business Strategy",
        "Automotive Innovation",
        "Customer Experience",
      ],
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Head of Operations",
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Expert in service management",
      bio: "Priya brings 12 years of operations experience to Tweak7. She ensures smooth service delivery across all our locations while maintaining the highest quality standards.",
      email: "priya@tweak7.com",
      phone: "+91 98765 43211",
      linkedin: "https://linkedin.com/in/priyasharma",
      expertise: [
        "Operations Management",
        "Quality Control",
        "Process Optimization",
      ],
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Technical Director",
      image:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Automotive engineering specialist",
      bio: "Amit is our technical expert with a background in automotive engineering. He oversees all technical operations and ensures our technicians are trained with the latest technologies.",
      email: "amit@tweak7.com",
      phone: "+91 98765 43212",
      linkedin: "https://linkedin.com/in/amitpatel",
      expertise: ["Automotive Engineering", "Technical Training", "Innovation"],
    },
  ];

  const openTeamModal = (member: any) => {
    setSelectedTeamMember(member);
    setIsTeamModalOpen(true);
  };

  const closeTeamModal = () => {
    setIsTeamModalOpen(false);
    setSelectedTeamMember(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                About Tweak<span className="text-blue-600">7</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-12 px-4">
                We&apos;re revolutionizing car servicing with professional,
                transparent, and convenient automotive care solutions across
                India.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-4 sm:p-6"
                >
                  <div className="flex justify-center mb-3 sm:mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Our Story
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6">
                  Founded in 2018, Tweak7 began with a simple mission: to make
                  car servicing transparent, convenient, and trustworthy. We
                  recognized that car owners needed a reliable partner who could
                  provide quality service without the traditional hassles of
                  automotive maintenance.
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8">
                  Today, we&apos;ve grown to serve over 50,000 customers across
                  25+ cities, maintaining our commitment to excellence and
                  customer satisfaction.
                </p>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  <span className="text-sm sm:text-base text-gray-700">
                    Trusted by thousands of customers
                  </span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <Image
                  src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Tweak7 Workshop"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Our Values
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center h-full hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group hover:-translate-y-1">
                    <CardHeader className="pb-3">
                      <div className="flex justify-center mb-3 sm:mb-4">
                        {value.icon}
                      </div>
                      <CardTitle className="text-lg sm:text-xl">
                        {value.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm sm:text-base text-gray-600">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Meet Our Team
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                The experts behind Tweak7&apos;s success
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    className="text-center hover:shadow-lg transition-all duration-300 cursor-pointer group border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2"
                    onClick={() => openTeamModal(member)}
                  >
                    <CardHeader className="pb-3">
                      <div className="relative inline-block">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={120}
                          height={120}
                          className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full mx-auto mb-3 sm:mb-4 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 rounded-full bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                      </div>
                      <CardTitle className="text-lg sm:text-xl">
                        {member.name}
                      </CardTitle>
                      <CardDescription className="text-blue-600 font-medium text-sm sm:text-base">
                        {member.role}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm sm:text-base text-gray-600">
                        {member.description}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3 sm:mt-4 text-xs sm:text-sm"
                      >
                        View Profile
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
                Ready to Experience the Tweak7 Difference?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                Join thousands of satisfied customers who trust us with their
                vehicle care.
              </p>
              <Button
                size="lg"
                onClick={() => setModalOpen(true)}
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Book Your Service Now
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Team Member Modal */}
      <AnimatePresence>
        {isTeamModalOpen && selectedTeamMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeTeamModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Header */}
                <div className="relative h-32 sm:h-40 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-2xl">
                  <button
                    onClick={closeTeamModal}
                    className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Content */}
                <div className="px-6 pb-8 -mt-16 sm:-mt-20">
                  {/* Profile Image */}
                  <div className="flex justify-center mb-4">
                    <Image
                      src={selectedTeamMember.image}
                      alt={selectedTeamMember.name}
                      width={160}
                      height={160}
                      className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                  </div>

                  {/* Basic Info */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      {selectedTeamMember.name}
                    </h3>
                    <p className="text-lg sm:text-xl text-blue-600 font-semibold mb-3">
                      {selectedTeamMember.role}
                    </p>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {selectedTeamMember.description}
                    </p>
                  </div>

                  {/* Bio */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      About
                    </h4>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {selectedTeamMember.bio}
                    </p>
                  </div>

                  {/* Expertise */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      Areas of Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTeamMember.expertise.map(
                        (skill: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium"
                          >
                            {skill}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="border-t pt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Contact Information
                    </h4>
                    <div className="space-y-3">
                      <a
                        href={`mailto:${selectedTeamMember.email}`}
                        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
                      >
                        <Mail className="w-5 h-5 mr-3" />
                        <span className="text-sm sm:text-base">
                          {selectedTeamMember.email}
                        </span>
                      </a>
                      <a
                        href={`tel:${selectedTeamMember.phone}`}
                        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
                      >
                        <Phone className="w-5 h-5 mr-3" />
                        <span className="text-sm sm:text-base">
                          {selectedTeamMember.phone}
                        </span>
                      </a>
                      <a
                        href={selectedTeamMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
                      >
                        <Linkedin className="w-5 h-5 mr-3" />
                        <span className="text-sm sm:text-base">
                          LinkedIn Profile
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <BookingModal />
    </div>
  );
}