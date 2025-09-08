import React, { useState, useEffect } from 'react';
import { usePayrollData, usePayrollFilters } from '../hooks/usePayroll';
import { calculatePayroll } from '../utils/payrollCalculations';
import {
  Box,
  Typography,
  Alert,
  Snackbar,
  Backdrop,
  CircularProgress,
  Fade,
  Button,
  Paper,
  TextField,
} from '@mui/material';
import { Add, Download, Print, Search } from '@mui/icons-material';

import { SummaryCards } from './SummaryCards';
import { PayrollTable } from './PayrollTable';
import { AddPayslipModal } from './AddPayslipModal';
import { EditPayslipModal } from './EditPayslipModal';

const Payroll: React.FC = () => {
  const { employees, payslips, loading: apiLoading, error, addEmployee, editEmployee, deleteEmployee, addPayslip, editPayslip, deletePayslip } = usePayrollData();
  const { filterName, setFilterName, filterJob, setFilterJob } = usePayrollFilters();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info'>('success');
  
  const [newEmployee, setNewEmployee] = useState({
    employeeName: '',
    jobTitle: '',
    grossSalary: '',
  });
  const [editEmployeeData, setEditEmployeeData] = useState({
    employeeName: '',
    jobTitle: '',
    grossSalary: '',
  });

  // Transform data for display using proper payroll calculations
  const transformDataForDisplay = () => {
    if (!employees || employees.length === 0) return [];
    
    return employees.map(employee => {
      // Convert gross_salary to number with safety check
      const grossSalary = Number(employee.gross_salary) || 0;
      
      // Use the proper payroll calculation function
      const calculatedData = calculatePayroll({
        employeeName: employee.name,
        jobTitle: employee.job_title,
        grossSalary: grossSalary,
      });
      
      return calculatedData;
    });
  };

  const data = transformDataForDisplay();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditOpen = (index: number) => {
    // Find the actual employee in the original data array
    const employee = paginatedData[index];
    const actualIndex = data.findIndex(d => 
      d.employeeName === employee.employeeName && 
      d.jobTitle === employee.jobTitle && 
      d.grossSalary === employee.grossSalary
    );
    
    setEditEmployeeData({
      employeeName: employee.employeeName,
      jobTitle: employee.jobTitle,
      grossSalary: employee.grossSalary.toString(),
    });
    setSelectedIndex(actualIndex);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedIndex(-1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditEmployeeData({ ...editEmployeeData, [e.target.name]: e.target.value });
  };

  const handleAddPayslip = () => {
    try {
      addEmployee({
        name: newEmployee.employeeName,
        job_title: newEmployee.jobTitle,
        gross_salary: parseFloat(newEmployee.grossSalary),
        hire_date: new Date().toISOString().split('T')[0],
        status: 'active'
      });
      setNewEmployee({ employeeName: '', jobTitle: '', grossSalary: '' });
      handleClose();
      showNotification('Employee added successfully!', 'success');
    } catch (error) {
      showNotification('Failed to add employee. Please try again.', 'error');
    }
  };

  const handleEditPayslip = () => {
    try {
      if (selectedIndex !== -1 && employees[selectedIndex]) {
        const employee = employees[selectedIndex];
        editEmployee(employee.id, {
          name: editEmployeeData.employeeName,
          job_title: editEmployeeData.jobTitle,
          gross_salary: parseFloat(editEmployeeData.grossSalary),
        });
        handleEditClose();
        showNotification('Employee updated successfully!', 'success');
      }
    } catch (error) {
      showNotification('Failed to update employee. Please try again.', 'error');
    }
  };

  const handleDeletePayslip = (index: number) => {
    try {
      // Find the actual employee in the original data array
      const employee = paginatedData[index];
      const actualIndex = data.findIndex(d => 
        d.employeeName === employee.employeeName && 
        d.jobTitle === employee.jobTitle && 
        d.grossSalary === employee.grossSalary
      );
      deletePayslip(actualIndex);
      showNotification('Employee deleted successfully!', 'success');
    } catch (error) {
      showNotification('Failed to delete employee. Please try again.', 'error');
    }
  };

  const handleCardClick = (type: string) => {
    showNotification(`Viewing ${type} details`, 'info');
    
  };

  const showNotification = (message: string, severity: 'success' | 'error' | 'info') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  
  const [sortBy, setSortBy] = useState<string>('employeeName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  // Pagination
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  // Filter data based on search
  const filteredData = data.filter((d) =>
    d.employeeName.toLowerCase().includes(filterName.toLowerCase()) &&
    d.jobTitle.toLowerCase().includes(filterJob.toLowerCase())
  );

  // Sort
  const sortedData = [...filteredData].sort((a, b) => {
  const aValue = (a as any)[sortBy];
  const bValue = (b as any)[sortBy];
    if (aValue === undefined || bValue === undefined) return 0;
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return sortDirection === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  // Pagination
  const paginatedData = sortedData.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  const totalGross = filteredData.reduce((sum, d) => sum + d.grossSalary, 0);
  const totalDeductions = filteredData.reduce(
    (sum, d) => sum + d.employeeInsuranceShare + d.solidarityContribution,
    0
  );
  const totalTax = filteredData.reduce((sum, d) => sum + d.monthlyTaxWithheld, 0);
  const totalFinalNet = filteredData.reduce((sum, d) => sum + d.finalNetSalary, 0);

  const exportCSV = () => {
    const header = [
      'Employee,Job Title,Gross Salary,Insurance Salary,Company Share,Employee Share,Solidarity,Net After Insurance,Personal Exemption for Period,Taxable Base,Annual Tax,Monthly Tax,Withheld Payroll Tax,Final Net Salary,Tier',
    ];
    const rows = filteredData.map((d) =>
      [
        d.employeeName,
        d.jobTitle,
        d.grossSalary.toFixed(2),
        d.insuranceSalary.toFixed(2),
        d.companyInsuranceShare.toFixed(2),
        d.employeeInsuranceShare.toFixed(2),
        d.solidarityContribution.toFixed(2),
        d.netSalaryAfterInsurance.toFixed(2),
        d.personalExemptionForPeriod.toFixed(2),
        d.taxableBaseForPeriod.toFixed(2),
        d.annualTax.toFixed(2),
        d.monthlyTaxWithheld.toFixed(2),
        d.withheldPayrollTax.toFixed(2),
        d.finalNetSalary.toFixed(2),
        d.tier,
      ].join(',')
    );
    const csv = header.concat(rows).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payroll_report.csv';
    a.click();
    showNotification('Payroll data exported successfully!', 'success');
  };

  const handlePrint = () => {
    window.print();
    showNotification('Print dialog opened!', 'info');
  };

  if (apiLoading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={apiLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Fade in={!apiLoading}>
      <Box sx={{ width: '85vw', minHeight: '90vh', backgroundColor: '#f5f5f5', py: 4, px: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#1976d2' }}>
          Payroll Dashboard
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <SummaryCards
          totalGross={totalGross}
          totalDeductions={totalDeductions}
          totalTax={totalTax}
          totalFinalNet={totalFinalNet}
          employeeCount={data.length}
          onCardClick={handleCardClick}
        />

        {/* Search and Action Bar */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              label="Search Employee"
              size="small"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              sx={{ minWidth: 200 }}
              InputProps={{
                startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
              }}
            />
            <TextField
              label="Search Job Title"
              size="small"
              value={filterJob}
              onChange={(e) => setFilterJob(e.target.value)}
              sx={{ minWidth: 200 }}
            />
            <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleOpen}
                sx={{ minWidth: 140 }}
              >
                Add Employee
              </Button>
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={exportCSV}
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
          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredData.length} of {data.length} employee{filteredData.length !== 1 ? 's' : ''}
              {filterName && ` matching "${filterName}"`}
              {filterJob && ` in "${filterJob}"`}
            </Typography>
          </Box>
        </Paper>

        <PayrollTable
          filteredData={paginatedData}
          sortBy={sortBy}
          sortDirection={sortDirection}
          setSortBy={setSortBy}
          setSortDirection={setSortDirection}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          totalCount={filteredData.length}
          onEdit={handleEditOpen}
          onDelete={handleDeletePayslip}
        />

        <AddPayslipModal
          open={open}
          handleClose={handleClose}
          newEmployee={newEmployee}
          handleInputChange={handleInputChange}
          handleAddPayslip={handleAddPayslip}
        />

        <EditPayslipModal
          open={editOpen}
          handleClose={handleEditClose}
          employee={editEmployeeData}
          handleInputChange={handleEditInputChange}
          handleEditPayslip={handleEditPayslip}
        />

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Fade>
  );
};

export default Payroll;


