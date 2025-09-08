import React from 'react';
import { Box, Typography, TextField, Select, MenuItem, Button, Table, TableHead, TableRow, TableCell, TableBody, Card, CardContent, FormControl, InputLabel, Checkbox, FormControlLabel } from '@mui/material';
import { usePerformance } from '../hooks/usePerformance';

const Performance: React.FC = () => {
  const { filters, updateFilter, resetFilters } = usePerformance();

  return (
    <Box sx={{ width: '85vw', minHeight: '89vh', backgroundColor: '#f5f5f5', py: 4, px: 5 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
          Evaluate Performance Reviews
        </Typography>

        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Box sx={{ flex: '1 1 22%' }}>
                <TextField fullWidth label="Employee Name" variant="outlined" value={filters.employeeName} onChange={(e) => updateFilter('employeeName', e.target.value)} />
              </Box>
              <Box sx={{ flex: '1 1 22%' }}>
                <FormControl fullWidth>
                  <InputLabel id="include-label">Include</InputLabel>
                  <Select labelId="include-label" label="Include" value={filters.include} onChange={(e) => updateFilter('include', e.target.value)}>
                    <MenuItem value="">Current Employees Only</MenuItem>
                    <MenuItem value="Current and Past Employees">Current and Past Employees</MenuItem>
                    <MenuItem value="Past Employees Only">Past Employees Only</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flex: '1 1 22%' }}>
                <FormControl fullWidth>
                  <InputLabel id="subunit-label">Sub Unit</InputLabel>
                  <Select labelId="subunit-label" label="Sub Unit" value={filters.subUnit} onChange={(e) => updateFilter('subUnit', e.target.value)}>
                    <MenuItem value="">Administration</MenuItem>
                    <MenuItem value="Engineering">Engineering</MenuItem>
                    <MenuItem value="Development">Development</MenuItem>
                    <MenuItem value="Quality Assurance">Quality Assurance</MenuItem>
                    <MenuItem value="TechOps">TechOps</MenuItem>
                    <MenuItem value="Human Resources">Human Resources</MenuItem>
                    <MenuItem value="Client Services">Client Services</MenuItem>
                    <MenuItem value="Technical Support">Technical Support</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flex: '1 1 22%' }}>
                <FormControl fullWidth>
                  <InputLabel id="jobtitle-label">Job Title</InputLabel>
                  <Select labelId="jobtitle-label" label="Job Title" value={filters.jobTitle} onChange={(e) => updateFilter('jobTitle', e.target.value)}>
                    <MenuItem value="">Account Assistant</MenuItem>
                    <MenuItem value="Automaton Tester">Automaton Tester</MenuItem>
                    <MenuItem value="Chief Executive Officer">Chief Executive Officer</MenuItem>
                    <MenuItem value="Chief Technical Officer">Chief Technical Officer</MenuItem>
                    <MenuItem value="Content Specialist">Content Specialist</MenuItem>
                    <MenuItem value="Head of Support">Head of Support</MenuItem>
                    <MenuItem value="IT Manager">IT Manager</MenuItem>
                    <MenuItem value="QA Engineer">QA Engineer</MenuItem>
                    <MenuItem value="HR Manager">HR Manager</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flex: '1 1 22%' }}>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Review Status</InputLabel>
                  <Select labelId="status-label" label="Review Status" value={filters.reviewStatus} onChange={(e) => updateFilter('reviewStatus', e.target.value)}>
                    <MenuItem value="">Activated</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flex: '1 1 22%', display: 'flex', alignItems: 'center' }}>
                <FormControlLabel control={<Checkbox checked={filters.includePastEmployees} onChange={(e) => updateFilter('includePastEmployees', e.target.checked)} />} label="Include Past Employees" />
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
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Review List</Typography>
              <Button variant="contained" sx={{ backgroundColor: '#00B74A' }}>+ Add</Button>
            </Box>

            <Table sx={{ width: '100%' }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#eee' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Employee</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Job Title</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Sub Unit</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Reviewer</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5} align="center">No Records Found</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Performance; 