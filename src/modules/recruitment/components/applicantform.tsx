import React, { useState } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useApplicantForm } from '../hooks/useapplicantform';

const ApplicantForm: React.FC = () => {
  const { applicant, setApplicant, addApplicant, resetApplicant } =
    useApplicantForm();

  return (
    <Dialog open={true} onClose={resetApplicant}>
      <DialogTitle>Add New Applicant</DialogTitle>
      <DialogContent className="p-4">
        <TextField
          label="Name"
          value={applicant.name}
          onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Email"
          type="email"
          value={applicant.email}
          onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Phone"
          type="tel"
          value={applicant.phone}
          onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions className="p-4">
        <Button onClick={resetApplicant} color="secondary">
          Cancel
        </Button>
        <Button onClick={addApplicant} variant="contained" color="primary">
          Add Applicant
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplicantForm;