import React from 'react';
import { Box, Button, Card, CardContent, CardActions, Chip, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField, Typography, InputLabel, FormControl, Toolbar } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useProject } from '../hooks/useProject';

const Project: React.FC = () => {
  const {
    projects,
    open,
    newProject,
    filterStatus,
    searchTerm,
    statuses,
    mockTeamMembers,
    setNewProject,
    setFilterStatus,
    setSearchTerm,
    handleOpenDialog,
    handleCloseDialog,
    handleCreateProject,
    handleExportProjects,
  } = useProject();

  return (
    <Box p={2} sx={{ width: '85vw', height: '89vh' }}>
      <Toolbar />
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">📁 Project Management</Typography>
        <Box display="flex" gap={2}>
          <Button variant="outlined" onClick={handleExportProjects}>Export Projects</Button>
          <Button variant="contained" startIcon={<Add />} onClick={handleOpenDialog}>New Project</Button>
        </Box>
      </Box>

      <Box display="flex" gap={2} mb={3}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select label="Status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <MenuItem value="All">All</MenuItem>
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField label="Search by Title" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </Box>

      <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(4, 1fr)' }} gap={3}>
        {statuses.map((status) => (
          <Box key={status}>
            <Typography variant="h6" mb={1}>{status}</Typography>
            {projects.filter((p) => p.status === status).map((project) => (
              <Card key={project.id} sx={{ mb: 2, backgroundColor: '#f9f9f9' }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">{project.title}</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>{project.description}</Typography>
                  <Chip label={project.teamMember} color="primary" />
                </CardContent>
                <CardActions>
                  <Button size="small" disabled>Edit</Button>
                  <Button size="small" disabled>Move</Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        ))}
      </Box>

      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <TextField label="Title" fullWidth sx={{ mt: 2 }} value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} />
          <TextField label="Description" fullWidth multiline rows={3} sx={{ mt: 2 }} value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <Select label="Status" value={newProject.status} onChange={(e) => setNewProject({ ...newProject, status: e.target.value as any })}>
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Team Member</InputLabel>
            <Select label="Team Member" value={newProject.teamMember} onChange={(e) => setNewProject({ ...newProject, teamMember: e.target.value })}>
              {mockTeamMembers.map((member) => (
                <MenuItem key={member} value={member}>{member}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateProject}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Project; 