
export interface LoveResult {
  percentage: number;
  loveTerm: string;
  description: string;
}

// Love term mapping according to percentage
const loveTerms: Record<string, { term: string; description: string }> = {
  "0-10": {
    term: "Brother / Sister",
    description: "You're definitely in the friend zone! Keep it platonic.",
  },
  "11-30": {
    term: "Benching",
    description: "They're keeping you as an option while exploring others. Don't get too attached!",
  },
  "31-50": {
    term: "Situationship",
    description: "It's complicated! Not quite dating, not quite friends - classic gray area.",
  },
  "51-70": {
    term: "Fling",
    description: "Short-term but fun! Enjoy the moment but don't expect forever.",
  },
  "71-85": {
    term: "Sneaky Link",
    description: "There's definitely chemistry, but you're keeping it on the down-low.",
  },
  "86-99": {
    term: "Main Character Love",
    description: "This is your rom-com moment! You're meant to be together.",
  },
  "100": {
    term: "Hard Launch",
    description: "Soulmates alert! Time to make it Instagram official!",
  },
};

// Gets the love term based on percentage
const getLoveTerm = (percentage: number): { term: string; description: string } => {
  if (percentage === 100) return loveTerms["100"];
  if (percentage >= 86) return loveTerms["86-99"];
  if (percentage >= 71) return loveTerms["71-85"];
  if (percentage >= 51) return loveTerms["51-70"];
  if (percentage >= 31) return loveTerms["31-50"];
  if (percentage >= 11) return loveTerms["11-30"];
  return loveTerms["0-10"];
};

// FLAMES algorithm implementation
export const calculateLove = (name1: string, name2: string): LoveResult => {
  // Normalize names: lowercase and remove spaces/special characters
  const normalizedName1 = name1.toLowerCase().replace(/[^a-z]/g, "");
  const normalizedName2 = name2.toLowerCase().replace(/[^a-z]/g, "");
  
  const name1Chars = [...normalizedName1];
  const name2Chars = [...normalizedName2];
  
  // Create copies to track remaining characters
  const remainingName1 = [...name1Chars];
  const remainingName2 = [...name2Chars];
  
  // Remove common characters (each occurrence only once)
  name1Chars.forEach(char => {
    const index = remainingName2.indexOf(char);
    if (index !== -1) {
      // Remove the character from remainingName2
      remainingName2.splice(index, 1);
      // Also remove from remainingName1
      const idx = remainingName1.indexOf(char);
      if (idx !== -1) {
        remainingName1.splice(idx, 1);
      }
    }
  });
  
  // Count remaining letters
  const remainingCount = remainingName1.length + remainingName2.length;
  const totalLength = normalizedName1.length + normalizedName2.length;
  
  // Calculate percentage based on remaining characters
  // More common characters = higher percentage
  let percentage = Math.floor(100 * (1 - remainingCount / totalLength));
  
  // Add a bit of randomness to make it more fun (±5%)
  const randomFactor = Math.floor(Math.random() * 11) - 5;
  percentage = Math.min(100, Math.max(0, percentage + randomFactor));
  
  // Handle special cases for matching names
  if (normalizedName1 === normalizedName2 && normalizedName1.length > 0) {
    percentage = 100;
  }
  
  // Get love term based on percentage
  const { term, description } = getLoveTerm(percentage);
  
  return {
    percentage,
    loveTerm: term,
    description,
  };
};
