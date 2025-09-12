'use client'
import React, { useState, useEffect } from 'react';
import { 
  User, Car, Wrench, Clock, DollarSign, CheckCircle, AlertCircle, 
  Send, Mail, MessageSquare, FileText, Plus, Edit, Eye, Phone, 
  CheckSquare, XCircle, Receipt, Star, Calendar, Package,
  Zap, Settings, AlertTriangle, ThumbsUp, ThumbsDown
} from 'lucide-react';

// Mock Data (data.json equivalent)
const mockData = {
  bookings: [
    {
      id: 'BK001',
      customerName: 'John Doe',
      phone: '+91 9876543210',
      email: 'john@example.com',
      vehicleModel: 'Honda City 2020',
      vehicleNumber: 'DL-01-AA-1234',
      bookingDate: '2024-08-11',
      status: 'pending_assignment',
      description: 'Engine making noise, brake issues',
      mechanicId: null,
      inspection: null,
      quotation: null,
      workProgress: null,
      customerApproval: null,
      invoice: null,
      notifications: []
    },
    {
      id: 'BK002',
      customerName: 'Sarah Smith',
      phone: '+91 9876543211',
      email: 'sarah@example.com',
      vehicleModel: 'Toyota Innova 2019',
      vehicleNumber: 'DL-02-BB-5678',
      bookingDate: '2024-08-10',
      status: 'inspection_completed',
      description: 'AC not working, suspension noise',
      mechanicId: 'M001',
      inspection: {
        id: 'INS001',
        mechanicId: 'M001',
        date: '2024-08-11',
        issues: [
          {
            category: 'AC System',
            problem: 'Compressor not working',
            severity: 'high',
            partsNeeded: [{ name: 'AC Compressor', partCode: 'AC001', cost: 15000 }],
            laborHours: 4,
            laborRate: 500
          },
          {
            category: 'Suspension',
            problem: 'Front shock absorber worn out',
            severity: 'medium',
            partsNeeded: [{ name: 'Front Shock Absorber', partCode: 'SUS001', cost: 3500 }],
            laborHours: 2,
            laborRate: 500
          }
        ],
        additionalNotes: 'Vehicle needs immediate attention for AC and suspension issues',
        totalEstimatedCost: 20000,
        estimatedDays: 2
      },
      quotation: null,
      workProgress: null,
      customerApproval: null,
      invoice: null,
      notifications: []
    }
  ],
  mechanics: [
    {
      id: 'M001',
      name: 'Raj Kumar',
      specialization: 'Engine & AC Expert',
      rating: 4.8,
      experience: 8,
      phone: '+91 9876501234',
      isAvailable: true,
      currentJobs: 2
    },
    {
      id: 'M002',
      name: 'Amit Singh',
      specialization: 'Brake & Suspension',
      rating: 4.6,
      experience: 6,
      phone: '+91 9876501235',
      isAvailable: true,
      currentJobs: 1
    },
    {
      id: 'M003',
      name: 'Suresh Patel',
      specialization: 'All-rounder',
      rating: 4.7,
      experience: 10,
      phone: '+91 9876501236',
      isAvailable: false,
      currentJobs: 3
    }
  ],
  parts: [
    { id: 'AC001', name: 'AC Compressor', category: 'AC System', cost: 15000, stock: 5 },
    { id: 'SUS001', name: 'Front Shock Absorber', category: 'Suspension', cost: 3500, stock: 8 },
    { id: 'BR001', name: 'Brake Pad Set', category: 'Brakes', cost: 2500, stock: 12 },
    { id: 'ENG001', name: 'Engine Oil Filter', category: 'Engine', cost: 500, stock: 20 }
  ],
  workStatuses: [
    'pending_assignment',
    'assigned',
    'inspection_in_progress',
    'inspection_completed',
    'quotation_sent',
    'approved',
    'rejected',
    'work_in_progress',
    'waiting_for_parts',
    'work_completed',
    'invoiced',
    'payment_completed'
  ]
};

// Custom Hooks
const useBookings = () => {
  const [bookings, setBookings] = useState(mockData.bookings);
  const [loading, setLoading] = useState(false);

  const updateBooking = (bookingId, updates) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId ? { ...booking, ...updates } : booking
    ));
  };

  return { bookings, setBookings, updateBooking, loading };
};

const useMechanics = () => {
  const [mechanics] = useState(mockData.mechanics);
  return { mechanics };
};

const useParts = () => {
  const [parts] = useState(mockData.parts);
  return { parts };
};

