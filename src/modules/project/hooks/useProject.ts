import { useState, useEffect } from 'react';
import { initialProjects, defaultProject, statuses, mockTeamMembers } from '../data/initialData';

interface ProjectRecord {
  id: number;
  title: string;
  description: string;
  status: string;
  teamMember: string;
  startDate: string;
  endDate: string;
  progress: number;
}

export function useProject() {
  const [projects, setProjects] = useState<ProjectRecord[]>(initialProjects);
  const [open, setOpen] = useState(false);
  const [newProject, setNewProject] = useState<Omit<ProjectRecord, 'id'>>(defaultProject);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In a real application, you would fetch data from an API here
    setLoading(false);
  }, []);

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => {
    setNewProject(defaultProject);
    setOpen(false);
  };

  const handleCreateProject = () => {
    setProjects((prev) => [...prev, { ...newProject, id: Date.now() }]);
    handleCloseDialog();
  };

  const updateProject = (id: number, updates: Partial<ProjectRecord>) => {
    setProjects(projects.map(project => 
      project.id === id 
        ? { ...project, ...updates }
        : project
    ));
  };

  const deleteProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const handleExportProjects = () => {
    const exportData = JSON.stringify(projects, null, 2);
    console.log('🔐 Exporting projects to secure API: ', exportData);
    alert('Export submitted to secure API gateway.');
  };

  const filteredProjects = projects.filter((project) => {
    const matchesStatus = filterStatus === 'All' || project.status === filterStatus;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return {
    projects: filteredProjects,
    open,
    newProject,
    filterStatus,
    searchTerm,
    loading,
    statuses,
    mockTeamMembers,
    setNewProject,
    setFilterStatus,
    setSearchTerm,
    handleOpenDialog,
    handleCloseDialog,
    handleCreateProject,
    updateProject,
    deleteProject,
    handleExportProjects,
  };
} 