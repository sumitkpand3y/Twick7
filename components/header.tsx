"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import { useBookingStore } from "@/store/booking-store";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { QuickEnquiry } from "@/components/quick-enquiry";
import { Menu, X, User, LogOut, Settings, Calendar, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { NotificationsPanel } from "./notifications-panel";

export function Header() {
  const { user, logout, setAuthModalOpen } = useAuthStore();
  const { setModalOpen } = useBookingStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuickEnquiryOpen, setIsQuickEnquiryOpen] = useState(false);

  const handleBookService = () => {
    if (user) {
      setModalOpen(true);
    } else {
      setAuthModalOpen(true);
    }
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <>
      <header className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              {/* <div className="bg-primary text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg">
              G
            </div>
            <span className="text-xl font-bold text-primary">Tweak7</span> */}
              <Image
                src="https://tweak7.co.in/mainwebsit/image/logo/logo.png"
                alt="Sumit"
                className=""
                width={120}
                height={110}
              ></Image>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              {user && <NotificationsPanel />}

              <Button
                variant="ghost"
                onClick={() => setIsQuickEnquiryOpen(true)}
                className="text-sm"
              >
                Quick Enquiry
              </Button>

              {/* <Button
              onClick={handleBookService}
              className="bg-primary hover:bg-primary/90 text-white px-4 lg:px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-sm"
            >
              Book Service
            </Button> */}

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        My Bookings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setAuthModalOpen(true)}
                  className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 text-sm"
                >
                  Login
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-white border-t py-4"
            >
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium px-4 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="px-4 space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsQuickEnquiryOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Quick Enquiry
                  </Button>
                  {/* <Button
                  onClick={handleBookService}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  Book Service
                </Button> */}
                  {!user && (
                    <Button
                      variant="outline"
                      onClick={() => setAuthModalOpen(true)}
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      Login
                    </Button>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      <QuickEnquiry
        isOpen={isQuickEnquiryOpen}
        onClose={() => setIsQuickEnquiryOpen(false)}
      />
    </>
  );
}
