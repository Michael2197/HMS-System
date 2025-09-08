import { useState, useEffect } from 'react';

export function useMarketing() {
  const [loading, setLoading] = useState(false);
  const [marketingData, setMarketingData] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch marketing data from an API here
    setLoading(false);
  }, []);

  const refreshData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return { 
    loading,
    marketingData,
    refreshData
  };
}
