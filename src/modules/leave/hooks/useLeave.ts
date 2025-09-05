import { useState, useEffect } from 'react';
import { leaveTypes, mockAccruals, mockLeaveHistory, userRole } from '../data/initialData';

interface LeaveEntry {
  id: number;
  type: string;
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason: string;
}

interface UserRole {
  isManager: boolean;
  canApprove: boolean;
}

export function useLeave() {
  const [leaveType, setLeaveType] = useState<string>('Annual');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [history, setHistory] = useState<LeaveEntry[]>(mockLeaveHistory);
  const [role] = useState<UserRole>(userRole);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    setLoading(false);
  }, []);

  const handleSubmit = () => {
    if (!startDate || !endDate || !reason) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newLeave: LeaveEntry = {
      id: Math.max(...history.map(h => h.id)) + 1,
      type: leaveType,
      startDate,
      endDate,
      status: 'Pending',
      reason,
    };
    
    setHistory([newLeave, ...history]);
    setStartDate('');
    setEndDate('');
    setReason('');
  };

  const handleApproval = (id: number, decision: 'Approved' | 'Rejected') => {
    setHistory((prev) => prev.map((e) => (e.id === id ? { ...e, status: decision } : e)));
  };

  const cancelLeave = (id: number) => {
    setHistory(history.filter(leave => leave.id !== id));
  };

  const updateLeave = (id: number, updates: Partial<LeaveEntry>) => {
    setHistory(history.map(leave => 
      leave.id === id 
        ? { ...leave, ...updates }
        : leave
    ));
  };

  return {
    // data
    leaveTypes,
    mockAccruals,
    role,
    history,
    // state
    leaveType,
    startDate,
    endDate,
    reason,
    loading,
    // setters
    setLeaveType,
    setStartDate,
    setEndDate,
    setReason,
    // actions
    handleSubmit,
    handleApproval,
    cancelLeave,
    updateLeave,
  };
} 