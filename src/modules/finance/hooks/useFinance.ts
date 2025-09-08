import { useState, useEffect } from 'react';

export function useFinance() {
  const [loading, setLoading] = useState(false);
  const [financeData, setFinanceData] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch finance data from an API here
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
    financeData,
    refreshData
  };
}