// Services
const NotificationService = {
  sendEmail: async (to, subject, content) => {
    console.log('Sending Email:', { to, subject, content });
    return Promise.resolve({ success: true, messageId: Date.now() });
  },

  sendWhatsApp: async (phone, message) => {
    console.log('Sending WhatsApp:', { phone, message });
    return Promise.resolve({ success: true, messageId: Date.now() });
  },

  sendNotification: async (booking, type, data) => {
    const templates = {
      mechanic_assigned: `Your vehicle ${booking.vehicleNumber} has been assigned to mechanic ${data.mechanicName}. Work will begin shortly.`,
      inspection_completed: `Inspection completed for ${booking.vehicleNumber}. Quotation will be sent shortly.`,
      quotation_sent: `Quotation sent for ${booking.vehicleNumber}. Total estimated cost: ₹${data.totalCost}`,
      work_started: `Work has started on your vehicle ${booking.vehicleNumber}.`,
      work_completed: `Work completed on your vehicle ${booking.vehicleNumber}. Please collect your vehicle.`,
      invoice_generated: `Invoice generated for ${booking.vehicleNumber}. Total amount: ₹${data.totalAmount}`
    };

    const message = templates[type] || 'Status update for your booking';
    
    await Promise.all([
      this.sendEmail(booking.email, `Booking Update - ${booking.id}`, message),
      this.sendWhatsApp(booking.phone, message)
    ]);
  }
};

