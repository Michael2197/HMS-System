import { useState, useEffect } from 'react';
import { initialProfile, workTypeOptions, shiftOptions } from '../data/initialData';

interface EmployeeProfile {
  name: string;
  email: string;
  phone: string;
  bank: string;
  accountNumber: string;
  ifsc: string;
  workType: string;
  shift: string;
}

export function useEmployee() {
  const [profile, setProfile] = useState<EmployeeProfile>(initialProfile);
  const [requestedWorkType, setRequestedWorkType] = useState<string>('');
  const [requestedShift, setRequestedShift] = useState<string>('');
  const [requestLog, setRequestLog] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    setLoading(false);
  }, []);

  const handleChangeRequest = () => {
    if (requestedWorkType || requestedShift) {
      const entry = `Requested ${requestedWorkType ? `Work Type: ${requestedWorkType}` : ''}${requestedShift ? ` | Shift: ${requestedShift}` : ''}`;
      setRequestLog((prev) => [entry, ...prev]);
      setRequestedWorkType('');
      setRequestedShift('');
    }
  };

  const updateProfile = (updates: Partial<EmployeeProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const clearRequestLog = () => {
    setRequestLog([]);
  };

  return {
    profile,
    workTypeOptions,
    shiftOptions,
    requestedWorkType,
    requestedShift,
    requestLog,
    loading,
    setRequestedWorkType,
    setRequestedShift,
    handleChangeRequest,
    updateProfile,
    clearRequestLog,
  };
} 