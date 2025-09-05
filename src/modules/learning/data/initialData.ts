interface Course {
  id: number;
  title: string;
  status: 'In Progress' | 'Completed' | 'Not Started';
  description?: string;
  progress?: number;
}

interface Certification {
  id: number;
  name: string;
  issuedDate: string;
  expiryDate?: string;
  status: 'Active' | 'Expired' | 'Pending';
}

export const mockCourses: Course[] = [
  { 
    id: 1, 
    title: 'React Basics', 
    status: 'In Progress',
    description: 'Learn the fundamentals of React development',
    progress: 65
  },
  { 
    id: 2, 
    title: 'Advanced TypeScript', 
    status: 'Completed',
    description: 'Master TypeScript for enterprise applications',
    progress: 100
  },
  { 
    id: 3, 
    title: 'UI/UX Fundamentals', 
    status: 'Not Started',
    description: 'Design principles and user experience best practices',
    progress: 0
  },
];

export const mockCertifications: Certification[] = [
  {
    id: 1,
    name: 'AWS Certified Developer',
    issuedDate: '2023-01-15',
    expiryDate: '2026-01-15',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Google Cloud Professional',
    issuedDate: '2022-06-20',
    status: 'Active'
  }
];