// Utility Functions
const getStatusColor = (status) => {
  const colors = {
    'pending_assignment': 'bg-yellow-100 text-yellow-800',
    'assigned': 'bg-blue-100 text-blue-800',
    'inspection_in_progress': 'bg-orange-100 text-orange-800',
    'inspection_completed': 'bg-purple-100 text-purple-800',
    'quotation_sent': 'bg-indigo-100 text-indigo-800',
    'approved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800',
    'work_in_progress': 'bg-blue-100 text-blue-800',
    'waiting_for_parts': 'bg-yellow-100 text-yellow-800',
    'work_completed': 'bg-green-100 text-green-800',
    'invoiced': 'bg-gray-100 text-gray-800',
    'payment_completed': 'bg-emerald-100 text-emerald-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

const getStatusText = (status) => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};

// Components
const BookingManagementSystem = () => {
  const { bookings, updateBooking } = useBookings();
  const { mechanics } = useMechanics();
  const { parts } = useParts();
  
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentView, setCurrentView] = useState('list');

  // Mechanic Assignment Component
  const MechanicAssignment = ({ booking, onAssign, onClose }) => {
    const [selectedMechanic, setSelectedMechanic] = useState('');

    const handleAssign = async () => {
      if (!selectedMechanic) return;
      
      const mechanic = mechanics.find(m => m.id === selectedMechanic);
      const updates = {
        mechanicId: selectedMechanic,
        status: 'assigned'
      };
      
      onAssign(booking.id, updates);
      await NotificationService.sendNotification(booking, 'mechanic_assigned', {
        mechanicName: mechanic.name
      });
      
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Assign Mechanic</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Mechanic
              </label>
              <select
                value={selectedMechanic}
                onChange={(e) => setSelectedMechanic(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Choose a mechanic...</option>
                {mechanics.filter(m => m.isAvailable).map(mechanic => (
                  <option key={mechanic.id} value={mechanic.id}>
                    {mechanic.name} - {mechanic.specialization} (★{mechanic.rating})
                  </option>
                ))}
              </select>
            </div>
            
            {selectedMechanic && (
              <div className="bg-gray-50 p-3 rounded-lg">
                {(() => {
                  const mechanic = mechanics.find(m => m.id === selectedMechanic);
                  return (
                    <div className="text-sm">
                      <p><strong>Experience:</strong> {mechanic.experience} years</p>
                      <p><strong>Current Jobs:</strong> {mechanic.currentJobs}</p>
                      <p><strong>Phone:</strong> {mechanic.phone}</p>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleAssign}
              disabled={!selectedMechanic}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Assign Mechanic
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Inspection Form Component
  const InspectionForm = ({ booking, onSubmit, onClose }) => {
    const [inspectionData, setInspectionData] = useState({
      issues: [
        {
          category: '',
          problem: '',
          severity: 'medium',
          partsNeeded: [],
          laborHours: 1,
          laborRate: 500
        }
      ],
      additionalNotes: '',
      estimatedDays: 1
    });

    const addIssue = () => {
      setInspectionData(prev => ({
        ...prev,
        issues: [...prev.issues, {
          category: '',
          problem: '',
          severity: 'medium',
          partsNeeded: [],
          laborHours: 1,
          laborRate: 500
        }]
      }));
    };

    const updateIssue = (index, field, value) => {
      setInspectionData(prev => ({
        ...prev,
        issues: prev.issues.map((issue, i) => 
          i === index ? { ...issue, [field]: value } : issue
        )
      }));
    };

    const addPartToIssue = (issueIndex, part) => {
      setInspectionData(prev => ({
        ...prev,
        issues: prev.issues.map((issue, i) => 
          i === issueIndex ? {
            ...issue,
            partsNeeded: [...issue.partsNeeded, { ...part, quantity: 1 }]
          } : issue
        )
      }));
    };

    const calculateTotalCost = () => {
      return inspectionData.issues.reduce((total, issue) => {
        const partsCost = issue.partsNeeded.reduce((sum, part) => sum + (part.cost * (part.quantity || 1)), 0);
        const laborCost = issue.laborHours * issue.laborRate;
        return total + partsCost + laborCost;
      }, 0);
    };

    const handleSubmit = async () => {
      const inspection = {
        id: `INS${Date.now()}`,
        mechanicId: booking.mechanicId,
        date: new Date().toISOString().split('T')[0],
        ...inspectionData,
        totalEstimatedCost: calculateTotalCost()
      };

      const updates = {
        inspection,
        status: 'inspection_completed'
      };

      onSubmit(booking.id, updates);
      await NotificationService.sendNotification(booking, 'inspection_completed');
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
        <div className="bg-white rounded-lg p-6 w-full max-w-4xl m-4 max-h-[90vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Vehicle Inspection Report</h3>
          
          <div className="space-y-6">
            {inspectionData.issues.map((issue, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium mb-3">Issue #{index + 1}</h4>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={issue.category}
                      onChange={(e) => updateIssue(index, 'category', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="">Select category...</option>
                      <option value="Engine">Engine</option>
                      <option value="Brakes">Brakes</option>
                      <option value="Suspension">Suspension</option>
                      <option value="AC System">AC System</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Transmission">Transmission</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                    <select
                      value={issue.severity}
                      onChange={(e) => updateIssue(index, 'severity', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Problem Description</label>
                  <textarea
                    value={issue.problem}
                    onChange={(e) => updateIssue(index, 'problem', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="2"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Labor Hours</label>
                    <input
                      type="number"
                      value={issue.laborHours}
                      onChange={(e) => updateIssue(index, 'laborHours', parseInt(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Labor Rate (₹/hour)</label>
                    <input
                      type="number"
                      value={issue.laborRate}
                      onChange={(e) => updateIssue(index, 'laborRate', parseInt(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded"
                      min="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Add Parts</label>
                    <select
                      onChange={(e) => {
                        const part = parts.find(p => p.id === e.target.value);
                        if (part) addPartToIssue(index, part);
                        e.target.value = '';
                      }}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="">Select part...</option>
                      {parts.map(part => (
                        <option key={part.id} value={part.id}>
                          {part.name} - ₹{part.cost}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {issue.partsNeeded.length > 0 && (
                  <div className="mb-4">
                    <h5 className="font-medium mb-2">Parts Required:</h5>
                    <div className="space-y-2">
                      {issue.partsNeeded.map((part, partIndex) => (
                        <div key={partIndex} className="flex items-center gap-4 bg-gray-50 p-2 rounded">
                          <span className="flex-1">{part.name}</span>
                          <input
                            type="number"
                            value={part.quantity || 1}
                            onChange={(e) => {
                              const updatedParts = issue.partsNeeded.map((p, pi) =>
                                pi === partIndex ? { ...p, quantity: parseInt(e.target.value) } : p
                              );
                              updateIssue(index, 'partsNeeded', updatedParts);
                            }}
                            className="w-16 p-1 border border-gray-300 rounded"
                            min="1"
                          />
                          <span>₹{part.cost * (part.quantity || 1)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={addIssue}
              className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
            >
              + Add Another Issue
            </button>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Days</label>
                <input
                  type="number"
                  value={inspectionData.estimatedDays}
                  onChange={(e) => setInspectionData(prev => ({
                    ...prev,
                    estimatedDays: parseInt(e.target.value)
                  }))}
                  className="w-full p-2 border border-gray-300 rounded"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Estimated Cost</label>
                <div className="w-full p-2 bg-gray-100 border border-gray-300 rounded font-semibold">
                  {formatCurrency(calculateTotalCost())}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
              <textarea
                value={inspectionData.additionalNotes}
                onChange={(e) => setInspectionData(prev => ({
                  ...prev,
                  additionalNotes: e.target.value
                }))}
                className="w-full p-2 border border-gray-300 rounded"
                rows="3"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Submit Inspection Report
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Quotation Generator Component
  const QuotationGenerator = ({ booking, onGenerate, onClose }) => {
    if (!booking.inspection) return null;

    const generateQuotation = async () => {
      const quotation = {
        id: `QUO${Date.now()}`,
        bookingId: booking.id,
        date: new Date().toISOString().split('T')[0],
        items: booking.inspection.issues.map(issue => ({
          category: issue.category,
          description: issue.problem,
          parts: issue.partsNeeded,
          laborHours: issue.laborHours,
          laborRate: issue.laborRate,
          subtotal: issue.partsNeeded.reduce((sum, part) => sum + (part.cost * (part.quantity || 1)), 0) + (issue.laborHours * issue.laborRate)
        })),
        subtotal: booking.inspection.totalEstimatedCost,
        tax: booking.inspection.totalEstimatedCost * 0.18, // 18% GST
        total: booking.inspection.totalEstimatedCost * 1.18,
        estimatedDays: booking.inspection.estimatedDays,
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 7 days
      };

      const updates = {
        quotation,
        status: 'quotation_sent'
      };

      onGenerate(booking.id, updates);
      await NotificationService.sendNotification(booking, 'quotation_sent', {
        totalCost: quotation.total
      });
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
        <div className="bg-white rounded-lg p-6 w-full max-w-4xl m-4 max-h-[90vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Generate Quotation</h3>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Customer Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p><strong>Name:</strong> {booking.customerName}</p>
                <p><strong>Phone:</strong> {booking.phone}</p>
                <p><strong>Vehicle:</strong> {booking.vehicleModel} - {booking.vehicleNumber}</p>
                <p><strong>Booking Date:</strong> {booking.bookingDate}</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Inspection Summary</h4>
              <div className="space-y-4">
                {booking.inspection.issues.map((issue, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium">{issue.category}</h5>
                      <span className={`px-2 py-1 rounded text-xs ${
                        issue.severity === 'critical' ? 'bg-red-100 text-red-800' :
                        issue.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                        issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {issue.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{issue.problem}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="font-medium text-sm mb-2">Parts Required:</h6>
                        {issue.partsNeeded.map((part, partIndex) => (
                          <div key={partIndex} className="flex justify-between text-sm">
                            <span>{part.name} × {part.quantity || 1}</span>
                            <span>{formatCurrency(part.cost * (part.quantity || 1))}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <h6 className="font-medium text-sm mb-2">Labor:</h6>
                        <div className="flex justify-between text-sm">
                          <span>{issue.laborHours} hours × {formatCurrency(issue.laborRate)}</span>
                          <span>{formatCurrency(issue.laborHours * issue.laborRate)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between font-medium">
                        <span>Subtotal:</span>
                        <span>{formatCurrency(
                          issue.partsNeeded.reduce((sum, part) => sum + (part.cost * (part.quantity || 1)), 0) + 
                          (issue.laborHours * issue.laborRate)
                        )}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3">Quotation Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(booking.inspection.totalEstimatedCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%):</span>
                  <span>{formatCurrency(booking.inspection.totalEstimatedCost * 0.18)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                  <span>Total Amount:</span>
                  <span>{formatCurrency(booking.inspection.totalEstimatedCost * 1.18)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Estimated Completion:</span>
                  <span>{booking.inspection.estimatedDays} days</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={generateQuotation}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Generate & Send Quotation
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Customer Approval Component
  const CustomerApproval = ({ booking, onApprove, onReject }) => {
    const [rejectionReason, setRejectionReason] = useState('');
    const [showRejectForm, setShowRejectForm] = useState(false);

    const handleApprove = async () => {
      const updates = {
        customerApproval: {
          status: 'approved',
          date: new Date().toISOString(),
          approvedItems: booking.quotation.items
        },
        status: 'approved'
      };
      
      onApprove(booking.id, updates);
      await NotificationService.sendNotification(booking, 'work_started');
    };

    const handleReject = async () => {
      const updates = {
        customerApproval: {
          status: 'rejected',
          date: new Date().toISOString(),
          reason: rejectionReason
        },
        status: 'rejected'
      };
      
      onReject(booking.id, updates);
      setShowRejectForm(false);
    };

    if (!booking.quotation) return null;

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Customer Approval Required</h3>
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
            Waiting for Approval
          </span>
        </div>
        
        <div className="mb-6">
          <h4 className="font-medium mb-2">Quotation Details</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span>Total Amount:</span>
              <span className="text-lg font-semibold">{formatCurrency(booking.quotation.total)}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Estimated Time:</span>
              <span>{booking.quotation.estimatedDays} days</span>
            </div>
          </div>
        </div>

        {!showRejectForm ? (
          <div className="flex gap-3">
            <button
              onClick={handleApprove}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <ThumbsUp size={16} />
              Approve Work
            </button>
            <button
              onClick={() => setShowRejectForm(true)}
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
            >
              <ThumbsDown size={16} />
              Reject
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rejection Reason
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows="3"
                placeholder="Please provide a reason for rejection..."
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleReject}
                disabled={!rejectionReason.trim()}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                Confirm Rejection
              </button>
              <button
                onClick={() => setShowRejectForm(false)}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Work Progress Tracker Component
  const WorkProgressTracker = ({ booking, onUpdateProgress, onAddExpense }) => {
    const [newStatus, setNewStatus] = useState(booking.status);
    const [progressNote, setProgressNote] = useState('');
    const [showAddExpense, setShowAddExpense] = useState(false);
    const [expenseData, setExpenseData] = useState({
      type: 'part',
      description: '',
      amount: '',
      quantity: 1
    });

    const workStatuses = [
      { value: 'approved', label: 'Work Approved' },
      { value: 'work_in_progress', label: 'Work in Progress' },
      { value: 'waiting_for_parts', label: 'Waiting for Parts' },
      { value: 'work_completed', label: 'Work Completed' },
      { value: 'ready_for_delivery', label: 'Ready for Delivery' }
    ];

    const handleStatusUpdate = async () => {
      const progressUpdate = {
        date: new Date().toISOString(),
        status: newStatus,
        note: progressNote,
        updatedBy: 'Admin' // In real app, get from auth context
      };

      const currentProgress = booking.workProgress || [];
      const updates = {
        status: newStatus,
        workProgress: [...currentProgress, progressUpdate]
      };

      onUpdateProgress(booking.id, updates);
      
      // Send notification based on status
      const notificationTypes = {
        'work_in_progress': 'work_started',
        'work_completed': 'work_completed'
      };
      
      if (notificationTypes[newStatus]) {
        await NotificationService.sendNotification(booking, notificationTypes[newStatus]);
      }
      
      setProgressNote('');
    };

    const handleAddExpense = () => {
      const expense = {
        id: `EXP${Date.now()}`,
        ...expenseData,
        amount: parseFloat(expenseData.amount),
        date: new Date().toISOString(),
        addedBy: 'Admin'
      };

      const currentExpenses = booking.additionalExpenses || [];
      const updates = {
        additionalExpenses: [...currentExpenses, expense]
      };

      onAddExpense(booking.id, updates);
      setShowAddExpense(false);
      setExpenseData({
        type: 'part',
        description: '',
        amount: '',
        quantity: 1
      });
    };

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Work Progress</h3>
        
        {/* Current Status */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium">Current Status:</span>
            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>
              {getStatusText(booking.status)}
            </span>
          </div>
        </div>

        {/* Progress History */}
        {booking.workProgress && booking.workProgress.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium mb-3">Progress History</h4>
            <div className="space-y-3">
              {booking.workProgress.map((progress, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium">{getStatusText(progress.status)}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(progress.date).toLocaleDateString()}
                    </span>
                  </div>
                  {progress.note && (
                    <p className="text-sm text-gray-600">{progress.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Update Status */}
        {booking.status !== 'work_completed' && (
          <div className="mb-6">
            <h4 className="font-medium mb-3">Update Progress</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  {workStatuses.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Progress Note
                </label>
                <textarea
                  value={progressNote}
                  onChange={(e) => setProgressNote(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows="2"
                  placeholder="Add any notes about the progress..."
                />
              </div>
              <button
                onClick={handleStatusUpdate}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Update Status
              </button>
            </div>
          </div>
        )}

        {/* Additional Expenses */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium">Additional Expenses</h4>
            <button
              onClick={() => setShowAddExpense(true)}
              className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <Plus size={16} />
              Add Expense
            </button>
          </div>
          
          {booking.additionalExpenses && booking.additionalExpenses.length > 0 ? (
            <div className="space-y-2">
              {booking.additionalExpenses.map((expense, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                  <div>
                    <span className="font-medium">{expense.description}</span>
                    <span className="text-sm text-gray-500 ml-2">({expense.type})</span>
                  </div>
                  <span className="font-medium">{formatCurrency(expense.amount * expense.quantity)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No additional expenses</p>
          )}
        </div>

        {/* Add Expense Modal */}
        {showAddExpense && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Add Additional Expense</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={expenseData.type}
                    onChange={(e) => setExpenseData({...expenseData, type: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="part">Additional Part</option>
                    <option value="labor">Extra Labor</option>
                    <option value="service">Additional Service</option>
                    <option value="misc">Miscellaneous</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={expenseData.description}
                    onChange={(e) => setExpenseData({...expenseData, description: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Describe the expense..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                    <input
                      type="number"
                      value={expenseData.quantity}
                      onChange={(e) => setExpenseData({...expenseData, quantity: parseInt(e.target.value)})}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                    <input
                      type="number"
                      value={expenseData.amount}
                      onChange={(e) => setExpenseData({...expenseData, amount: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAddExpense}
                  disabled={!expenseData.description || !expenseData.amount}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  Add Expense
                </button>
                <button
                  onClick={() => setShowAddExpense(false)}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Invoice Generator Component
  const InvoiceGenerator = ({ booking, onGenerateInvoice }) => {
    const [invoiceData, setInvoiceData] = useState(null);

    useEffect(() => {
      if (booking.quotation) {
        calculateInvoice();
      }
    }, [booking]);

    const calculateInvoice = () => {
      const quotationTotal = booking.quotation.subtotal;
      const additionalExpensesTotal = booking.additionalExpenses?.reduce((sum, exp) => 
        sum + (exp.amount * exp.quantity), 0) || 0;
      
      const subtotal = quotationTotal + additionalExpensesTotal;
      const tax = subtotal * 0.18; // 18% GST
      const total = subtotal + tax;

      setInvoiceData({
        id: `INV${Date.now()}`,
        bookingId: booking.id,
        date: new Date().toISOString().split('T')[0],
        quotationAmount: quotationTotal,
        additionalExpenses: additionalExpensesTotal,
        subtotal,
        tax,
        total,
        items: [
          ...booking.quotation.items,
          ...(booking.additionalExpenses || []).map(exp => ({
            type: 'additional',
            description: exp.description,
            category: exp.type,
            quantity: exp.quantity,
            rate: exp.amount,
            amount: exp.amount * exp.quantity
          }))
        ]
      });
    };

    const generateInvoice = async () => {
      const updates = {
        invoice: invoiceData,
        status: 'invoiced'
      };
      
      onGenerateInvoice(booking.id, updates);
      await NotificationService.sendNotification(booking, 'invoice_generated', {
        totalAmount: invoiceData.total
      });
    };

    if (!invoiceData) return null;

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Generate Invoice</h3>
          <span className="text-sm text-gray-500">Invoice #{invoiceData.id}</span>
        </div>

        {/* Invoice Preview */}
        <div className="border border-gray-200 rounded-lg p-6 mb-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">INVOICE</h2>
            <p className="text-gray-600">Auto Repair Shop</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold mb-2">Bill To:</h4>
              <p>{booking.customerName}</p>
              <p>{booking.phone}</p>
              <p>{booking.email}</p>
            </div>
            <div className="text-right">
              <p><strong>Invoice Date:</strong> {invoiceData.date}</p>
              <p><strong>Booking ID:</strong> {booking.id}</p>
              <p><strong>Vehicle:</strong> {booking.vehicleModel}</p>
              <p><strong>Reg. No:</strong> {booking.vehicleNumber}</p>
            </div>
          </div>

          <table className="w-full mb-6">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2">Description</th>
                <th className="text-center py-2">Qty</th>
                <th className="text-right py-2">Rate</th>
                <th className="text-right py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {booking.quotation.items.map((item, index) => (
                <React.Fragment key={index}>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 font-medium">{item.category} - {item.description}</td>
                    <td className="text-center py-2">-</td>
                    <td className="text-right py-2">-</td>
                    <td className="text-right py-2">{formatCurrency(item.subtotal)}</td>
                  </tr>
                  {item.parts.map((part, partIndex) => (
                    <tr key={partIndex} className="text-sm text-gray-600">
                      <td className="py-1 pl-4">• {part.name}</td>
                      <td className="text-center py-1">{part.quantity || 1}</td>
                      <td className="text-right py-1">{formatCurrency(part.cost)}</td>
                      <td className="text-right py-1">{formatCurrency(part.cost * (part.quantity || 1))}</td>
                    </tr>
                  ))}
                  <tr className="text-sm text-gray-600">
                    <td className="py-1 pl-4">• Labor ({item.laborHours} hrs)</td>
                    <td className="text-center py-1">{item.laborHours}</td>
                    <td className="text-right py-1">{formatCurrency(item.laborRate)}</td>
                    <td className="text-right py-1">{formatCurrency(item.laborHours * item.laborRate)}</td>
                  </tr>
                </React.Fragment>
              ))}
              
              {booking.additionalExpenses?.map((expense, index) => (
                <tr key={`exp-${index}`} className="border-b border-gray-100">
                  <td className="py-2">{expense.description} ({expense.type})</td>
                  <td className="text-center py-2">{expense.quantity}</td>
                  <td className="text-right py-2">{formatCurrency(expense.amount)}</td>
                  <td className="text-right py-2">{formatCurrency(expense.amount * expense.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between py-2">
                <span>Subtotal:</span>
                <span>{formatCurrency(invoiceData.subtotal)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>GST (18%):</span>
                <span>{formatCurrency(invoiceData.tax)}</span>
              </div>
              <div className="flex justify-between py-2 text-lg font-bold border-t border-gray-200">
                <span>Total:</span>
                <span>{formatCurrency(invoiceData.total)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={generateInvoice}
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
          >
            <Receipt size={16} />
            Generate & Send Invoice
          </button>
        </div>
      </div>
    );
  };

  // Notification Center Component
  const NotificationCenter = ({ booking, onSendNotification }) => {
    const [notificationType, setNotificationType] = useState('email');
    const [customMessage, setCustomMessage] = useState('');

    const sendCustomNotification = async () => {
      if (!customMessage.trim()) return;

      const notification = {
        id: Date.now(),
        type: notificationType,
        message: customMessage,
        date: new Date().toISOString(),
        status: 'sent'
      };

      if (notificationType === 'email') {
        await NotificationService.sendEmail(booking.email, `Update on ${booking.id}`, customMessage);
      } else if (notificationType === 'whatsapp') {
        await NotificationService.sendWhatsApp(booking.phone, customMessage);
      }

      const currentNotifications = booking.notifications || [];
      const updates = {
        notifications: [...currentNotifications, notification]
      };

      onSendNotification(booking.id, updates);
      setCustomMessage('');
    };

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Notifications</h3>

        {/* Send Custom Notification */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Send Custom Notification</h4>
          <div className="space-y-4">
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="notificationType"
                  value="email"
                  checked={notificationType === 'email'}
                  onChange={(e) => setNotificationType(e.target.value)}
                  className="mr-2"
                />
                <Mail size={16} className="mr-1" />
                Email
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="notificationType"
                  value="whatsapp"
                  checked={notificationType === 'whatsapp'}
                  onChange={(e) => setNotificationType(e.target.value)}
                  className="mr-2"
                />
                <MessageSquare size={16} className="mr-1" />
                WhatsApp
              </label>
            </div>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows="3"
              placeholder="Type your custom message..."
            />
            <button
              onClick={sendCustomNotification}
              disabled={!customMessage.trim()}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send size={16} />
              Send Notification
            </button>
          </div>
        </div>

        {/* Notification History */}
        <div>
          <h4 className="font-medium mb-3">Notification History</h4>
          {booking.notifications && booking.notifications.length > 0 ? (
            <div className="space-y-3">
              {booking.notifications.map((notification, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2">
                      {notification.type === 'email' ? <Mail size={14} /> : <MessageSquare size={14} />}
                      <span className="font-medium capitalize">{notification.type}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(notification.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No notifications sent yet</p>
          )}
        </div>
      </div>
    );
  };

  // Main Booking Details Component
  const BookingDetails = ({ booking }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [showMechanicAssignment, setShowMechanicAssignment] = useState(false);
    const [showInspectionForm, setShowInspectionForm] = useState(false);
    const [showQuotationGenerator, setShowQuotationGenerator] = useState(false);

    const tabs = [
      { id: 'overview', label: 'Overview', icon: Eye },
      // { id: 'progress', label: 'Work Progress', icon: Tool },
      { id: 'notifications', label: 'Notifications', icon: Send },
      { id: 'invoice', label: 'Invoice', icon: Receipt }
    ];

    const getNextAction = () => {
      switch (booking.status) {
        case 'pending_assignment':
          return (
            <button
              onClick={() => setShowMechanicAssignment(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Wrench size={16} />
              Assign Mechanic
            </button>
          );
        case 'assigned':
          return (
            <button
              onClick={() => setShowInspectionForm(true)}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center gap-2"
            >
              <CheckSquare size={16} />
              Start Inspection
            </button>
          );
        case 'inspection_completed':
          return (
            <button
              onClick={() => setShowQuotationGenerator(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
            >
              <FileText size={16} />
              Generate Quotation
            </button>
          );
        case 'work_completed':
          return booking.invoice ? (
            <span className="text-green-600 flex items-center gap-2">
              <CheckCircle size={16} />
              Invoice Generated
            </span>
          ) : (
            <button
              onClick={() => setActiveTab('invoice')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <Receipt size={16} />
              Generate Invoice
            </button>
          );
        default:
          return null;
      }
    };

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Booking #{booking.id}</h2>
              <span className={`inline-block px-3 py-1 rounded-full text-sm mt-2 ${getStatusColor(booking.status)}`}>
                {getStatusText(booking.status)}
              </span>
            </div>
            <div className="text-right">
              {getNextAction()}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <User size={16} className="text-gray-500" />
              <span>{booking.customerName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-gray-500" />
              <span>{booking.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-gray-500" />
              <span>{booking.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Car size={16} className="text-gray-500" />
              <span>{booking.vehicleModel}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-500" />
              <span>{booking.bookingDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-gray-500" />
              <span>{booking.vehicleNumber}</span>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-gray-700"><strong>Description:</strong> {booking.description}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-6 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Customer Approval Section */}
                {booking.status === 'quotation_sent' && (
                  <CustomerApproval
                    booking={booking}
                    onApprove={updateBooking}
                    onReject={updateBooking}
                  />
                )}

                {/* Mechanic Info */}
                {booking.mechanicId && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Assigned Mechanic</h4>
                    {(() => {
                      const mechanic = mechanics.find(m => m.id === booking.mechanicId);
                      return mechanic ? (
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <p className="font-medium">{mechanic.name}</p>
                            <p className="text-sm text-gray-600">{mechanic.specialization}</p>
                            <p className="text-sm text-gray-600">★ {mechanic.rating} | {mechanic.experience} years exp.</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">{mechanic.phone}</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500">Mechanic not found</p>
                      );
                    })()}
                  </div>
                )}

                {/* Inspection Details */}
                {booking.inspection && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Inspection Report</h4>
                    <div className="space-y-3">
                      {booking.inspection.issues.map((issue, index) => (
                        <div key={index} className="bg-white rounded p-3">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium">{issue.category}</span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              issue.severity === 'critical' ? 'bg-red-100 text-red-800' :
                              issue.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                              issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {issue.severity.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{issue.problem}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Parts: </span>
                              {issue.partsNeeded.length > 0 ? 
                                issue.partsNeeded.map(part => part.name).join(', ') :
                                'None'
                              }
                            </div>
                            <div>
                              <span className="font-medium">Labor: </span>
                              {issue.laborHours}h × ₹{issue.laborRate}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {booking.inspection.additionalNotes && (
                      <div className="mt-3">
                        <p className="font-medium text-sm mb-1">Additional Notes:</p>
                        <p className="text-sm text-gray-600">{booking.inspection.additionalNotes}</p>
                      </div>
                    )}
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total Estimated Cost:</span>
                        <span className="text-lg font-bold text-green-600">
                          {formatCurrency(booking.inspection.totalEstimatedCost)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quotation Details */}
                {booking.quotation && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Quotation Summary</h4>
                    <div className="bg-white rounded p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span>Subtotal:</span>
                        <span>{formatCurrency(booking.quotation.subtotal)}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span>GST (18%):</span>
                        <span>{formatCurrency(booking.quotation.tax)}</span>
                      </div>
                      <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                        <span>Total Amount:</span>
                        <span className="text-green-600">{formatCurrency(booking.quotation.total)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                        <span>Estimated Time:</span>
                        <span>{booking.quotation.estimatedDays} days</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Customer Approval Status */}
                {booking.customerApproval && (
                  <div className={`rounded-lg p-4 ${
                    booking.customerApproval.status === 'approved' 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <h4 className="font-medium mb-2">Customer Response</h4>
                    <div className="flex items-center gap-2 mb-2">
                      {booking.customerApproval.status === 'approved' ? (
                        <CheckCircle size={16} className="text-green-600" />
                      ) : (
                        <XCircle size={16} className="text-red-600" />
                      )}
                      <span className={`font-medium ${
                        booking.customerApproval.status === 'approved' ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {booking.customerApproval.status === 'approved' ? 'Approved' : 'Rejected'}
                      </span>
                      <span className="text-sm text-gray-500">
                        on {new Date(booking.customerApproval.date).toLocaleDateString()}
                      </span>
                    </div>
                    {booking.customerApproval.reason && (
                      <p className="text-sm text-gray-600">
                        <strong>Reason:</strong> {booking.customerApproval.reason}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'progress' && (
              <WorkProgressTracker
                booking={booking}
                onUpdateProgress={updateBooking}
                onAddExpense={updateBooking}
              />
            )}

            {activeTab === 'notifications' && (
              <NotificationCenter
                booking={booking}
                onSendNotification={updateBooking}
              />
            )}

            {activeTab === 'invoice' && (
              <InvoiceGenerator
                booking={booking}
                onGenerateInvoice={updateBooking}
              />
            )}
          </div>
        </div>

        {/* Modals */}
        {showMechanicAssignment && (
          <MechanicAssignment
            booking={booking}
            onAssign={updateBooking}
            onClose={() => setShowMechanicAssignment(false)}
          />
        )}

        {showInspectionForm && (
          <InspectionForm
            booking={booking}
            onSubmit={updateBooking}
            onClose={() => setShowInspectionForm(false)}
          />
        )}

        {showQuotationGenerator && (
          <QuotationGenerator
            booking={booking}
            onGenerate={updateBooking}
            onClose={() => setShowQuotationGenerator(false)}
          />
        )}
      </div>
    );
  };

  // Booking List Component
  const BookingList = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">All Bookings</h2>
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg">
            <option value="">All Status</option>
            {mockData.workStatuses.map(status => (
              <option key={status} value={status}>
                {getStatusText(status)}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid gap-4">
        {bookings.map(booking => (
          <div key={booking.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="font-semibold text-lg">#{booking.id}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(booking.status)}`}>
                    {getStatusText(booking.status)}
                  </span>
                  {booking.mechanicId && (
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {mechanics.find(m => m.id === booking.mechanicId)?.name}
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    {booking.customerName}
                  </div>
                  <div className="flex items-center gap-2">
                    <Car size={16} />
                    {booking.vehicleModel} - {booking.vehicleNumber}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {booking.bookingDate}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    {booking.phone}
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm">{booking.description}</p>
                
                {booking.quotation && (
                  <div className="mt-2 flex items-center gap-4 text-sm">
                    <span className="text-green-600 font-medium">
                      Quoted: {formatCurrency(booking.quotation.total)}
                    </span>
                    <span className="text-gray-500">
                      Est. {booking.quotation.estimatedDays} days
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedBooking(booking);
                    setCurrentView('details');
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded flex items-center gap-1"
                >
                  <Eye size={16} />
                  <span className="text-sm">View</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Main Component Render
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">Booking Management System</h1>
            {currentView === 'details' && (
              <button
                onClick={() => {
                  setCurrentView('list');
                  setSelectedBooking(null);
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                ← Back to List
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        {currentView === 'list' && <BookingList />}
        {currentView === 'details' && selectedBooking && (
          <BookingDetails booking={selectedBooking} />
        )}
      </div>
    </div>
  );
};

export default BookingManagementSystem;