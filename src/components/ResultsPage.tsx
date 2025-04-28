
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SquareSlash, RotateCcw } from "lucide-react";

interface ResultsPageProps {
  facesDetected: number;
  onReset: () => void;
}

interface FacePosition {
  id: number;
  x: number;
  y: number;
  isFace: boolean;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ facesDetected, onReset }) => {
  const [isActive, setIsActive] = useState(true);
  const [faces, setFaces] = useState<FacePosition[]>([]);
  
  // Generate random positions for stick figures
  useEffect(() => {
    const generateFaces = () => {
      const newFaces: FacePosition[] = [];
      
      // Generate faces
      for (let i = 0; i < facesDetected; i++) {
        newFaces.push({
          id: i,
          x: Math.random() * 80 + 10, // 10-90%
          y: Math.random() * 80 + 10, // 10-90%
          isFace: true
        });
      }
      
      // Generate some non-faces
      for (let i = 0; i < 2; i++) {
        newFaces.push({
          id: facesDetected + i,
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
          isFace: false
        });
      }
      
      setFaces(newFaces);
    };
    
    generateFaces();
  }, [facesDetected]);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="flex flex-col items-center flex-1">
      <div className="w-full mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-light">FACE DETECTION</h2>
        
        <div className="flex items-center">
          <div className="mr-2">Face Present</div>
          <div className="flex items-center space-x-1">
            <div className={`h-3 w-3 rounded-full ${isActive ? "bg-green-500" : "bg-gray-300"}`}></div>
            <span className="text-sm text-gray-500">Green (There)</span>
          </div>
          <div className="mx-1">/</div>
          <div className="flex items-center space-x-1">
            <div className={`h-3 w-3 rounded-full ${isActive ? "bg-red-500" : "bg-gray-300"}`}></div>
            <span className="text-sm text-gray-500">Red (Not there)</span>
          </div>
        </div>
      </div>
      
      <div className="w-full h-96 border-2 border-gray-300 rounded-lg bg-gray-100 relative mb-6">
        {faces.map((face) => (
          <div 
            key={face.id} 
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${face.x}%`, top: `${face.y}%` }}
          >
            {/* Basic stick figure with box head */}
            <div className={`w-12 h-12 mb-1 flex items-center justify-center ${face.isFace ? "border-green-500" : "border-red-500"} border-2`}>
              <div className="text-xl">:)</div>
            </div>
            <div className="w-1 h-8 bg-black mx-auto"></div>
            <div className="flex justify-center">
              <div className="w-8 h-1 bg-black transform -rotate-30"></div>
              <div className="w-8 h-1 bg-black transform rotate-30"></div>
            </div>
            <div className="flex justify-center mt-1">
              <div className="w-6 h-1 bg-black transform -rotate-45"></div>
              <div className="w-6 h-1 bg-black transform rotate-45"></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex space-x-6">
        <Button
          onClick={toggleActive}
          variant="outline"
          className="px-8 py-6 text-lg border-2"
        >
          <SquareSlash className="mr-2" size={20} />
          {isActive ? "STOP" : "START"}
        </Button>
        
        <Button
          onClick={onReset}
          variant="outline"
          className="px-8 py-6 text-lg border-2"
        >
          <RotateCcw className="mr-2" size={20} />
          RESET
        </Button>
      </div>
    </div>
  );
};

export default ResultsPage;
