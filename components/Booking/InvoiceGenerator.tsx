// components/InvoiceGenerator.tsx
"use client";
import { useState } from "react";
import { FileText, Download, Printer, Edit, Check, X } from "lucide-react";

export const InvoiceGenerator = ({
  booking,
  onSave,
  onCancel,
  onDownload,
  onPrint,
}: {
  booking: any;
  onSave: (invoiceData: any) => void;
  onCancel: () => void;
  onDownload: () => void;
  onPrint: () => void;
}) => {
  const [invoiceData, setInvoiceData] = useState({
    ...booking.quotation,
    additionalNotes: "",
    taxRate: 18,
    discount: 0,
  });

  const subtotal = invoiceData.parts.reduce((sum: number, part: any) => sum + part.total, 0) +
    invoiceData.laborCharges.reduce((sum: number, charge: any) => sum + charge.amount, 0) +
    invoiceData.additionalCharges.reduce((sum: number, charge: any) => sum + charge.amount, 0);

  const taxAmount = (subtotal * invoiceData.taxRate) / 100;
  const totalAmount = subtotal + taxAmount - invoiceData.discount;

  const updateCharge = (type: "parts" | "laborCharges" | "additionalCharges", index: number, field: string, value: any) => {
    const updated = { ...invoiceData };
    updated[type][index][field] = value;
    if (type === "parts" && field === "quantity") {
      updated[type][index].total = updated[type][index].price * value;
    }
    setInvoiceData(updated);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-600" />
          Invoice Generation
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={onDownload}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            title="Download Invoice"
          >
            <Download size={20} />
          </button>
          <button
            onClick={onPrint}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            title="Print Invoice"
          >
            <Printer size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Customer and Booking Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Customer Details</h4>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="font-semibold">{booking.customer.name}</p>
              <p>{booking.customer.phone}</p>
              <p>{booking.customer.email}</p>
              <p>{booking.customer.address}</p>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Booking Details</h4>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p>
                <span className="font-semibold">Booking #:</span> {booking.bookingNumber}
              </p>
              <p>
                <span className="font-semibold">Vehicle:</span> {booking.vehicle.brand} {booking.vehicle.model}
              </p>
              <p>
                <span className="font-semibold">Service Date:</span>{" "}
                {new Date(booking.serviceDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Invoice Items */}
        <div>
          <h4 className="font-medium mb-2">Service Details</h4>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-right">Qty</th>
                  <th className="px-4 py-2 text-right">Price</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {/* Parts */}
                {invoiceData.parts.map((part: any, index: number) => (
                  <tr key={`part-${index}`} className="border-t">
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={part.name}
                        onChange={(e) => updateCharge("parts", index, "name", e.target.value)}
                        className="w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500"
                      />
                    </td>
                    <td className="px-4 py-2 text-right">
                      <input
                        type="number"
                        min="1"
                        value={part.quantity}
                        onChange={(e) => updateCharge("parts", index, "quantity", parseInt(e.target.value))}
                        className="w-16 text-right bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500"
                      />
                    </td>
                    <td className="px-4 py-2 text-right">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={part.price}
                        onChange={(e) => updateCharge("parts", index, "price", parseFloat(e.target.value))}
                        className="w-24 text-right bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500"
                      />
                    </td>
                    <td className="px-4 py-2 text-right">₹{part.total.toFixed(2)}</td>
                  </tr>
                ))}

                {/* Labor Charges */}
                {invoiceData.laborCharges.map((charge: any, index: number) => (
                  <tr key={`labor-${index}`} className="border-t">
                    <td className="px-4 py-2" colSpan={2}>
                      <input
                        type="text"
                        value={charge.name}
                        onChange={(e) => updateCharge("laborCharges", index, "name", e.target.value)}
                        className="w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500"
                      />
                    </td>
                    <td className="px-4 py-2 text-right" colSpan={2}>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={charge.amount}
                        onChange={(e) => updateCharge("laborCharges", index, "amount", parseFloat(e.target.value))}
                        className="w-24 text-right bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500"
                      />
                    </td>
                  </tr>
                ))}

                {/* Additional Charges */}
                {invoiceData.additionalCharges.map((charge: any, index: number) => (
                  <tr key={`additional-${index}`} className="border-t">
                    <td className="px-4 py-2" colSpan={2}>
                      <input
                        type="text"
                        value={charge.name}
                        onChange={(e) => updateCharge("additionalCharges", index, "name", e.target.value)}
                        className="w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500"
                      />
                    </td>
                    <td className="px-4 py-2 text-right" colSpan={2}>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={charge.amount}
                        onChange={(e) => updateCharge("additionalCharges", index, "amount", parseFloat(e.target.value))}
                        className="w-24 text-right bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="flex justify-end">
          <div className="w-full md:w-1/2 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>
                Tax ({invoiceData.taxRate}%):
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={invoiceData.taxRate}
                  onChange={(e) =>
                    setInvoiceData({
                      ...invoiceData,
                      taxRate: parseFloat(e.target.value),
                    })
                  }
                  className="w-16 ml-2 border rounded px-2 py-1"
                />
              </span>
              <span>₹{taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>
                Discount:
                <input
                  type="number"
                  min="0"
                  value={invoiceData.discount}
                  onChange={(e) =>
                    setInvoiceData({
                      ...invoiceData,
                      discount: parseFloat(e.target.value),
                    })
                  }
                  className="w-16 ml-2 border rounded px-2 py-1"
                />
              </span>
              <span>-₹{invoiceData.discount.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium mb-1">Additional Notes</label>
          <textarea
            value={invoiceData.additionalNotes}
            onChange={(e) =>
              setInvoiceData({ ...invoiceData, additionalNotes: e.target.value })
            }
            rows={2}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Enter any additional notes for the invoice..."
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave(invoiceData)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Check className="w-4 h-4 mr-2" />
            Save Invoice
          </button>
        </div>
      </div>
    </div>
  );
};