import React from 'react';
import { Box, Typography, Paper, TextField, Button, MenuItem, Divider, List, ListItem, ListItemText } from '@mui/material';
import { useEmployee } from '../hooks/useEmployee';

const Employee: React.FC = () => {
  const {
    profile,
    workTypeOptions,
    shiftOptions,
    requestedWorkType,
    requestedShift,
    requestLog,
    setRequestedWorkType,
    setRequestedShift,
    handleChangeRequest,
  } = useEmployee();

  return (
    <Box p={15}>
      <Typography variant="h5" gutterBottom>
        👤 Employee Profile
      </Typography>

      <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={3}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Personal Information</Typography>
          <TextField fullWidth label="Full Name" value={profile.name} sx={{ mt: 2 }} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Email" value={profile.email} sx={{ mt: 2 }} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Phone" value={profile.phone} sx={{ mt: 2 }} InputProps={{ readOnly: true }} />
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Bank Details</Typography>
          <TextField fullWidth label="Bank Name" value={profile.bank} sx={{ mt: 2 }} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Account Number" value={profile.accountNumber} sx={{ mt: 2 }} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="IFSC Code" value={profile.ifsc} sx={{ mt: 2 }} InputProps={{ readOnly: true }} />
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Current Work Profile</Typography>
          <TextField fullWidth label="Work Type" value={profile.workType} sx={{ mt: 2 }} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Shift" value={profile.shift} sx={{ mt: 2 }} InputProps={{ readOnly: true }} />
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Request Change</Typography>
          <TextField select fullWidth label="New Work Type" value={requestedWorkType} onChange={(e) => setRequestedWorkType(e.target.value)} sx={{ mt: 2 }}>
            {workTypeOptions.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </TextField>
          <TextField select fullWidth label="New Shift" value={requestedShift} onChange={(e) => setRequestedShift(e.target.value)} sx={{ mt: 2 }}>
            {shiftOptions.map((shift) => (
              <MenuItem key={shift} value={shift}>{shift}</MenuItem>
            ))}
          </TextField>
          <Button variant="contained" fullWidth onClick={handleChangeRequest} sx={{ mt: 2 }}>Submit Request</Button>
        </Paper>

        <Box gridColumn={{ xs: '1 / -1', md: '1 / -1' }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Request History</Typography>
            <Divider sx={{ my: 1 }} />
            {requestLog.length > 0 ? (
              <List>
                {requestLog.map((req, idx) => (
                  <ListItem key={idx}>
                    <ListItemText primary={req} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">No change requests submitted yet.</Typography>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Employee; 