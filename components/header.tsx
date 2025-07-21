'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { AuthModal } from "./auth-modal";
import { BookingModal } from "./booking-modal/booking-modal";

export function Header() {
  const pathname = usePathname();
  const { user, logout, setAuthModalOpen } = useAuthStore();
  const { setModalOpen } = useBookingStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuickEnquiryOpen, setIsQuickEnquiryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { href: "/services", label: "Services" },
    { href: "/faq", label: "FAQ" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className={`bg-white shadow-md fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="https://tweak7.co.in/mainwebsit/image/logo/logo.png"
                  alt="Sumit"
                  width={120}
                  height={110}
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-1 py-2 text-gray-700 hover:text-primary transition-colors duration-200 font-medium ${isActive(item.href) ? 'text-primary' : ''}`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute left-0 bottom-0 w-full h-0.5 bg-gray-900 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              {user && <NotificationsPanel />}

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => setIsQuickEnquiryOpen(true)}
                  className="text-sm"
                >
                  Quick Enquiry
                </Button>
              </motion.div>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
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
                    </motion.div>
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
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => setAuthModalOpen(true)}
                    className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 text-sm"
                  >
                    Login
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white overflow-hidden"
            >
              <nav className="flex flex-col space-y-2 py-4 border-t">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-3 font-medium transition-colors duration-200 flex items-center ${isActive(item.href) ? 'text-primary bg-primary/10' : 'text-gray-700 hover:text-primary'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {isActive(item.href) && (
                      <motion.span
                        layoutId="mobileActiveIndicator"
                        className="w-1 h-6 bg-primary rounded-full mr-3"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {item.label}
                  </Link>
                ))}
                <div className="px-4 space-y-3 pt-2">
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                  >
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
                  </motion.div>
                  {!user && (
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        onClick={() => setAuthModalOpen(true)}
                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        Login
                      </Button>
                    </motion.div>
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
      <AuthModal/>
      <BookingModal/>
    </>
  );
}