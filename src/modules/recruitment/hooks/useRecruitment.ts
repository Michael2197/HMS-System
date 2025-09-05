import { useState, useEffect } from 'react';
import { initialCandidates, initialFilters } from '../data/initialData';

interface RecruitmentFilters {
  jobTitle: string;
  vacancy: string;
  hiringManager: string;
  candidateName: string;
  keywords: string;
  status: string;
  method: string;
  dateFrom: string;
  dateTo: string;
}

interface Candidate {
  id: number;
  name: string;
  jobTitle: string;
  status: string;
  applicationDate: string;
  hiringManager: string;
  method: string;
}

export function useRecruitment() {
  const [filters, setFilters] = useState<RecruitmentFilters>(initialFilters);
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In a real application, you would fetch data from an API here
    setLoading(false);
  }, []);

  const resetFilters = () => setFilters(initialFilters);

  const updateFilter = <K extends keyof RecruitmentFilters>(key: K, value: RecruitmentFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const addCandidate = (candidate: Omit<Candidate, 'id'>) => {
    const newCandidate = {
      ...candidate,
      id: Math.max(...candidates.map(c => c.id)) + 1
    };
    setCandidates([...candidates, newCandidate]);
  };

  const updateCandidate = (id: number, updates: Partial<Candidate>) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === id 
        ? { ...candidate, ...updates }
        : candidate
    ));
  };

  const deleteCandidate = (id: number) => {
    setCandidates(candidates.filter(candidate => candidate.id !== id));
  };

  const filteredCandidates = candidates.filter(candidate => {
    if (filters.jobTitle && candidate.jobTitle !== filters.jobTitle) return false;
    if (filters.status && candidate.status !== filters.status) return false;
    if (filters.hiringManager && candidate.hiringManager !== filters.hiringManager) return false;
    if (filters.candidateName && !candidate.name.toLowerCase().includes(filters.candidateName.toLowerCase())) return false;
    if (filters.keywords && !candidate.name.toLowerCase().includes(filters.keywords.toLowerCase())) return false;
    return true;
  });

  return {
    filters,
    candidates: filteredCandidates,
    loading,
    resetFilters,
    updateFilter,
    addCandidate,
    updateCandidate,
    deleteCandidate,
  };
} 