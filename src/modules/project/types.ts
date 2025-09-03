export type ProjectStatus = 'Backlog' | 'In Progress' | 'Review' | 'Completed';

export type ProjectRecord = {
  id: number;
  title: string;
  description: string;
  status: ProjectStatus;
  teamMember: string;
}; 