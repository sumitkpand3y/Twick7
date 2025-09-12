// components/QuotationForm.tsx
"use client";
import { useState } from "react";
import { Package, Tool, Plus, X, Check, DollarSign } from "lucide-react";
import { partsInventory } from "@/lib/Admin/data";

export const QuotationForm = ({
  booking,
  onSubmit,
  onCancel,
}: {
  booking: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}) => {
  const [parts, setParts] = useState(booking?.quotation?.parts || []);
  const [laborCharges, setLaborCharges] = useState(booking?.quotation?.laborCharges || []);
  const [additionalCharges, setAdditionalCharges] = useState(booking?.quotation?.additionalCharges || []);
  const [selectedPart, setSelectedPart] = useState("");
  const [quantity, setQuantity] = useState(1);

  const totalAmount = [
    ...parts.map((p: any) => p.total),
    ...laborCharges.map((l: any) => l.amount),
    ...additionalCharges.map((a: any) => a.amount),
  ].reduce((sum, amount) => sum + amount, 0);

  const addPart = () => {
    const part = partsInventory.find((p) => p.id === selectedPart);
    if (part) {
      setParts([...parts, { ...part, quantity, total: part.price * quantity }]);
      setSelectedPart("");
      setQuantity(1);
    }
  };

  const removePart = (index: number) => {
    setParts(parts.filter((_: any, i: number) => i !== index));
  };

  const addLaborCharge = () => {
    setLaborCharges([...laborCharges, { name: "", amount: 0 }]);
  };

  const updateLaborCharge = (index: number, field: string, value: any) => {
    const updated = [...laborCharges];
    updated[index] = { ...updated[index], [field]: value };
    setLaborCharges(updated);
  };

  const removeLaborCharge = (index: number) => {
    setLaborCharges(laborCharges.filter((_: any, i: number) => i !== index));
  };

  const addAdditionalCharge = () => {
    setAdditionalCharges([...additionalCharges, { name: "", amount: 0 }]);
  };

  const updateAdditionalCharge = (index: number, field: string, value: any) => {
    const updated = [...additionalCharges];
    updated[index] = { ...updated[index], [field]: value };
    setAdditionalCharges(updated);
  };

  const removeAdditionalCharge = (index: number) => {
    setAdditionalCharges(additionalCharges.filter((_: any, i: number) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      parts,
      laborCharges,
      additionalCharges,
      totalAmount,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Service Quotation</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Parts Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium flex items-center">
              <Package className="w-4 h-4 mr-2" />
              Parts Required
            </h4>
            <div className="flex space-x-2">
              <select
                value={selectedPart}
                onChange={(e) => setSelectedPart(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="">Select Part</option>
                {partsInventory.map((part) => (
                  <option key={part.id} value={part.id}>
                    {part.name} (₹{part.price})
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-16 border rounded px-2 py-1 text-sm"
              />
              <button
                type="button"
                onClick={addPart}
                disabled={!selectedPart}
                className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm flex items-center disabled:opacity-50"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add
              </button>
            </div>
          </div>

          {parts.length > 0 ? (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Part</th>
                    <th className="px-4 py-2 text-left">Part No.</th>
                    <th className="px-4 py-2 text-center">Qty</th>
                    <th className="px-4 py-2 text-right">Price</th>
                    <th className="px-4 py-2 text-right">Total</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {parts.map((part: any, index: number) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{part.name}</td>
                      <td className="px-4 py-2">{part.partNumber}</td>
                      <td className="px-4 py-2 text-center">{part.quantity}</td>
                      <td className="px-4 py-2 text-right">₹{part.price}</td>
                      <td className="px-4 py-2 text-right">₹{part.total}</td>
                      <td className="px-4 py-2 text-right">
                        <button
                          type="button"
                          onClick={() => removePart(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic">No parts added</p>
          )}
        </div>

        {/* Labor Charges Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium flex items-center">
              <Tool className="w-4 h-4 mr-2" />
              Labor Charges
            </h4>
            <button
              type="button"
              onClick={addLaborCharge}
              className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm flex items-center"
            >
              <Plus className="w-3 h-3 mr-1" />
              Add Charge
            </button>
          </div>

          {laborCharges.length > 0 ? (
            <div className="space-y-2">
              {laborCharges.map((charge: any, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={charge.name}
                    onChange={(e) => updateLaborCharge(index, "name", e.target.value)}
                    placeholder="Charge description"
                    className="flex-1 border rounded px-3 py-1"
                  />
                  <input
                    type="number"
                    min="0"
                    value={charge.amount}
                    onChange={(e) => updateLaborCharge(index, "amount", parseFloat(e.target.value))}
                    placeholder="Amount"
                    className="w-24 border rounded px-3 py-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeLaborCharge(index)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic">No labor charges added</p>
          )}
        </div>

        {/* Additional Charges Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Additional Charges
            </h4>
            <button
              type="button"
              onClick={addAdditionalCharge}
              className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm flex items-center"
            >
              <Plus className="w-3 h-3 mr-1" />
              Add Charge
            </button>
          </div>

          {additionalCharges.length > 0 ? (
            <div className="space-y-2">
              {additionalCharges.map((charge: any, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={charge.name}
                    onChange={(e) => updateAdditionalCharge(index, "name", e.target.value)}
                    placeholder="Charge description"
                    className="flex-1 border rounded px-3 py-1"
                  />
                  <input
                    type="number"
                    min="0"
                    value={charge.amount}
                    onChange={(e) => updateAdditionalCharge(index, "amount", parseFloat(e.target.value))}
                    placeholder="Amount"
                    className="w-24 border rounded px-3 py-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeAdditionalCharge(index)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic">No additional charges</p>
          )}
        </div>

        {/* Total Amount */}
        <div className="border-t pt-4 flex justify-between items-center">
          <span className="font-semibold">Total Amount:</span>
          <span className="text-xl font-bold">₹{totalAmount}</span>
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
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Check className="w-4 h-4 mr-2" />
            Submit Quotation
          </button>
        </div>
      </form>
    </div>
  );
};