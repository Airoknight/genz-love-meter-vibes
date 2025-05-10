
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export const Confetti: React.FC = () => {
  const [confetti, setConfetti] = useState<{ id: number; left: string; delay: string; size: string }[]>([]);
  
  useEffect(() => {
    // Create 30 confetti elements with random positions
    const newConfetti = Array.from({ length: 30 }, (_, index) => ({
      id: index,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      size: `${Math.random() * 20 + 10}px`,
    }));
    
    setConfetti(newConfetti);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((item) => (
        <div
          key={item.id}
          className="absolute animate-confetti"
          style={{
            left: item.left,
            top: '-20px',
            animationDelay: item.delay,
            fontSize: item.size,
          }}
        >
          <Heart fill={Math.random() > 0.5 ? "#FF4D6D" : "#D946EF"} size={parseInt(item.size)} />
        </div>
      ))}
    </div>
  );
};
