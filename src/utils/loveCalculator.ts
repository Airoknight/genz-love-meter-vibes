
export interface LoveResult {
  percentage: number;
  loveTerm: string;
  description: string;
}

// Gen Z love terms with percentage ranges and descriptions
const loveTerms: Array<{
  term: string;
  minRange: number;
  maxRange: number;
  description: string;
}> = [
  {
    term: "True Love",
    minRange: 90,
    maxRange: 100,
    description: "This is the real deal! The universe wants you two together."
  },
  {
    term: "Ride or Die",
    minRange: 80,
    maxRange: 89,
    description: "You've found your person. Through thick and thin, you've got each other's back!"
  },
  {
    term: "Soulmates",
    minRange: 70,
    maxRange: 79,
    description: "Your souls are connected on another level. This is more than just a crush!"
  },
  {
    term: "Situationship",
    minRange: 60,
    maxRange: 69,
    description: "It's complicated! Not quite dating, not quite friends - classic gray area."
  },
  {
    term: "Fling",
    minRange: 50,
    maxRange: 59,
    description: "Short-term but fun! Enjoy the moment but don't expect forever."
  },
  {
    term: "Benching",
    minRange: 40,
    maxRange: 49,
    description: "They're keeping you as an option while exploring others. Don't get too attached!"
  },
  {
    term: "Ghosting",
    minRange: 30,
    maxRange: 39,
    description: "One day they're here, the next they've disappeared without a trace. Classic ghosting behavior."
  },
  {
    term: "Friendzone",
    minRange: 20,
    maxRange: 29,
    description: "\"Let's just be friends\" energy. Time to move on to someone who sees your value."
  },
  {
    term: "Slow Fade",
    minRange: 10,
    maxRange: 19,
    description: "The texting gets slower, the dates get cancelled... they're gradually pulling away."
  },
  {
    term: "Siblings",
    minRange: 0,
    maxRange: 9,
    description: "You're definitely in the friend zone! Keep it platonic."
  }
];

// Finds the unique characters after removing common ones from both names
const findUniqueChars = (name1: string, name2: string): number => {
  // Normalize names: lowercase and remove spaces/special characters
  const normalizedName1 = name1.toLowerCase().replace(/[^a-z]/g, "");
  const normalizedName2 = name2.toLowerCase().replace(/[^a-z]/g, "");
  
  // Create arrays from names
  const chars1 = [...normalizedName1];
  const chars2 = [...normalizedName2];
  
  // Create copies to track remaining characters
  let remainingChars1 = [...chars1];
  let remainingChars2 = [...chars2];
  
  // Remove common characters
  chars1.forEach(char => {
    const index = remainingChars2.indexOf(char);
    if (index !== -1) {
      remainingChars2.splice(index, 1);
      const idx = remainingChars1.indexOf(char);
      if (idx !== -1) {
        remainingChars1.splice(idx, 1);
      }
    }
  });
  
  // Count unique characters
  return remainingChars1.length + remainingChars2.length;
};

// Calculate the ASCII sum of combined names
const calculateAsciiSum = (name1: string, name2: string): number => {
  const combined = name1.toLowerCase() + name2.toLowerCase();
  return [...combined].reduce((sum, char) => sum + char.charCodeAt(0), 0);
};

// FLAMES-inspired elimination process
const eliminateTerms = (uniqueCharsCount: number): string => {
  if (uniqueCharsCount === 0) {
    return "Siblings"; // Edge case: all letters are common
  }
  
  // Start with all terms
  const termsList = loveTerms.map(item => item.term);
  let currentIndex = 0;
  
  // Elimination process
  while (termsList.length > 1) {
    // Calculate position to eliminate
    currentIndex = (currentIndex + uniqueCharsCount - 1) % termsList.length;
    
    // Remove the term at this index
    termsList.splice(currentIndex, 1);
    
    // currentIndex is already at the next position due to deletion
    if (currentIndex >= termsList.length) {
      currentIndex = 0;
    }
  }
  
  // Return the last remaining term
  return termsList[0];
};

// Get the percentage based on ASCII sum and term range
const getPercentageForTerm = (term: string, asciiSum: number): number => {
  const termInfo = loveTerms.find(t => t.term === term);
  
  if (!termInfo) {
    return 50; // Default fallback
  }
  
  const { minRange, maxRange } = termInfo;
  const range = maxRange - minRange + 1;
  
  return minRange + (asciiSum % range);
};

// Get term description
const getTermDescription = (term: string): string => {
  const termInfo = loveTerms.find(t => t.term === term);
  return termInfo?.description || "A mysterious connection!";
};

// Main calculation function
export const calculateLove = (name1: string, name2: string): LoveResult => {
  if (name1.trim() === "" || name2.trim() === "") {
    return {
      percentage: 0,
      loveTerm: "Unknown",
      description: "Please enter both names to calculate."
    };
  }
  
  // Special case for identical names
  if (name1.toLowerCase() === name2.toLowerCase() && name1.trim() !== "") {
    return {
      percentage: 100,
      loveTerm: "True Love",
      description: "You're perfect together! (Or it's just you loving yourself, which is great too!)"
    };
  }
  
  // Count unique characters
  const uniqueCharsCount = findUniqueChars(name1, name2);
  
  // FLAMES elimination to determine the term
  const resultTerm = eliminateTerms(uniqueCharsCount);
  
  // Calculate ASCII sum for percentage
  const asciiSum = calculateAsciiSum(name1, name2);
  
  // Get percentage based on term range
  const percentage = getPercentageForTerm(resultTerm, asciiSum);
  
  // Get description for the term
  const description = getTermDescription(resultTerm);
  
  return {
    percentage,
    loveTerm: resultTerm,
    description
  };
};
