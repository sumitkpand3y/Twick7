// components/WorkProgressForm.tsx
"use client";
import { useState, useRef } from "react";
import { Wrench, Camera, Plus, X, Check, Package } from "lucide-react";
import { partsInventory } from "@/lib/Admin/data";

export const WorkProgressForm = ({
  booking,
  onSubmit,
  onCancel,
}: {
  booking: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}) => {
  const [progressNotes, setProgressNotes] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [partsUsed, setPartsUsed] = useState<any[]>([]);
  const [selectedPart, setSelectedPart] = useState("");
  const [quantity, setQuantity] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages([...images, event.target.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addPart = () => {
    const part = partsInventory.find((p) => p.id === selectedPart);
    if (part) {
      setPartsUsed([...partsUsed, { ...part, quantity }]);
      setSelectedPart("");
      setQuantity(1);
    }
  };

  const removePart = (index: number) => {
    setPartsUsed(partsUsed.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      progressNotes,
      images,
      partsUsed,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Wrench className="w-5 h-5 mr-2 text-blue-600" />
        Work Progress Update
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Progress Notes</label>
          <textarea
            value={progressNotes}
            onChange={(e) => setProgressNotes(e.target.value)}
            rows={3}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Describe the work completed..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Upload Images</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img}
                  alt={`Progress ${index + 1}`}
                  className="w-24 h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => setImages(images.filter((_, i) => i !== index))}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 -m-1"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center px-3 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Camera className="w-4 h-4 mr-2" />
            Add Image
          </button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium flex items-center">
              <Package className="w-4 h-4 mr-2" />
              Parts Used
            </label>
            <div className="flex space-x-2">
              <select
                value={selectedPart}
                onChange={(e) => setSelectedPart(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="">Select Part</option>
                {partsInventory.map((part) => (
                  <option key={part.id} value={part.id}>
                    {part.name}
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

          {partsUsed.length > 0 ? (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Part</th>
                    <th className="px-4 py-2 text-center">Qty</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {partsUsed.map((part, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{part.name}</td>
                      <td className="px-4 py-2 text-center">{part.quantity}</td>
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
            <p className="text-gray-500 text-sm italic">No parts used yet</p>
          )}
        </div>

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
            Submit Update
          </button>
        </div>
      </form>
    </div>
  );
};