import React from 'react';
import { Box, Typography, Paper, TextField, Button, MenuItem, Table, TableHead, TableBody, TableRow, TableCell, Chip, Divider, Card, CardContent } from '@mui/material';
import { useLeave } from '../hooks/useLeave';

const Leave: React.FC = () => {
  const {
    leaveTypes,
    mockAccruals,
    role,
    history,
    leaveType,
    startDate,
    endDate,
    reason,
    setLeaveType,
    setStartDate,
    setEndDate,
    setReason,
    handleSubmit,
    handleApproval,
  } = useLeave();

  return (
    <Box p={8}>
      <Typography variant="h5" gutterBottom>🌴 Leave Management</Typography>

      <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={3}>
        <Box>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Apply for Leave</Typography>
            <TextField select fullWidth label="Leave Type" value={leaveType} onChange={(e) => setLeaveType(e.target.value)} sx={{ mt: 2 }}>
              {leaveTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </TextField>
            <TextField fullWidth label="Start Date" type="date" InputLabelProps={{ shrink: true }} value={startDate} onChange={(e) => setStartDate(e.target.value)} sx={{ mt: 2 }} />
            <TextField fullWidth label="End Date" type="date" InputLabelProps={{ shrink: true }} value={endDate} onChange={(e) => setEndDate(e.target.value)} sx={{ mt: 2 }} />
            <TextField fullWidth label="Reason" multiline rows={3} value={reason} onChange={(e) => setReason(e.target.value)} sx={{ mt: 2 }} />
            <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>Submit Request</Button>
          </Paper>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>Leave Accruals</Typography>
              {Object.entries(mockAccruals).map(([type, days]) => (
                <Typography key={type} variant="body2">{type}: <strong>{days} days</strong></Typography>
              ))}
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Leave History</Typography>
            <Table size="small" sx={{ mt: 2 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Start</TableCell>
                  <TableCell>End</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Approver</TableCell>
                  {role !== 'Employee' && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.type}</TableCell>
                    <TableCell>{entry.start}</TableCell>
                    <TableCell>{entry.end}</TableCell>
                    <TableCell>{entry.reason}</TableCell>
                    <TableCell>
                      <Chip label={entry.status} color={entry.status === 'Approved' ? 'success' : entry.status === 'Rejected' ? 'error' : 'warning'} size="small" />
                    </TableCell>
                    <TableCell>{entry.approver}</TableCell>
                    {role !== 'Employee' && entry.status === 'Pending' && (
                      <TableCell>
                        <Button size="small" color="success" onClick={() => handleApproval(entry.id, 'Approved')}>Approve</Button>
                        <Button size="small" color="error" onClick={() => handleApproval(entry.id, 'Rejected')}>Reject</Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          <Paper sx={{ p: 2, mt: 3 }}>
            <Typography variant="h6">Leave Calendar (Mock)</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2">🗓 July 2025: John Doe is on <strong>Annual Leave</strong> from 1st to 5th.</Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Leave; 