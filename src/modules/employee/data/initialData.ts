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

export const initialProfile: EmployeeProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 234 567 890',
  bank: 'ABC Bank',
  accountNumber: '1234567890',
  ifsc: 'ABC0001234',
  workType: 'Hybrid',
  shift: 'Morning Shift',
};

export const workTypeOptions = ['On-site', 'Remote', 'Hybrid'];
export const shiftOptions = ['Morning Shift', 'Evening Shift', 'Night Shift']; 