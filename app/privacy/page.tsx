// app/privacy/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  Cookie,
  Bell,
  Mail,
  Phone,
  Globe,
} from "lucide-react";
import { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Privacy Policy | Tweak7 Car & Bike Service",
  description:
    "Learn how Tweak7 collects, uses, and protects your personal information. Your privacy matters to us.",
  keywords: [
    "privacy policy",
    "data protection",
    "personal information",
    "Tweak7 privacy",
    "data security",
  ],
};

export default function PrivacyPolicyPage() {
  const effectiveDate = "January 1, 2024";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center mb-4 p-3 rounded-full bg-blue-100 text-blue-700">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            At Tweak7, your privacy is important to us. This Privacy Policy
            explains how we collect, use, store, and protect your personal
            information.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-sm text-blue-700">
            <Lock className="h-4 w-4" />
            Effective Date: {effectiveDate}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Table of Contents Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Contents
              </h2>
              <nav className="space-y-2">
                {[
                  {
                    id: "information-collected",
                    title: "Information We Collect",
                  },
                  {
                    id: "information-use",
                    title: "How We Use Your Information",
                  },
                  { id: "data-protection", title: "How We Protect Your Data" },
                  {
                    id: "information-sharing",
                    title: "Sharing Your Information",
                  },
                  { id: "your-rights", title: "Your Rights" },
                  { id: "cookies-tracking", title: "Cookies & Tracking" },
                  { id: "third-party-links", title: "Third-Party Links" },
                  { id: "children-privacy", title: "Children's Privacy" },
                  { id: "policy-changes", title: "Changes to This Policy" },
                  { id: "contact", title: "Contact Us" },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block py-2 px-3 text-sm rounded-md hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Data Protection Quick Links
                </h3>
                <div className="space-y-2">
                  <Button
                    asChild
                    size="sm"
                    className="w-full justify-start"
                    variant="ghost"
                  >
                    <Link href="/data-request">Data Access Request</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="w-full justify-start"
                    variant="ghost"
                  >
                    <Link href="/opt-out">Opt Out of Marketing</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="w-full justify-start"
                    variant="ghost"
                  >
                    <Link href="/cookie-settings">Cookie Settings</Link>
                  </Button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  Your Data is Secure
                </h3>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>Secure Payment Processing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>Encrypted Data Storage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>Limited Access Control</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <p className="text-lg mb-4">
                  By using Tweak7, you agree to the terms of this Privacy
                  Policy. This policy applies to all services, websites, and
                  mobile platforms operated by Tweak7.
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <Lock className="h-4 w-4" />
                  <span>Your privacy is our priority</span>
                </div>
              </div>

              {/* Section 1: Information We Collect */}
              <section
                id="information-collected"
                className="scroll-mt-24 mb-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <span className="font-bold text-xl">1</span>
                  </div>
                  <h2 className="text-2xl font-bold">Information We Collect</h2>
                </div>

                <div className="space-y-6">
                  <div className="border rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <span className="h-6 w-6 rounded bg-blue-100 text-blue-600 flex items-center justify-center">
                        1.1
                      </span>
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-2">Basic Details</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Name</li>
                          <li>• Contact number</li>
                          <li>• Email address</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-2">
                          Vehicle Information
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• Vehicle make & model</li>
                          <li>• Registration number</li>
                          <li>• Odometer reading</li>
                          <li>• Service history</li>
                          <li>• Vehicle issues</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <span className="h-6 w-6 rounded bg-blue-100 text-blue-600 flex items-center justify-center">
                        1.2
                      </span>
                      Payment Information
                    </h3>
                    <p className="mb-4">
                      Payment details such as UPI ID, card number, or
                      transaction information (processed securely via payment
                      gateways).
                    </p>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-700 flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Payment information is processed through secure,
                        PCI-compliant payment gateways.
                      </p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <span className="h-6 w-6 rounded bg-blue-100 text-blue-600 flex items-center justify-center">
                        1.3
                      </span>
                      Usage Information
                    </h3>
                    <p className="mb-4">
                      Data collected automatically when using our website or
                      app:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="p-3 bg-gray-50 rounded-lg text-center">
                        <div className="text-xs text-gray-500">IP Address</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg text-center">
                        <div className="text-xs text-gray-500">
                          Browser Type
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg text-center">
                        <div className="text-xs text-gray-500">
                          Pages Visited
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg text-center">
                        <div className="text-xs text-gray-500">Device Info</div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <span className="h-6 w-6 rounded bg-blue-100 text-blue-600 flex items-center justify-center">
                        1.4
                      </span>
                      Communication Records
                    </h3>
                    <p>
                      Emails, calls, chats, or messages exchanged with Tweak7
                      for service, updates, or support.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2: How We Use Your Information */}
              <section id="information-use" className="scroll-mt-24 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <span className="font-bold text-xl">2</span>
                  </div>
                  <h2 className="text-2xl font-bold">
                    How We Use Your Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: "📋",
                      title: "Service Management",
                      desc: "To schedule and manage your vehicle service appointments",
                    },
                    {
                      icon: "🔔",
                      title: "Updates & Reminders",
                      desc: "To provide updates, notifications, and service reminders",
                    },
                    {
                      icon: "💳",
                      title: "Payment Processing",
                      desc: "To process payments securely",
                    },
                    {
                      icon: "📸",
                      title: "Service Documentation",
                      desc: "To share photos, videos, or inspection reports",
                    },
                    {
                      icon: "🚀",
                      title: "Service Improvement",
                      desc: "To improve our services, offerings, and customer experience",
                    },
                    {
                      icon: "📢",
                      title: "Communications",
                      desc: "To communicate promotional offers, if you have opted in",
                    },
                    {
                      icon: "⚖️",
                      title: "Legal Compliance",
                      desc: "To comply with legal obligations",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-5 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <h3 className="font-semibold mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 3: How We Protect Your Data */}
              <section id="data-protection" className="scroll-mt-24 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    <span className="font-bold text-xl">3</span>
                  </div>
                  <h2 className="text-2xl font-bold">
                    How We Protect Your Data
                  </h2>
                </div>

                <div className="border rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-5 bg-amber-50 rounded-lg">
                      <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                        <Shield className="h-6 w-6 text-amber-600" />
                      </div>
                      <h3 className="font-semibold mb-2">
                        Multi-Layer Protection
                      </h3>
                      <p className="text-sm">
                        We implement reasonable physical, electronic, and
                        administrative safeguards to protect your personal
                        information.
                      </p>
                    </div>

                    <div className="p-5 bg-green-50 rounded-lg">
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <Lock className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="font-semibold mb-2">
                        Secure Payment Processing
                      </h3>
                      <p className="text-sm">
                        Sensitive data such as payment details are processed via
                        secure, trusted payment gateways.
                      </p>
                    </div>

                    <div className="p-5 bg-blue-50 rounded-lg">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                        <Eye className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Restricted Access</h3>
                      <p className="text-sm">
                        Only authorised personnel have access to your
                        information, and they are bound by confidentiality
                        obligations.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4: Sharing Your Information */}
              <section id="information-sharing" className="scroll-mt-24 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    <span className="font-bold text-xl">4</span>
                  </div>
                  <h2 className="text-2xl font-bold">
                    Sharing Your Information
                  </h2>
                </div>

                <div className="border rounded-lg p-6">
                  <div className="p-4 bg-blue-50 rounded-lg mb-6">
                    <p className="text-blue-700 font-medium">
                      <span className="font-bold">Important:</span> Tweak7 does
                      not sell or rent your personal data to third parties.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">Service Providers</h3>
                      <p>
                        We may share information with service providers or
                        partners assisting in payment processing or vehicle
                        services.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">Legal Requirements</h3>
                      <p>
                        We may share information with legal authorities, if
                        required by law or to protect our rights.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        Insurance Providers
                      </h3>
                      <p>
                        We may share information with insurance providers, only
                        if you request or require insurance-related services.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5: Your Rights */}
              <section id="your-rights" className="scroll-mt-24 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <span className="font-bold text-xl">5</span>
                  </div>
                  <h2 className="text-2xl font-bold">Your Rights</h2>
                </div>

                <div className="border rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="p-5 bg-red-50 rounded-lg">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Access Rights
                      </h3>
                      <p className="text-sm">
                        Access your personal information maintained by Tweak7.
                      </p>
                    </div>

                    <div className="p-5 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <span className="h-5 w-5 flex items-center justify-center">
                          ✏️
                        </span>
                        Correction Rights
                      </h3>
                      <p className="text-sm">
                        Request correction of inaccurate or incomplete data.
                      </p>
                    </div>

                    <div className="p-5 bg-green-50 rounded-lg">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Opt-Out Rights
                      </h3>
                      <p className="text-sm">
                        Opt-out of promotional communications.
                      </p>
                    </div>

                    <div className="p-5 bg-purple-50 rounded-lg">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <span className="h-5 w-5 flex items-center justify-center">
                          🗑️
                        </span>
                        Deletion Rights
                      </h3>
                      <p className="text-sm">
                        Request deletion of your personal information, subject
                        to legal or contractual obligations.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <h3 className="font-semibold mb-2">
                      Exercising Your Rights
                    </h3>
                    <p className="mb-3">
                      To exercise these rights, contact us at{" "}
                      <a
                        href="mailto:support@tweak7garage.com"
                        className="text-blue-600 hover:underline"
                      >
                        support@tweak7garage.com
                      </a>
                    </p>
                    <div className="text-sm text-muted-foreground">
                      We will respond to your request within 30 days as required
                      by applicable law.
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 6: Cookies and Tracking */}
              <section id="cookies-tracking" className="scroll-mt-24 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <span className="font-bold text-xl">6</span>
                  </div>
                  <h2 className="text-2xl font-bold">Cookies and Tracking</h2>
                </div>

                <div className="border rounded-lg p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <Cookie className="h-8 w-8 text-orange-500" />
                    <div>
                      <h3 className="font-semibold mb-2">How We Use Cookies</h3>
                      <p>
                        Our website may use cookies or similar technologies to
                        enhance user experience, track website usage, and
                        provide relevant content.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-medium mb-2">What Cookies Contain</h4>
                      <p className="text-sm">
                        Cookies do not contain personal information unless you
                        voluntarily provide it.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Managing Cookies</h4>
                      <p className="text-sm">
                        You can manage or disable cookies via your browser
                        settings, though some features may not function
                        properly.
                      </p>
                      <Button asChild size="sm" className="mt-3">
                        <Link href="/cookie-settings">
                          Manage Cookie Preferences
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 7: Third-Party Links */}
              <section id="third-party-links" className="scroll-mt-24 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                    <span className="font-bold text-xl">7</span>
                  </div>
                  <h2 className="text-2xl font-bold">Third-Party Links</h2>
                </div>

                <div className="border rounded-lg p-6">
                  <div className="p-4 bg-teal-50 rounded-lg">
                    <h3 className="font-semibold mb-2">External Websites</h3>
                    <p className="mb-3">
                      Our website or app may contain links to third-party
                      websites. Tweak7 is not responsible for the privacy
                      practices or content of these third-party websites.
                    </p>
                    <p className="text-sm text-teal-700 flex items-center gap-2">
                      💡 We encourage you to review their privacy policies when
                      visiting these sites.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 8: Children's Privacy */}
              <section id="children-privacy" className="scroll-mt-24 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                    <span className="font-bold text-xl">8</span>
                  </div>
                  <h2 className="text-2xl font-bold">Children's Privacy</h2>
                </div>

                <div className="border rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                      <h3 className="font-semibold mb-2">Age Restriction</h3>
                      <p>
                        Tweak7 services are intended for individuals 18 years
                        and older.
                      </p>
                    </div>
                    <div className="p-4 bg-pink-50 rounded-lg">
                      <h4 className="font-medium mb-2">
                        No Children's Data Collection
                      </h4>
                      <p className="text-sm">
                        We do not knowingly collect personal information from
                        children under 18.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 9: Changes to This Privacy Policy */}
              <section id="policy-changes" className="scroll-mt-24 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <span className="font-bold text-xl">9</span>
                  </div>
                  <h2 className="text-2xl font-bold">
                    Changes to This Privacy Policy
                  </h2>
                </div>

                <div className="border rounded-lg p-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <h3 className="font-semibold mb-2">Right to Update</h3>
                      <p>
                        Tweak7 reserves the right to update this Privacy Policy
                        at any time.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        Notification of Changes
                      </h3>
                      <p className="mb-2">
                        Updated policies will be posted on{" "}
                        <a
                          href="https://www.tweak7garage.com"
                          className="text-blue-600 hover:underline"
                        >
                          www.tweak7garage.com
                        </a>
                        , with the effective date noted.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        We recommend reviewing this policy periodically for any
                        changes.
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        Acceptance of Changes
                      </h3>
                      <p>
                        Continued use of Tweak7 services constitutes acceptance
                        of the updated policy.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 10: Contact Us */}
              <section id="contact" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">Contact Us</h2>
                </div>

                <div className="border rounded-lg p-6">
                  <p className="mb-6 text-lg">
                    For questions regarding this Privacy Policy or your personal
                    information:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="p-5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold">Email</h3>
                      </div>
                      <a
                        href="mailto:support@tweak7garage.com"
                        className="text-blue-600 hover:text-blue-800 hover:underline break-all"
                      >
                        support@tweak7garage.com
                      </a>
                      <p className="text-sm text-muted-foreground mt-2">
                        For privacy-related inquiries
                      </p>
                    </div>

                    <div className="p-5 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <Phone className="h-5 w-5 text-green-600" />
                        <h3 className="font-semibold">Phone</h3>
                      </div>
                      <a
                        href="tel:+919900519565"
                        className="text-green-600 hover:text-green-800 hover:underline"
                      >
                        +91 99005 19565
                      </a>
                      <p className="text-sm text-muted-foreground mt-2">
                        Mon-Sat, 9 AM - 7 PM
                      </p>
                    </div>

                    <div className="p-5 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <Globe className="h-5 w-5 text-purple-600" />
                        <h3 className="font-semibold">Website</h3>
                      </div>
                      <a
                        href="https://www.tweak7garage.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-800 hover:underline"
                      >
                        www.tweak7garage.com
                      </a>
                      <p className="text-sm text-muted-foreground mt-2">
                        Visit our main website
                      </p>
                    </div>
                  </div>

                  <div className="p-5 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-3">
                      Data Protection Officer
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      For specific data protection concerns or to report a data
                      breach, please contact our Data Protection Officer through
                      the email above.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      We aim to respond to all privacy-related inquiries within
                      48 hours.
                    </p>
                  </div>
                </div>
              </section>

              {/* Consent Box */}
              <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      Your Privacy Matters
                    </h3>
                    <p className="text-muted-foreground">
                      By using Tweak7 services, you acknowledge that you have
                      read, understood, and agree to the collection and use of
                      your information as described in this Privacy Policy.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button asChild variant="outline">
                      <Link href="/terms-conditions">
                        View Terms & Conditions
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link href="/">Back to Home</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Last Updated */}
              <div className="mt-8 text-center text-sm text-muted-foreground">
                <p>Last updated: {effectiveDate}</p>
                <p className="mt-1">Document ID: T7-PP-2024-01</p>
              </div>
            </div>
          </div>
        </div>
      </main>

     <Footer />
    </div>
  );
}
