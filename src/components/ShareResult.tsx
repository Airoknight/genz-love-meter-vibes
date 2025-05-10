
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Heart } from "lucide-react";

interface ShareResultProps {
  name1: string;
  name2: string;
  percentage: number;
  loveTerm: string;
}

export const ShareResult: React.FC<ShareResultProps> = ({ name1, name2, percentage, loveTerm }) => {
  const [isCopied, setIsCopied] = useState(false);

  const shareText = `I got a ${percentage}% match with my crush on the Gen Z Love Calculator! Our result: "${loveTerm}". Try yours now!`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareText);
    setIsCopied(true);
    toast({
      title: "Link copied!",
      description: "Share it with your friends or your crush 😉",
    });
    
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleShareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  const handleShareInstagram = () => {
    toast({
      title: "Instagram Sharing",
      description: "Take a screenshot and share it on your Instagram story!",
    });
  };
  
  const handleShareWithCrush = () => {
    toast({
      title: "Share with your crush!",
      description: "Feeling brave? Screenshot this and send directly to them! 💕",
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-love-700">Share Your Result</h3>
      
      <div className="flex flex-wrap gap-2 justify-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCopyLink}
          className="border-love-300 text-love-700 hover:bg-love-100"
        >
          {isCopied ? "Copied!" : "Copy Link"}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleShareWhatsApp}
          className="border-love-300 text-love-700 hover:bg-love-100"
        >
          Share on WhatsApp
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleShareInstagram}
          className="border-love-300 text-love-700 hover:bg-love-100"
        >
          Share on Instagram
        </Button>
      </div>
      
      <Button 
        onClick={handleShareWithCrush}
        className="button-gradient text-white font-bold py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 w-full"
      >
        <Heart size={16} fill="white" className="mr-1" />
        Send Result to Your Crush
      </Button>
    </div>
  );
};
