
import React from "react";
import LoveCalculator from "@/components/LoveCalculator";
import { Heart } from "lucide-react";

const Index = () => {
  const randomHearts = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 20) + 10, // 10-30px
    left: `${Math.random() * 90 + 5}%`, // 5-95%
    top: `${Math.random() * 90 + 5}%`, // 5-95%
    delay: `${Math.random() * 5}s`,
    duration: `${Math.random() * 5 + 5}s`, // 5-10s
  }));

  return (
    <div className="min-h-screen py-8 relative overflow-hidden">
      {/* Decorative floating hearts */}
      {randomHearts.map((heart) => (
        <Heart
          key={heart.id}
          size={heart.size}
          className="absolute text-love-300 opacity-50 animate-float"
          style={{
            left: heart.left,
            top: heart.top,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
          }}
          fill="#FFDEE2"
        />
      ))}
      
      {/* Main Content */}
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-lg mx-auto bg-white bg-opacity-95 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-love-200">
          <LoveCalculator />
        </div>
        
        <footer className="mt-8 text-center text-sm text-love-600">
          <p>© {new Date().getFullYear()} Gen Z Love Calculator</p>
          <p className="mt-1">
            Already matched over 9,000 couples! Will you be next? 💖
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
