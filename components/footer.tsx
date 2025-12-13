import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Logo Section - 40% (2 columns out of 5) */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="relative w-48 h-28 sm:w-56 sm:h-32 md:w-64 md:h-36 lg:w-72 lg:h-40 xl:w-80 xl:h-48 mb-6">
                <Image
                  src="/images/tweak7Image.png"
                  alt="Tweak7 Logo"
                  fill
                  className="object-contain object-left drop-shadow-lg"
                  sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, (max-width: 1280px) 288px, 320px"
                  priority
                />
              </div>
            </div>

            {/* Social Media Icons - Made Larger */}
            <div>
              <h3 className="text-base font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/share/1FFb6vmF7E/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label="Facebook"
                >
                  <div className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Facebook className="h-7 w-7 text-white" />
                  </div>
                </a>
                <a
                  href="https://www.instagram.com/tweak7garage?igsh=NjZmNHVxY3VraTZj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label="Instagram"
                >
                  <div className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Instagram className="h-7 w-7 text-white" />
                  </div>
                </a>
                <a
                  href="https://youtube.com/@tweak7garage?si=-x3pa_9eCes0lyGJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label="YouTube"
                >
                  <div className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Youtube className="h-7 w-7 text-white" />
                  </div>
                </a>
                {/* <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label="Twitter"
                >
                  <div className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <Twitter className="h-7 w-7 text-white" />
                  </div>
                </a> */}
              </div>
            </div>
          </div>

          {/* Other Content - 60% (3 columns out of 5) */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-white/20">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-white-900 hover:text-white hover:pl-2 transition-all duration-200 inline-block"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-white-900 hover:text-white hover:pl-2 transition-all duration-200 inline-block"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-white-900 hover:text-white hover:pl-2 transition-all duration-200 inline-block"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-white-900 hover:text-white hover:pl-2 transition-all duration-200 inline-block"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-white-900 hover:text-white hover:pl-2 transition-all duration-200 inline-block"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-white/20">
                Services
              </h3>
              <ul className="space-y-3">
                <li className="text-white-900 text-sm lg:text-base">
                  Basic Service
                </li>
                <li className="text-white-900 text-sm lg:text-base">
                  Standard Service
                </li>
                <li className="text-white-900 text-sm lg:text-base">
                  Comprehensive Service
                </li>
                <li className="text-white-900 text-sm lg:text-base">
                  Battery Replacement
                </li>
                <li className="text-white-900 text-sm lg:text-base">
                  Brake Service
                </li>
                <li className="text-white-900 text-sm lg:text-base">
                  AC Service
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-white/20">
                Contact Info
              </h3>
              <div className="space-y-4">
                <a
                  href="tel:+919876543210"
                  className="flex items-start space-x-3 group hover:bg-white/10 p-2 rounded-lg transition-all duration-200 -ml-2"
                >
                  <Phone className="h-5 w-5 text-white mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-white-900 text-sm lg:text-base group-hover:text-white">
                    +91 9876543210
                  </span>
                </a>
                <a
                  href="mailto:support@tweak7.com"
                  className="flex items-start space-x-3 group hover:bg-white/10 p-2 rounded-lg transition-all duration-200 -ml-2"
                >
                  <Mail className="h-5 w-5 text-white mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-white-900 text-sm lg:text-base group-hover:text-white break-all">
                    support@tweak7.com
                  </span>
                </a>
                <div className="flex items-start space-x-3 p-2 -ml-2">
                  <MapPin className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-white-900 text-sm lg:text-base">
                    Bangalore, Karnataka, India
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-10 lg:mt-12 pt-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white-900 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} Tweak7. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
              <Link
                href="/terms-conditions"
                className="text-white-900 hover:text-white text-sm transition-colors duration-200"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/privacy"
                className="text-white-900 hover:text-white text-sm transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
