// components/InspectionForm.tsx
"use client";
import { useState, useRef } from "react";
import { Camera, Check, X, AlertTriangle } from "lucide-react";

export const InspectionForm = ({
  booking,
  onSubmit,
  onCancel,
}: {
  booking: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}) => {
  const [notes, setNotes] = useState(booking?.inspection?.notes || "");
  const [images, setImages] = useState<string[]>(booking?.inspection?.images || []);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      notes,
      images,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
        Vehicle Inspection
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Inspection Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Describe the issues found during inspection..."
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
                  alt={`Inspection ${index + 1}`}
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
            Submit Inspection
          </button>
        </div>
      </form>
    </div>
  );
};