
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Confetti } from "./Confetti";
import { ShareResult } from "./ShareResult";

interface LoveResultProps {
  result: {
    percentage: number;
    loveTerm: string;
    description: string;
  };
  name1: string;
  name2: string;
  onReset: () => void;
}

export const LoveResult: React.FC<LoveResultProps> = ({ result, name1, name2, onReset }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const { percentage, loveTerm, description } = result;
  
  useEffect(() => {
    if (percentage >= 80) {
      setShowConfetti(true);
    }
  }, [percentage]);
  
  // Determine animation and color based on percentage
  const getHeartColor = () => {
    if (percentage < 30) return "#FFDEE2"; // light pink
    if (percentage < 50) return "#FF9AAC"; // medium pink
    if (percentage < 70) return "#FF4D6D"; // darker pink
    if (percentage < 90) return "#D946EF"; // magenta
    return "#9b87f5"; // purple
  };
  
  const getAnimation = () => {
    if (percentage < 30) return "animate-pulse";
    if (percentage < 70) return "animate-pulse-scale";
    return "animate-heart-beat";
  };

  return (
    <div className="animate-fade-in text-center">
      {showConfetti && <Confetti />}
      
      <div className="mb-6 flex flex-col items-center justify-center">
        <div className="text-center mb-2">
          <div className="text-sm font-medium text-love-700">
            {name1} & {name2}
          </div>
          <div className="text-4xl font-bold bg-gradient-to-r from-love-500 to-love-800 text-transparent bg-clip-text">
            {percentage}%
          </div>
        </div>
        
        <div className="relative w-32 h-32 flex items-center justify-center">
          <Heart 
            size={96} 
            className={`${getAnimation()}`}
            fill={getHeartColor()}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold">
            {percentage}%
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-love-800 mb-2">{loveTerm}</h2>
        <p className="text-love-700">{description}</p>
      </div>
      
      <ShareResult name1={name1} name2={name2} percentage={percentage} loveTerm={loveTerm} />
      
      <Button 
        onClick={onReset} 
        variant="outline"
        className="mt-6 border-love-300 text-love-700 hover:bg-love-100"
      >
        Try Another
      </Button>
    </div>
  );
};
