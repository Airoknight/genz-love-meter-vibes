
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export type LoveResultRecord = {
  id: number;
  name1: string;
  name2: string;
  love_percentage: number;
  love_term: string;
  created_at: string;
};

export const useLoveCalculations = (limit: number = 10) => {
  const [recentCalculations, setRecentCalculations] = useState<LoveResultRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCalculations, setTotalCalculations] = useState<number>(0);

  // Fetch recent calculations
  const fetchRecentCalculations = async () => {
    try {
      setLoading(true);
      
      // Get recent calculations
      const { data, error: fetchError } = await supabase
        .from('love_results')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);
        
      if (fetchError) {
        throw new Error(fetchError.message);
      }
      
      // Get total count
      const { count, error: countError } = await supabase
        .from('love_results')
        .select('*', { count: 'exact', head: true });
        
      if (countError) {
        throw new Error(countError.message);
      }
      
      setRecentCalculations(data || []);
      setTotalCalculations(count || 0);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Error fetching love calculations:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on component mount
  useEffect(() => {
    fetchRecentCalculations();
  }, [limit]);

  return {
    recentCalculations,
    totalCalculations,
    loading,
    error,
    refresh: fetchRecentCalculations,
  };
};
