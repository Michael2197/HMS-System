import React from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';

interface AddPayslipModalProps {
  open: boolean;
  handleClose: () => void;
  newEmployee: {
    employeeName: string;
    jobTitle: string;
    grossSalary: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddPayslip: () => void;
}

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export const AddPayslipModal: React.FC<AddPayslipModalProps> = ({
  open,
  handleClose,
  newEmployee,
  handleInputChange,
  handleAddPayslip,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2}>Add Payroll Slip</Typography>
        <TextField
          name="employeeName"
          label="Employee Name"
          fullWidth
          margin="dense"
          value={newEmployee.employeeName}
          onChange={handleInputChange}
        />
        <TextField
          name="jobTitle"
          label="Job Title"
          fullWidth
          margin="dense"
          value={newEmployee.jobTitle}
          onChange={handleInputChange}
        />
        <TextField
          name="grossSalary"
          label="Gross Salary"
          type="number"
          fullWidth
          margin="dense"
          value={newEmployee.grossSalary}
          onChange={handleInputChange}
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddPayslip}>Add</Button>
      </Box>
    </Modal>
  );
};


