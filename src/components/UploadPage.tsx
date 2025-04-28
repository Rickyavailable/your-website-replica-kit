
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface UploadPageProps {
  selectedImage: File | null;
  onImageSelect: (file: File | null) => void;
  onNext: () => void;
}

const UploadPage: React.FC<UploadPageProps> = ({ selectedImage, onImageSelect, onNext }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onImageSelect(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] || null;
    onImageSelect(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <h2 className="text-2xl mb-6 font-light">UPLOAD FACE PHOTOS</h2>
      
      <div 
        className="w-full max-w-lg h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <div className="w-full h-full">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
            <button 
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
              onClick={() => {
                onImageSelect(null);
                setPreviewUrl(null);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        ) : (
          <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
            <div className="rounded-full p-4 bg-gray-100">
              <Upload className="h-8 w-8 text-gray-500" />
            </div>
            <span className="mt-4 text-gray-500">Click or drag image to upload</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>
      
      <div className="mt-8">
        <Button
          onClick={onNext}
          disabled={!selectedImage}
          className="px-10 py-6 text-lg"
        >
          Next <span className="ml-2">&gt;</span>
        </Button>
      </div>
    </div>
  );
};

export default UploadPage;
