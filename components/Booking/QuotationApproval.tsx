// components/QuotationApproval.tsx
"use client";
import { useState } from "react";
import { Check, X, MessageSquare, Mail, ClipboardCheck } from "lucide-react";

export const QuotationApproval = ({
  booking,
  onApprove,
  onReject,
  onSendNotification,
}: {
  booking: any;
  onApprove: (notes: string) => void;
  onReject: (notes: string) => void;
  onSendNotification: (type: "email" | "whatsapp") => void;
}) => {
  const [notes, setNotes] = useState("");
  const [notificationSent, setNotificationSent] = useState({
    email: false,
    whatsapp: false,
  });

  const handleSendNotification = (type: "email" | "whatsapp") => {
    onSendNotification(type);
    setNotificationSent({ ...notificationSent, [type]: true });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <ClipboardCheck className="w-5 h-5 mr-2 text-blue-600" />
          Quotation Approval
        </h3>
        <div className="text-xl font-bold">₹{booking.quotation.totalAmount}</div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Customer Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Enter any notes for the mechanic..."
        />
      </div>

      <div className="flex flex-wrap gap-3 justify-between">
        <div className="space-x-2">
          <button
            onClick={() => handleSendNotification("email")}
            disabled={notificationSent.email}
            className={`px-3 py-2 rounded-lg flex items-center ${
              notificationSent.email
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
          >
            <Mail className="w-4 h-4 mr-2" />
            {notificationSent.email ? "Email Sent" : "Send Email"}
          </button>
          <button
            onClick={() => handleSendNotification("whatsapp")}
            disabled={notificationSent.whatsapp}
            className={`px-3 py-2 rounded-lg flex items-center ${
              notificationSent.whatsapp
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            {notificationSent.whatsapp ? "WhatsApp Sent" : "Send WhatsApp"}
          </button>
        </div>

        <div className="space-x-2">
          <button
            onClick={() => onReject(notes)}
            className="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 flex items-center"
          >
            <X className="w-4 h-4 mr-2" />
            Reject Quotation
          </button>
          <button
            onClick={() => onApprove(notes)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
          >
            <Check className="w-4 h-4 mr-2" />
            Approve Quotation
          </button>
        </div>
      </div>
    </div>
  );
};