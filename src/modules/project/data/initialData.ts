interface ProjectRecord {
  id: number;
  title: string;
  description: string;
  status: string;
  teamMember: string;
  startDate?: string;
  endDate?: string;
  progress?: number;
}

type ProjectStatus = 'Backlog' | 'In Progress' | 'Review' | 'Completed';

export const defaultProject: Omit<ProjectRecord, 'id'> = {
  title: '',
  description: '',
  status: 'Backlog',
  teamMember: '',
};

export const mockTeamMembers = ['Elliot', 'Nora', 'Ali', 'Maya'];

export const initialProjects: ProjectRecord[] = [
  {
    id: 1,
    title: 'HR Analytics Dashboard',
    description: 'Create real-time employee analytics dashboard.',
    status: 'In Progress',
    teamMember: 'Elliot',
  },
  {
    id: 2,
    title: 'Recruitment Automation',
    description: 'Implement automation for screening resumes.',
    status: 'Backlog',
    teamMember: 'Ali',
  },
];

export const statuses: ProjectStatus[] = ['Backlog', 'In Progress', 'Review', 'Completed']; 