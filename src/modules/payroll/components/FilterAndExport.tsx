import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Autocomplete,
  Chip,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Search,
  FilterList,
  Download,
  Add,
  Clear,
  Refresh,
  Save,
  Print,
} from '@mui/icons-material';

interface FilterAndExportProps {
  filterName: string;
  setFilterName: (value: string) => void;
  filterJob: string;
  setFilterJob: (value: string) => void;
  exportCSV: () => void;
  handleOpen: () => void;
  data: any[];
  onQuickFilter?: (filter: string) => void;
}

export const FilterAndExport: React.FC<FilterAndExportProps> = ({
  filterName,
  setFilterName,
  filterJob,
  setFilterJob,
  exportCSV,
  handleOpen,
  data,
  onQuickFilter,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 100000]);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Get unique job titles for autocomplete
  const uniqueJobs = Array.from(new Set(data.map(item => item.jobTitle))).sort();
  const uniqueNames = Array.from(new Set(data.map(item => item.employeeName))).sort();

  const handleExport = () => {
    exportCSV();
    setSnackbarMessage('Payroll data exported successfully!');
    setSnackbarOpen(true);
  };

  const handlePrint = () => {
    window.print();
    setSnackbarMessage('Print dialog opened!');
    setSnackbarOpen(true);
  };

  const handleClearFilters = () => {
    setFilterName('');
    setFilterJob('');
    setSalaryRange([0, 100000]);
    setSelectedJobs([]);
    setSnackbarMessage('All filters cleared!');
    setSnackbarOpen(true);
  };

  const quickFilters = [
    { label: 'High Earners', filter: 'high-earners' },
    { label: 'New Employees', filter: 'new-employees' },
    { label: 'Management', filter: 'management' },
    { label: 'Contractors', filter: 'contractors' },
  ];

  return (
    <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Search & Filters
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Advanced Filters">
            <IconButton
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              color={showAdvancedFilters ? 'primary' : 'default'}
            >
              <FilterList />
            </IconButton>
          </Tooltip>
          <Tooltip title="Clear All Filters">
            <IconButton onClick={handleClearFilters} color="error">
              <Clear />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton onClick={() => window.location.reload()}>
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Quick Filters */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
          Quick Filters:
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {quickFilters.map((filter) => (
            <Chip
              key={filter.filter}
              label={filter.label}
              size="small"
              clickable
              onClick={() => onQuickFilter?.(filter.filter)}
              sx={{ '&:hover': { backgroundColor: 'primary.light', color: 'white' } }}
            />
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Main Search and Actions */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <Autocomplete
          freeSolo
          options={uniqueNames}
          value={filterName}
          onChange={(_, newValue) => setFilterName(newValue || '')}
          onInputChange={(_, newInputValue) => setFilterName(newInputValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Employee"
              size="small"
              sx={{ minWidth: 200 }}
              InputProps={{
                ...params.InputProps,
                startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
              }}
            />
          )}
        />

        <Autocomplete
          freeSolo
          options={uniqueJobs}
          value={filterJob}
          onChange={(_, newValue) => setFilterJob(newValue || '')}
          onInputChange={(_, newInputValue) => setFilterJob(newInputValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Job Title"
              size="small"
              sx={{ minWidth: 200 }}
            />
          )}
        />

        <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpen}
            sx={{ minWidth: 120 }}
          >
            Add Employee
          </Button>
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={handleExport}
            sx={{ minWidth: 120 }}
          >
            Export CSV
          </Button>
          <Button
            variant="outlined"
            startIcon={<Print />}
            onClick={handlePrint}
            sx={{ minWidth: 100 }}
          >
            Print
          </Button>
        </Box>
      </Box>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Advanced Filters
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Autocomplete
              multiple
              options={uniqueJobs}
              value={selectedJobs}
              onChange={(_, newValue) => setSelectedJobs(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Filter by Job Titles"
                  size="small"
                  sx={{ minWidth: 250 }}
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    size="small"
                    {...getTagProps({ index })}
                  />
                ))
              }
            />

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value=""
                label="Sort By"
                onChange={() => {}}
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="salary">Salary</MenuItem>
                <MenuItem value="job">Job Title</MenuItem>
                <MenuItem value="tax">Tax Amount</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Min Salary"
              type="number"
              size="small"
              value={salaryRange[0]}
              onChange={(e) => setSalaryRange([Number(e.target.value), salaryRange[1]])}
              sx={{ width: 120 }}
            />

            <TextField
              label="Max Salary"
              type="number"
              size="small"
              value={salaryRange[1]}
              onChange={(e) => setSalaryRange([salaryRange[0], Number(e.target.value)])}
              sx={{ width: 120 }}
            />
          </Box>
        </Box>
      )}

      {/* Results Summary */}
      <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="body2" color="text.secondary">
          Showing {data.length} employee{data.length !== 1 ? 's' : ''}
          {filterName && ` matching "${filterName}"`}
          {filterJob && ` in "${filterJob}"`}
        </Typography>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};


