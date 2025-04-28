
import { useState } from "react";
import UploadPage from "../components/UploadPage";
import SourceSelectPage from "../components/SourceSelectPage";
import ResultsPage from "../components/ResultsPage";
import Header from "../components/Header";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<"upload" | "source" | "results">("upload");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [videoSource, setVideoSource] = useState<"camera" | "upload" | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [facesDetected, setFacesDetected] = useState(0);

  const handleImageSelect = (file: File | null) => {
    setSelectedImage(file);
  };

  const handleNext = () => {
    if (currentPage === "upload") {
      setCurrentPage("source");
    } else if (currentPage === "source") {
      setIsProcessing(true);
      // Simulate processing
      setTimeout(() => {
        setIsProcessing(false);
        setFacesDetected(Math.floor(Math.random() * 5) + 1); // Random 1-5 faces
        setCurrentPage("results");
      }, 2000);
    }
  };

  const handleReset = () => {
    setCurrentPage("upload");
    setSelectedImage(null);
    setVideoSource(null);
    setFacesDetected(0);
  };

  const handleSourceSelect = (source: "camera" | "upload") => {
    setVideoSource(source);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <Header />
      
      <div className="w-full max-w-3xl px-4 py-8 flex-1 flex flex-col">
        {currentPage === "upload" && (
          <UploadPage 
            selectedImage={selectedImage} 
            onImageSelect={handleImageSelect} 
            onNext={handleNext} 
          />
        )}
        
        {currentPage === "source" && (
          <SourceSelectPage 
            videoSource={videoSource}
            onSourceSelect={handleSourceSelect}
            onNext={handleNext}
          />
        )}
        
        {currentPage === "results" && (
          <ResultsPage 
            facesDetected={facesDetected}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
