interface LeaveEntry {
  id: number;
  type: string;
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason: string;
}

interface LeaveAccruals {
  Annual: number;
  Sick: number;
  Maternity: number;
  Unpaid: string;
}

interface UserRole {
  isManager: boolean;
  canApprove: boolean;
}

export const leaveTypes: string[] = ['Annual', 'Sick', 'Maternity', 'Unpaid'];

export const mockAccruals: LeaveAccruals = {
  Annual: 10,
  Sick: 5,
  Maternity: 90,
  Unpaid: 'Unlimited',
};

export const mockLeaveHistory: LeaveEntry[] = [
  { id: 1, type: 'Annual', startDate: '2025-07-01', endDate: '2025-07-05', reason: 'Vacation', status: 'Approved' },
  { id: 2, type: 'Sick', startDate: '2025-07-10', endDate: '2025-07-11', reason: 'Fever', status: 'Pending' },
];

export const userRole: UserRole = { isManager: true, canApprove: true }; 