import React from 'react';
import { Box, Typography, TextField, Select, MenuItem, Button, Table, TableHead, TableRow, TableCell, TableBody, Card, CardContent, FormControl, InputLabel } from '@mui/material';
import { useRecruitment } from '../hooks/useRecruitment';

const Recruitment: React.FC = () => {
  const { filters, updateFilter, resetFilters, candidates } = useRecruitment();

  return (
    <Box sx={{ width: '85vw', minHeight: '89vh', backgroundColor: '#f5f5f5', py: 4, px: 5 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
          Candidates
        </Typography>

        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Box sx={{ flex: '1 1 22%' }}>
                <FormControl fullWidth>
                  <InputLabel id="jobtitle-label">Job Title</InputLabel>
                  <Select labelId="jobtitle-label" label="Job Title" value={filters.jobTitle} onChange={(e) => updateFilter('jobTitle', e.target.value)}>
                    <MenuItem value="">Account Assistant</MenuItem>
                    <MenuItem value="1">Automaton Tester</MenuItem>
                    <MenuItem value="2">Chief Executive Officer</MenuItem>
                    <MenuItem value="3">Chief Technical Officer</MenuItem>
                    <MenuItem value="4">Content Specialist</MenuItem>
                    <MenuItem value="5">Head of Support</MenuItem>
                    <MenuItem value="3">IT Manager</MenuItem>
                    <MenuItem value="4">QA Engineer</MenuItem>
                    <MenuItem value="5">HR Manager</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ flex: '1 1 22%' }}>
                <FormControl fullWidth>
                  <InputLabel id="vacancy-label">Vacancy</InputLabel>
                  <Select labelId="vacancy-label" label="Vacancy" value={filters.vacancy} onChange={(e) => updateFilter('vacancy', e.target.value)}>
                    <MenuItem value="">Junior Account Assistant</MenuItem>
                    <MenuItem value="1">Payroll Administrator</MenuItem>
                    <MenuItem value="2">Sales Representative</MenuItem>
                    <MenuItem value="3">Senior QA Lead</MenuItem>
                    <MenuItem value="4">Senior Support Specialist</MenuItem>
                    <MenuItem value="5">Software Engineer</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ flex: '1 1 22%' }}>
                <FormControl fullWidth>
                  <InputLabel id="manager-label">Hiring Manager</InputLabel>
                  <Select labelId="manager-label" label="Hiring Manager" value={filters.hiringManager} onChange={(e) => updateFilter('hiringManager', e.target.value)}>
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="john">John Doe</MenuItem>
                    <MenuItem value="sarah">Sarah Smith</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ flex: '1 1 22%' }}>
                <TextField fullWidth label="Candidate Name" variant="outlined" value={filters.candidateName} onChange={(e) => updateFilter('candidateName', e.target.value)} />
              </Box>

              <Box sx={{ flex: '1 1 22%' }}>
                <TextField fullWidth label="Keywords" variant="outlined" value={filters.keywords} onChange={(e) => updateFilter('keywords', e.target.value)} />
              </Box>

              <Box sx={{ flex: '1 1 22%' }}>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select labelId="status-label" label="Status" value={filters.status} onChange={(e) => updateFilter('status', e.target.value)}>
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Application Initiated">Application Initiated</MenuItem>
                    <MenuItem value="Shortlisted">Shortlisted</MenuItem>
                    <MenuItem value="Interview Scheduled">Interview Scheduled</MenuItem>
                    <MenuItem value="Hired">Hired</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ flex: '1 1 22%' }}>
                <FormControl fullWidth>
                  <InputLabel id="method-label">Method of Application</InputLabel>
                  <Select labelId="method-label" label="Method of Application" value={filters.method} onChange={(e) => updateFilter('method', e.target.value)}>
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="online">Online</MenuItem>
                    <MenuItem value="manual">Manual</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ flex: '1 1 22%' }}>
                <TextField fullWidth label="Date From" type="date" InputLabelProps={{ shrink: true }} value={filters.dateFrom} onChange={(e) => updateFilter('dateFrom', e.target.value)} />
              </Box>

              <Box sx={{ flex: '1 1 22%' }}>
                <TextField fullWidth label="Date To" type="date" InputLabelProps={{ shrink: true }} value={filters.dateTo} onChange={(e) => updateFilter('dateTo', e.target.value)} />
              </Box>
            </Box>

            <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
              <Button variant="contained" sx={{ backgroundColor: '#FF9F43' }}>Search</Button>
              <Button variant="outlined" onClick={resetFilters}>Reset</Button>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Candidate List</Typography>
              <Button variant="contained" sx={{ backgroundColor: '#00B74A' }}>+ Add</Button>
            </Box>

            <Table sx={{ width: '100%' }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#eee' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Job Title</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Vacancy</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Hiring Manager</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Date of Application</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {candidates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">No Records Found</TableCell>
                  </TableRow>
                ) : (
                  candidates.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>{c.name}</TableCell>
                      <TableCell>{c.jobTitle}</TableCell>
                      <TableCell>{c.vacancy}</TableCell>
                      <TableCell>{c.hiringManager}</TableCell>
                      <TableCell>{c.status}</TableCell>
                      <TableCell>{c.appliedAt}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Recruitment; 