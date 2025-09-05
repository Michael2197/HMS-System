interface Ticket {
  id: number;
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  category: 'Technical' | 'HR' | 'Payroll' | 'General';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export const mockTickets: Ticket[] = [
  {
    id: 1,
    title: 'Password Reset Request',
    description: 'Unable to access my account, need password reset',
    status: 'Open',
    priority: 'Medium',
    category: 'Technical',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    createdBy: 'john.doe@company.com'
  },
  {
    id: 2,
    title: 'Payroll Query',
    description: 'Incorrect salary amount in last month\'s payslip',
    status: 'In Progress',
    priority: 'High',
    category: 'Payroll',
    assignedTo: 'hr.team@company.com',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-15T09:15:00Z',
    createdBy: 'jane.smith@company.com'
  },
  {
    id: 3,
    title: 'Leave Application',
    description: 'Need to apply for annual leave next month',
    status: 'Resolved',
    priority: 'Low',
    category: 'HR',
    assignedTo: 'hr.team@company.com',
    createdAt: '2024-01-13T11:45:00Z',
    updatedAt: '2024-01-14T16:30:00Z',
    createdBy: 'mike.wilson@company.com'
  }
];
