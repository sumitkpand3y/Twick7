"use client";

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
import { Menu, X, User, LogOut, Settings, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleBookService = () => {
    if (user) {
      setModalOpen(true);
    } else {
      setAuthModalOpen(true);
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
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
      <header
        className={`bg-white shadow-md fixed w-full top-0 z-50 transition-all duration-300 overflow-visible ${
          scrolled ? "shadow-lg" : "shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 md:h-18 relative">
            {/* Logo Section - Sticker Style */}
            <Link
              href="/"
              className="flex items-center flex-shrink-0 z-10 relative -ml-2 sm:-ml-3"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center"
              >
                <div className="relative w-44 h-24 mt-10 sm:w-56 sm:h-28 sm:mt-12 md:w-64 md:h-32 md:mt-16 lg:w-72 lg:h-36 lg:mt-20 xl:w-98 xl:h-60 xl:mt-28">
                  <Image
                    src="../images/tweak7Image.png"
                    alt="Tweak7 Logo"
                    fill
                    className="object-contain object-left drop-shadow-lg"
                    sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, (max-width: 1024px) 256px, (max-width: 1280px) 288px, 320px"
                    priority
                  />
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 xl:space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-2 lg:px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-200 font-medium text-sm lg:text-base ${
                    isActive(item.href) ? "text-primary" : ""
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute left-0 bottom-0 w-full h-0.5 bg-primary rounded-full"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
              {/* Quick Enquiry Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => setIsQuickEnquiryOpen(true)}
                  className="text-gray-700 hover:text-primary hover:bg-primary/10 text-sm lg:text-base px-3 lg:px-4"
                >
                  Quick Enquiry
                </Button>
              </motion.div>

              {/* User Menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative h-9 w-9 lg:h-10 lg:w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      <Avatar className="h-9 w-9 lg:h-10 lg:w-10 border-2 border-primary/20 hover:border-primary/40 transition-colors">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start p-3 border-b">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    {/* <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard"
                        className="flex items-center cursor-pointer"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/bookings"
                        className="flex items-center cursor-pointer"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        My Bookings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile"
                        className="flex items-center cursor-pointer"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem> */}
                    <DropdownMenuItem
                      onClick={logout}
                      className="text-red-600 cursor-pointer"
                    >
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
                    className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 text-sm lg:text-base px-4 lg:px-5"
                  >
                    Login
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 -mr-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="md:hidden bg-white overflow-hidden border-t"
              >
                <nav className="flex flex-col py-3">
                  {/* Navigation Links */}
                  <div className="space-y-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`px-4 py-3 font-medium transition-all duration-200 flex items-center text-base ${
                          isActive(item.href)
                            ? "text-primary bg-primary/10 border-l-4 border-primary"
                            : "text-gray-700 hover:text-primary hover:bg-gray-50 active:bg-gray-100"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  {/* Mobile Action Buttons */}
                  <div className="px-4 space-y-3 pt-4 border-t mt-3">
                    <motion.div whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsQuickEnquiryOpen(true);
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-gray-700 border-gray-300 hover:bg-gray-50 text-base py-3 h-auto"
                      >
                        Quick Enquiry
                      </Button>
                    </motion.div>

                    {/* User Section for Mobile */}
                    {user ? (
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center space-x-3 px-3 py-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
                          <Avatar className="h-10 w-10 border-2 border-primary/30">
                            <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                              {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-600 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>

                        <Link
                          href="/dashboard"
                          className="flex items-center px-3 py-3 text-base text-gray-700 hover:bg-gray-50 active:bg-gray-100 rounded-lg transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <User className="mr-3 h-5 w-5 text-gray-500" />
                          <span className="font-medium">Dashboard</span>
                        </Link>

                        <Link
                          href="/bookings"
                          className="flex items-center px-3 py-3 text-base text-gray-700 hover:bg-gray-50 active:bg-gray-100 rounded-lg transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Calendar className="mr-3 h-5 w-5 text-gray-500" />
                          <span className="font-medium">My Bookings</span>
                        </Link>

                        <Link
                          href="/profile"
                          className="flex items-center px-3 py-3 text-base text-gray-700 hover:bg-gray-50 active:bg-gray-100 rounded-lg transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Settings className="mr-3 h-5 w-5 text-gray-500" />
                          <span className="font-medium">Profile</span>
                        </Link>

                        <button
                          onClick={() => {
                            logout();
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full flex items-center px-3 py-3 text-base text-red-600 hover:bg-red-50 active:bg-red-100 rounded-lg transition-colors"
                        >
                          <LogOut className="mr-3 h-5 w-5" />
                          <span className="font-medium">Logout</span>
                        </button>
                      </div>
                    ) : (
                      <motion.div whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setAuthModalOpen(true);
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full border-primary text-primary hover:bg-primary hover:text-white text-base py-3 h-auto font-medium"
                        >
                          Login
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-16 md:h-18"></div>

      <QuickEnquiry
        isOpen={isQuickEnquiryOpen}
        onClose={() => setIsQuickEnquiryOpen(false)}
      />
      <AuthModal />
      <BookingModal />
    </>
  );
}
