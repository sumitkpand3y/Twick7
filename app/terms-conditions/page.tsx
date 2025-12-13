// app/terms/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  FileText,
  Shield,
  AlertCircle,
  Phone,
  Mail,
  Globe,
} from "lucide-react";
import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | Tweak7 Car & Bike Service",
  description:
    "Read Tweak7's Terms & Conditions for service booking, pricing, warranty, refund policy, and customer responsibilities.",
  keywords: [
    "terms and conditions",
    "service agreement",
    "warranty policy",
    "refund policy",
    "car service terms",
  ],
};

export default function TermsAndConditionsPage() {
  const effectiveDate = "January 1, 2024";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center mb-4 p-3 rounded-full bg-blue-100 text-blue-700">
            <FileText className="h-6 w-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Welcome to Tweak7! By booking a service with us or using our
            platform, you agree to the following Terms & Conditions.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm">
            <AlertCircle className="h-4 w-4" />
            Effective Date: {effectiveDate}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Table of Contents Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Contents
              </h2>
              <nav className="space-y-2">
                {[
                  { id: "service-booking", title: "Service Booking" },
                  { id: "pricing-payment", title: "Pricing & Payment" },
                  { id: "parts-warranty", title: "Parts & Warranty" },
                  { id: "refund-policy", title: "Refund Policy" },
                  {
                    id: "customer-responsibilities",
                    title: "Customer Responsibilities",
                  },
                  { id: "liability", title: "Liability" },
                  { id: "photos-updates", title: "Photos & Updates" },
                  { id: "changes-terms", title: "Changes to Terms" },
                  { id: "governing-law", title: "Governing Law" },
                  { id: "contact", title: "Contact Information" },
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
                  <Shield className="h-4 w-4" />
                  Quick Links
                </h3>
                <div className="space-y-2">
                  <Button
                    asChild
                    size="sm"
                    className="w-full justify-start"
                    variant="ghost"
                  >
                    <Link href="/booking">Book Service</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="w-full justify-start"
                    variant="ghost"
                  >
                    <Link href="/warranty">Warranty Info</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="w-full justify-start"
                    variant="ghost"
                  >
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="prose prose-lg max-w-none">
              {/* Section 1: Service Booking & Appointments */}
              <section id="service-booking" className="scroll-mt-24">
                <div className="rounded-xl border-l-4 border-blue-500 bg-white p-6 shadow-sm mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      <span className="font-bold">1</span>
                    </div>
                    <h2 className="text-2xl font-bold">
                      Service Booking & Appointments
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        1.1 Booking Platform
                      </h3>
                      <p>
                        All service requests must be booked via{" "}
                        <a
                          href="https://tweak7garage.com/"
                          className="text-blue-600 hover:underline"
                        >
                          https://tweak7garage.com/
                        </a>{" "}
                        or our authorised contact channels.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        1.2 Service Availability
                      </h3>
                      <p>
                        Service slots are subject to availability and confirmed
                        only after booking.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        1.3 Walk-in Customers
                      </h3>
                      <p>
                        Walk-in customers may be served based on availability,
                        and priority is given to scheduled appointments.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        1.4 Vehicle Information
                      </h3>
                      <p>
                        Customers are responsible for providing accurate vehicle
                        details (make, model, registration, odometer reading,
                        and description of issues).
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: Pricing & Payment */}
              <section id="pricing-payment" className="scroll-mt-24">
                <div className="rounded-xl border-l-4 border-green-500 bg-white p-6 shadow-sm mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                      <span className="font-bold">2</span>
                    </div>
                    <h2 className="text-2xl font-bold">Pricing & Payment</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        2.1 Service Estimates
                      </h3>
                      <p>
                        All service costs will be provided as estimates prior to
                        work. Final charges may vary if additional issues are
                        discovered during inspection.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        2.2 Transparent Pricing
                      </h3>
                      <p>
                        Tweak7 provides transparent pricing; any additional work
                        requires explicit customer approval.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        2.3 Payment Methods
                      </h3>
                      <p>
                        Payments can be made via UPI, credit/debit card, net
                        banking, or cash.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        2.4 Discounts & Offers
                      </h3>
                      <p>
                        Discounts, offers, or promotions are valid only as
                        explicitly stated and cannot be combined unless
                        mentioned.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Parts & Warranty */}
              <section id="parts-warranty" className="scroll-mt-24">
                <div className="rounded-xl border-l-4 border-amber-500 bg-white p-6 shadow-sm mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                      <span className="font-bold">3</span>
                    </div>
                    <h2 className="text-2xl font-bold">Parts & Warranty</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">3.1 Quality Parts</h3>
                      <p>
                        Tweak7 uses genuine or OEM-quality parts for
                        replacements.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        3.2 9-Month Warranty
                      </h3>
                      <p>
                        All parts installed by Tweak7 are covered under a
                        9-month warranty against manufacturing defects or
                        premature failure under normal usage.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        3.3 Warranty Claims
                      </h3>
                      <p>Warranty claims require the original invoice.</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        3.4 Warranty Exclusions
                      </h3>
                      <p>Warranty does not cover:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>
                          Physical damage due to accidents, misuse, or neglect
                        </li>
                        <li>
                          Unauthorized modifications or repairs by third parties
                        </li>
                        <li>Normal wear and tear</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4: Refund Policy */}
              <section id="refund-policy" className="scroll-mt-24">
                <div className="rounded-xl border-l-4 border-red-500 bg-white p-6 shadow-sm mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
                      <span className="font-bold">4</span>
                    </div>
                    <h2 className="text-2xl font-bold">Refund Policy</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        4.1 Refund Scenarios
                      </h3>
                      <p>
                        Refunds are applicable only in the following scenarios:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>
                          Advance payments for service slots that are cancelled
                          by Tweak7 due to unforeseen circumstances.
                        </li>
                        <li>
                          Overcharges or duplicate payments confirmed after
                          billing review.
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">4.2 Refund Process</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          Customers must contact Tweak7 within 7 days of the
                          service date or payment.
                        </li>
                        <li>
                          Refunds will be processed to the original payment
                          method within 7–10 business days.
                        </li>
                        <li>
                          Refunds for cancelled or partially completed services
                          are subject to deduction for any work already
                          performed or parts purchased.
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        4.3 Non-Refundable Items
                      </h3>
                      <p>No refunds are applicable for:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Completed services</li>
                        <li>
                          Services declined by the customer after approval and
                          commencement
                        </li>
                        <li>Consumables or non-returnable parts purchased</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5: Customer Responsibilities */}
              <section id="customer-responsibilities" className="scroll-mt-24">
                <div className="rounded-xl border-l-4 border-purple-500 bg-white p-6 shadow-sm mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                      <span className="font-bold">5</span>
                    </div>
                    <h2 className="text-2xl font-bold">
                      Customer Responsibilities
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        5.1 Accurate Information
                      </h3>
                      <p>
                        Customers must provide accurate and complete information
                        about their vehicle.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        5.2 Approval of Estimates
                      </h3>
                      <p>
                        Customers must approve estimates before work begins.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">5.3 Personal Items</h3>
                      <p>
                        Customers are responsible for removing personal items
                        from the vehicle before service. Tweak7 is not liable
                        for lost items left in the vehicle.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        5.4 Follow Instructions
                      </h3>
                      <p>
                        Customers must follow Tweak7's instructions for warranty
                        claims, service follow-ups, or repairs.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 6: Liability */}
              <section id="liability" className="scroll-mt-24">
                <div className="rounded-xl border-l-4 border-gray-500 bg-white p-6 shadow-sm mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                      <span className="font-bold">6</span>
                    </div>
                    <h2 className="text-2xl font-bold">Liability</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        6.1 Non-Responsibility Scenarios
                      </h3>
                      <p>Tweak7 is not responsible for damages caused by:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>
                          Pre-existing conditions not reported by the customer
                        </li>
                        <li>
                          Acts of nature or accidents occurring after service
                        </li>
                        <li>Unauthorized modifications or misuse</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        6.2 Liability Limitation
                      </h3>
                      <p>
                        Tweak7's liability is limited to the cost of parts or
                        service directly related to the issue.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 7: Use of Photos & Updates */}
              <section id="photos-updates" className="scroll-mt-24">
                <div className="rounded-xl border-l-4 border-indigo-500 bg-white p-6 shadow-sm mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                      <span className="font-bold">7</span>
                    </div>
                    <h2 className="text-2xl font-bold">
                      Use of Photos & Updates
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        7.1 Service Documentation
                      </h3>
                      <p>
                        Tweak7 may take photos and videos of the vehicle for
                        service documentation, updates, and transparency.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        7.2 Customer Access
                      </h3>
                      <p>
                        Customers may request these for review, and Tweak7 will
                        provide them upon request.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 8: Changes to Terms */}
              <section id="changes-terms" className="scroll-mt-24">
                <div className="rounded-xl border-l-4 border-orange-500 bg-white p-6 shadow-sm mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                      <span className="font-bold">8</span>
                    </div>
                    <h2 className="text-2xl font-bold">Changes to Terms</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        8.1 Modification Rights
                      </h3>
                      <p>
                        Tweak7 reserves the right to modify these Terms &
                        Conditions at any time.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        8.2 Acceptance of Updated Terms
                      </h3>
                      <p>
                        Updated terms will be effective immediately upon posting
                        on{" "}
                        <a
                          href="https://tweak7garage.com/"
                          className="text-blue-600 hover:underline"
                        >
                          https://tweak7garage.com/
                        </a>
                        . Continued use of services constitutes acceptance of
                        updated terms.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 9: Governing Law */}
              <section id="governing-law" className="scroll-mt-24">
                <div className="rounded-xl border-l-4 border-teal-500 bg-white p-6 shadow-sm mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                      <span className="font-bold">9</span>
                    </div>
                    <h2 className="text-2xl font-bold">Governing Law</h2>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p>
                      These Terms & Conditions are governed by the laws of
                      India. Any disputes will be subject to the jurisdiction of
                      courts in Bangalore.
                    </p>
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section id="contact" className="scroll-mt-24">
                <div className="rounded-xl border-l-4 border-blue-500 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      <Phone className="h-5 w-5" />
                    </div>
                    <h2 className="text-2xl font-bold">Contact Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold">Email</h3>
                      </div>
                      <a
                        href="mailto:support@tweak7.co.in"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        support@tweak7.co.in
                      </a>
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
                    </div>

                    <div className="p-5 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <Globe className="h-5 w-5 text-purple-600" />
                        <h3 className="font-semibold">Website</h3>
                      </div>
                      <a
                        href="https://tweak7garage.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-800 hover:underline"
                      >
                        https://tweak7garage.com/
                      </a>
                    </div>
                  </div>

                  <div className="mt-8 p-5 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-3">
                      For questions regarding:
                    </h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>These Terms & Conditions</li>
                      <li>Refunds and billing inquiries</li>
                      <li>Warranty claims and service issues</li>
                      <li>Service booking and appointments</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            {/* Acceptance Box */}
            <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">
                    Agreement Acceptance
                  </h3>
                  <p className="text-muted-foreground">
                    By booking our services, you acknowledge that you have read,
                    understood, and agree to be bound by these Terms &
                    Conditions.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button asChild variant="outline">
                    <Link href="/privacy">Privacy & Policy</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/">Back to Home</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>Last updated: {effectiveDate}</p>
              <p className="mt-1">Document ID: T7-TC-2024-01</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
