import { useState, useEffect } from 'react';
import { kpiData, barData, pieData } from '../data/initialData';

type AnalyticsFilter = 'Monthly' | 'Quarterly' | 'Yearly';

export function useAnalytics() {
  const [filter, setFilter] = useState<AnalyticsFilter>('Monthly');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In a real application, you would fetch data from an API here
    setLoading(false);
  }, []);

  const handleExport = () => {
    const exportData = { filter, kpiData, barData, pieData };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-data-${filter.toLowerCase()}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const refreshData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return { 
    filter, 
    setFilter, 
    handleExport, 
    refreshData,
    loading,
    kpiData, 
    barData, 
    pieData 
  };
} 