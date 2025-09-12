// components/BookingManagement.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Calendar, Eye, Edit, Plus, User, Wrench, Check, ClipboardCheck, FileText } from "lucide-react";
import { mockBookings, STATUS_CONFIG, mechanics } from "@/lib/Admin/data";
import { StatusBadge } from "./StatusBadge";
import { MechanicAssignmentModal } from "./MechanicAssignmentModal";
import { InspectionForm } from "./InspectionForm";
import { QuotationForm } from "./QuotationForm";
import { QuotationApproval } from "./QuotationApproval";
import { WorkProgressForm } from "./WorkProgressForm";
import { InvoiceGenerator } from "./InvoiceGenerator";

export const BookingManagement = () => {
  const [bookings, setBookings] = useState(mockBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isMechanicModalOpen, setIsMechanicModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<"list" | "inspection" | "quotation" | "approval" | "work" | "invoice">("list");

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const assignMechanic = (mechanicId: string) => {
    const mechanic = mechanics.find((m) => m.id === mechanicId);
    if (mechanic && selectedBooking) {
      const updatedBookings = bookings.map((b) =>
        b.id === selectedBooking.id
          ? {
              ...b,
              status: "mechanic_assigned",
              assignedMechanic: mechanic,
              statusHistory: [
                ...b.statusHistory,
                {
                  status: "mechanic_assigned",
                  timestamp: new Date().toISOString(),
                  updatedBy: "Admin",
                },
              ],
            }
          : b
      );
      setBookings(updatedBookings);
      setSelectedBooking(
        updatedBookings.find((b) => b.id === selectedBooking.id)
      );
    }
  };

  const submitInspection = (data: any) => {
    if (selectedBooking) {
      const updatedBookings = bookings.map((b) =>
        b.id === selectedBooking.id
          ? {
              ...b,
              status: "inspection",
              inspection: data,
              statusHistory: [
                ...b.statusHistory,
                {
                  status: "inspection",
                  timestamp: new Date().toISOString(),
                  updatedBy: b.assignedMechanic.name,
                },
              ],
            }
          : b
      );
      setBookings(updatedBookings);
      setSelectedBooking(
        updatedBookings.find((b) => b.id === selectedBooking.id)
      );
      setActiveView("quotation");
    }
  };

  const submitQuotation = (data: any) => {
    if (selectedBooking) {
      const updatedBookings = bookings.map((b) =>
        b.id === selectedBooking.id
          ? {
              ...b,
              status: "quotation_sent",
              quotation: data,
              statusHistory: [
                ...b.statusHistory,
                {
                  status: "quotation_sent",
                  timestamp: new Date().toISOString(),
                  updatedBy: b.assignedMechanic.name,
                },
              ],
            }
          : b
      );
      setBookings(updatedBookings);
      setSelectedBooking(
        updatedBookings.find((b) => b.id === selectedBooking.id)
      );
      setActiveView("approval");
    }
  };

  const approveQuotation = (notes: string) => {
    if (selectedBooking) {
      const updatedBookings = bookings.map((b) =>
        b.id === selectedBooking.id
          ? {
              ...b,
              status: "quotation_approved",
              quotation: {
                ...b.quotation,
                approved: true,
                rejected: false,
                customerNotes: notes,
              },
              statusHistory: [
                ...b.statusHistory,
                {
                  status: "quotation_approved",
                  timestamp: new Date().toISOString(),
                  updatedBy: "Customer",
                },
              ],
            }
          : b
      );
      setBookings(updatedBookings);
      setSelectedBooking(
        updatedBookings.find((b) => b.id === selectedBooking.id)
      );
      setActiveView("work");
    }
  };

  const rejectQuotation = (notes: string) => {
    if (selectedBooking) {
      const updatedBookings = bookings.map((b) =>
        b.id === selectedBooking.id
          ? {
              ...b,
              status: "quotation_rejected",
              quotation: {
                ...b.quotation,
                approved: false,
                rejected: true,
                customerNotes: notes,
              },
              statusHistory: [
                ...b.statusHistory,
                {
                  status: "quotation_rejected",
                  timestamp: new Date().toISOString(),
                  updatedBy: "Customer",
                },
              ],
            }
          : b
      );
      setBookings(updatedBookings);
      setSelectedBooking(
        updatedBookings.find((b) => b.id === selectedBooking.id)
      );
      setActiveView("list");
    }
  };

  const sendNotification = (type: "email" | "whatsapp") => {
    console.log(`Sending ${type} notification to customer`);
    // Implement actual notification logic here
  };

  const submitWorkProgress = (data: any) => {
    if (selectedBooking) {
      const updatedBookings = bookings.map((b) =>
        b.id === selectedBooking.id
          ? {
              ...b,
              status: "work_in_progress",
              workProgress: data,
              statusHistory: [
                ...b.statusHistory,
                {
                  status: "work_in_progress",
                  timestamp: new Date().toISOString(),
                  updatedBy: b.assignedMechanic.name,
                },
              ],
            }
          : b
      );
      setBookings(updatedBookings);
      setSelectedBooking(
        updatedBookings.find((b) => b.id === selectedBooking.id)
      );
      setActiveView("invoice");
    }
  };

  const saveInvoice = (invoiceData: any) => {
    if (selectedBooking) {
      const updatedBookings = bookings.map((b) =>
        b.id === selectedBooking.id
          ? {
              ...b,
              status: "ready_for_delivery",
              invoice: invoiceData,
              statusHistory: [
                ...b.statusHistory,
                {
                  status: "ready_for_delivery",
                  timestamp: new Date().toISOString(),
                  updatedBy: b.assignedMechanic.name,
                },
              ],
            }
          : b
      );
      setBookings(updatedBookings);
      setSelectedBooking(
        updatedBookings.find((b) => b.id === selectedBooking.id)
      );
      setActiveView("list");
    }
  };

  const downloadInvoice = () => {
    console.log("Downloading invoice...");
    // Implement invoice download logic
  };

  const printInvoice = () => {
    console.log("Printing invoice...");
    // Implement invoice print logic
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Booking Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage service bookings with complete workflow
              </p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer, booking number, or plate number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
              >
                <option value="all">All Statuses</option>
                {Object.entries(STATUS_CONFIG).map(([status, config]) => (
                  <option key={status} value={status}>
                    {config.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {activeView === "list" && (
          <div className="space-y-4">
            <AnimatePresence>
              {filteredBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-200"
                >
                  <div className="p-6">
                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                      {/* Main Content */}
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center space-x-3">
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <Calendar className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 text-lg">
                                {booking.bookingNumber}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {new Date(booking.bookingDate).toLocaleDateString()} •{" "}
                                {booking.vehicle.brand} {booking.vehicle.model}
                              </p>
                            </div>
                          </div>
                          <StatusBadge status={booking.status} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-start space-x-3">
                            <User className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="font-medium">{booking.customer.name}</p>
                              <p className="text-sm text-gray-600">
                                {booking.customer.phone}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3">
                            <Wrench className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="font-medium">{booking.serviceType.name}</p>
                              <p className="text-sm text-gray-600">
                                {booking.assignedMechanic
                                  ? `Assigned: ${booking.assignedMechanic.name}`
                                  : "No mechanic assigned"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3">
                            <ClipboardCheck className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="font-medium">
                                {booking.quotation
                                  ? `₹${booking.quotation.totalAmount}`
                                  : "No quotation"}
                              </p>
                              <p className="text-sm text-gray-600">
                                {new Date(booking.serviceDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row xl:flex-col gap-2 min-w-[200px]">
                        {!booking.assignedMechanic && (
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setIsMechanicModalOpen(true);
                            }}
                            className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                          >
                            Assign Mechanic
                          </button>
                        )}

                        {booking.assignedMechanic && !booking.inspection && (
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setActiveView("inspection");
                            }}
                            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Start Inspection
                          </button>
                        )}

                        {booking.inspection && !booking.quotation && (
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setActiveView("quotation");
                            }}
                            className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Create Quotation
                          </button>
                        )}

                        {booking.quotation && !booking.quotation.approved && !booking.quotation.rejected && (
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setActiveView("approval");
                            }}
                            className="flex items-center justify-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Approve Quotation
                          </button>
                        )}

                        {booking.quotation?.approved && !booking.invoice && (
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setActiveView("work");
                            }}
                            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          >
                            <Wrench className="w-4 h-4 mr-2" />
                            Update Work
                          </button>
                        )}

                        {booking.invoice && (
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setActiveView("invoice");
                            }}
                            className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            View Invoice
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            // Implement view details functionality
                          }}
                          className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty State */}
            {filteredBookings.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No bookings found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "No bookings have been created yet"}
                </p>
                {(searchTerm || statusFilter !== "all") && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Mechanic Assignment Modal */}
        <MechanicAssignmentModal
          booking={selectedBooking}
          isOpen={isMechanicModalOpen}
          onClose={() => setIsMechanicModalOpen(false)}
          onAssign={assignMechanic}
        />

        {/* Inspection View */}
        {activeView === "inspection" && selectedBooking && (
          <InspectionForm
            booking={selectedBooking}
            onSubmit={submitInspection}
            onCancel={() => setActiveView("list")}
          />
        )}

        {/* Quotation View */}
        {activeView === "quotation" && selectedBooking && (
          <QuotationForm
            booking={selectedBooking}
            onSubmit={submitQuotation}
            onCancel={() => setActiveView("list")}
          />
        )}

        {/* Quotation Approval View */}
        {activeView === "approval" && selectedBooking && (
          <QuotationApproval
            booking={selectedBooking}
            onApprove={approveQuotation}
            onReject={rejectQuotation}
            onSendNotification={sendNotification}
          />
        )}

        {/* Work Progress View */}
        {activeView === "work" && selectedBooking && (
          <WorkProgressForm
            booking={selectedBooking}
            onSubmit={submitWorkProgress}
            onCancel={() => setActiveView("list")}
          />
        )}

        {/* Invoice Generation View */}
        {activeView === "invoice" && selectedBooking && (
          <InvoiceGenerator
            booking={selectedBooking}
            onSave={saveInvoice}
            onCancel={() => setActiveView("list")}
            onDownload={downloadInvoice}
            onPrint={printInvoice}
          />
        )}
      </div>
    </div>
  );
};