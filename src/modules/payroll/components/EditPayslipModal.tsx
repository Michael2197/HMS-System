import React from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';

interface EditPayslipModalProps {
  open: boolean;
  handleClose: () => void;
  employee: {
    employeeName: string;
    jobTitle: string;
    grossSalary: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditPayslip: () => void;
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

export const EditPayslipModal: React.FC<EditPayslipModalProps> = ({
  open,
  handleClose,
  employee,
  handleInputChange,
  handleEditPayslip,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2}>Edit Payroll Slip</Typography>
        <TextField
          name="employeeName"
          label="Employee Name"
          fullWidth
          margin="dense"
          value={employee.employeeName}
          onChange={handleInputChange}
        />
        <TextField
          name="jobTitle"
          label="Job Title"
          fullWidth
          margin="dense"
          value={employee.jobTitle}
          onChange={handleInputChange}
        />
        <TextField
          name="grossSalary"
          label="Gross Salary"
          type="number"
          fullWidth
          margin="dense"
          value={employee.grossSalary}
          onChange={handleInputChange}
        />
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button variant="contained" onClick={handleEditPayslip}>
            Save Changes
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}; 