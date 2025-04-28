
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Check } from "lucide-react";

interface SourceSelectPageProps {
  videoSource: "camera" | "upload" | null;
  onSourceSelect: (source: "camera" | "upload") => void;
  onNext: () => void;
}

const SourceSelectPage: React.FC<SourceSelectPageProps> = ({ videoSource, onSourceSelect, onNext }) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setVideoFile(file);
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <h2 className="text-2xl mb-8 font-light">SELECT THE SOURCE</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
        {/* Live camera option */}
        <div className="flex flex-col">
          <div 
            className={`
              border-2 rounded-lg h-60 flex items-center justify-center relative overflow-hidden cursor-pointer
              ${videoSource === "camera" ? "border-blue-500" : "border-gray-300"}
            `}
            onClick={() => onSourceSelect("camera")}
          >
            <div className="flex flex-col items-center">
              <Camera className="h-12 w-12 text-gray-400 mb-2" />
              <span className="text-gray-500">(Camera access required)</span>
            </div>
            
            {videoSource === "camera" && (
              <div className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white py-2 px-3 flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                <span>LIVE</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Upload video option */}
        <div className="flex flex-col">
          <div 
            className={`
              border-2 rounded-lg h-60 flex items-center justify-center relative cursor-pointer
              ${videoSource === "upload" ? "border-blue-500" : "border-gray-300"}
            `}
            onClick={() => onSourceSelect("upload")}
          >
            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
              <Upload className="h-12 w-12 text-gray-400 mb-2" />
              <span className="text-gray-500 text-center px-4">
                Upload some video for recognizing the face
              </span>
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleFileChange}
                onClick={(e) => {
                  e.stopPropagation();
                  onSourceSelect("upload");
                }}
              />
              
              {videoSource === "upload" && videoFile && (
                <div className="mt-4 flex items-center">
                  <Check className="text-green-500 mr-1" size={16} />
                  <span className="text-sm text-green-500">Video selected</span>
                </div>
              )}
            </label>
          </div>
        </div>
      </div>
      
      <div className="mt-10">
        <Button
          onClick={onNext}
          disabled={!videoSource || (videoSource === "upload" && !videoFile)}
          className="px-10 py-6 text-lg"
        >
          Next <span className="ml-2">&gt;</span>
        </Button>
      </div>
    </div>
  );
};

export default SourceSelectPage;
