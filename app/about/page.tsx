"use client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function About() {
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
      icon: <Users className="w-8 h-8 text-blue-600" />,
    },
    {
      number: "100+",
      label: "Expert Technicians",
      icon: <Wrench className="w-8 h-8 text-green-600" />,
    },
    {
      number: "25+",
      label: "Cities Covered",
      icon: <Award className="w-8 h-8 text-orange-600" />,
    },
    {
      number: "99%",
      label: "Customer Satisfaction",
      icon: <Star className="w-8 h-8 text-yellow-600" />,
    },
  ];
  const values = [
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: "Quality Assurance",
      description:
        "We use only genuine parts and follow manufacturer guidelines to ensure the highest quality service.",
    },
    {
      icon: <Clock className="w-12 h-12 text-green-600" />,
      title: "Timely Service",
      description:
        "We respect your time and ensure all services are completed within the promised timeframe.",
    },
    {
      icon: <Users className="w-12 h-12 text-orange-600" />,
      title: "Expert Team",
      description:
        "Our certified technicians have years of experience and undergo regular training updates.",
    },
    {
      icon: <Award className="w-12 h-12 text-purple-600" />,
      title: "Customer First",
      description:
        "Your satisfaction is our priority. We go above and beyond to exceed your expectations.",
    },
  ];
  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "15+ years in automotive industry",
    },
    {
      name: "Priya Sharma",
      role: "Head of Operations",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Expert in service management",
    },
    {
      name: "Amit Patel",
      role: "Technical Director",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
      description: "Automotive engineering specialist",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="pt-16">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                About Tweak<span className="text-blue-600">7</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                We&apos;re revolutionizing car servicing with professional,
                transparent, and convenient automotive care solutions across
                India.
              </p>
            </motion.div>
          </div>
        </section>
        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">{stat.icon}</div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Founded in 2018, Tweak7 began with a simple mission: to make
                  car servicing transparent, convenient, and trustworthy. We
                  recognized that car owners needed a reliable partner who could
                  provide quality service without the traditional hassles of
                  automotive maintenance.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  Today, we've grown to serve over 50,000 customers across 25+
                  cities, maintaining our commitment to excellence and customer
                  satisfaction.
                </p>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">
                    Trusted by thousands of customers
                  </span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Image
                  src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Tweak7 Workshop"
                  width={540}
                  height={120}
                  className="rounded-2xl shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>
        {/* Values Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-xl text-gray-600">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex justify-center mb-4">
                        {value.icon}
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600">
                The experts behind Tweak7's success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={240}
                        height={120}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      />
                      <CardTitle className="text-xl">{member.name}</CardTitle>
                      <CardDescription className="text-blue-600 font-medium">
                        {member.role}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{member.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Experience the Tweak7 Difference?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust us with their
                vehicle care.
              </p>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
              >
                Book Your Service Now
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
