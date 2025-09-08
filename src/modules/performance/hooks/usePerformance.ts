import { useState, useEffect } from 'react';
import { initialFilters } from '../data/initialData';

interface PerformanceFilters {
  employeeName: string;
  include: string;
  subUnit: string;
  jobTitle: string;
  reviewStatus: string;
  includePastEmployees: boolean;
}

interface PerformanceReview {
  id: number;
  employeeName: string;
  jobTitle: string;
  subUnit: string;
  reviewer: string;
  status: string;
  reviewDate: string;
  rating: number;
}

export function usePerformance() {
  const [filters, setFilters] = useState<PerformanceFilters>(initialFilters);
  const [reviews, setReviews] = useState<PerformanceReview[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    setLoading(false);
  }, []);

  const updateFilter = <K extends keyof PerformanceFilters>(key: K, value: PerformanceFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilters(initialFilters);

  const addReview = (review: Omit<PerformanceReview, 'id'>) => {
    const newReview = {
      ...review,
      id: Math.max(...reviews.map(r => r.id)) + 1
    };
    setReviews([...reviews, newReview]);
  };

  const updateReview = (id: number, updates: Partial<PerformanceReview>) => {
    setReviews(reviews.map(review => 
      review.id === id 
        ? { ...review, ...updates }
        : review
    ));
  };

  const deleteReview = (id: number) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  const filteredReviews = reviews.filter(review => {
    if (filters.employeeName && !review.employeeName.toLowerCase().includes(filters.employeeName.toLowerCase())) return false;
    if (filters.jobTitle && review.jobTitle !== filters.jobTitle) return false;
    if (filters.subUnit && review.subUnit !== filters.subUnit) return false;
    if (filters.reviewStatus && review.status !== filters.reviewStatus) return false;
    return true;
  });

  return {
    filters,
    reviews: filteredReviews,
    loading,
    updateFilter,
    resetFilters,
    addReview,
    updateReview,
    deleteReview,
  };
} 