
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";
import { calculateLove } from "@/utils/loveCalculator";
import { LoveResult } from "./LoveResult";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const LoveCalculator = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<{
    percentage: number;
    loveTerm: string;
    description: string;
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name1.trim() === "" || name2.trim() === "") return;
    
    setIsCalculating(true);
    
    try {
      // Calculate love result
      const calculatedResult = calculateLove(name1, name2);
      setResult(calculatedResult);
      
      // Store result in Supabase
      const { error } = await supabase
        .from('love_results')
        .insert({
          name1: name1.trim(),
          name2: name2.trim(),
          love_percentage: calculatedResult.percentage,
          love_term: calculatedResult.loveTerm
        });
        
      if (error) {
        console.error("Error saving result:", error);
        toast({
          title: "Couldn't save your result",
          description: "Your love calculation was completed but couldn't be saved to our database.",
          variant: "destructive",
        });
      }
      
      setShowResult(true);
    } catch (error) {
      console.error("Calculation error:", error);
      toast({
        title: "Calculation error",
        description: "Something went wrong during the love calculation.",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setShowResult(false);
    setResult(null);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {!showResult ? (
        <div className="animate-fade-in">
          <div className="flex justify-center mb-6">
            <Heart 
              className="text-love-500 animate-heart-beat" 
              size={64} 
              fill="#FF4D6D"
            />
          </div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-love-500 to-love-800 text-transparent bg-clip-text mb-2">
              Gen Z Love Calculator
            </h1>
            <p className="text-love-700">
              Is it true love or just a fling? Try now!
            </p>
            <p className="text-sm text-love-600 mt-2">
              Over 9,478 people found love!
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name1" className="text-love-700">Your Name</Label>
              <Input
                id="name1"
                placeholder="Enter your name"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                required
                className="border-love-300 focus:border-love-500 focus:ring-love-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name2" className="text-love-700">Crush's Name</Label>
              <Input
                id="name2"
                placeholder="Enter your crush's name"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                required
                className="border-love-300 focus:border-love-500 focus:ring-love-500"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full button-gradient text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              disabled={name1.trim() === "" || name2.trim() === "" || isCalculating}
            >
              <Heart size={18} fill="white" className="mr-1" />
              {isCalculating ? "Calculating..." : "Calculate Love"}
            </Button>
          </form>
        </div>
      ) : (
        <LoveResult 
          result={result!} 
          name1={name1} 
          name2={name2} 
          onReset={handleReset} 
        />
      )}
    </div>
  );
};

export default LoveCalculator;
