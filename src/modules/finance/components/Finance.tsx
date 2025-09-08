import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const Finance: React.FC = () => {
  return (
    <Box p={2} sx={{ width: '85vw', height: '89vh' }}>
      <Typography variant="h4" gutterBottom>Finance Management</Typography>
      
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>Financial Overview</Typography>
          <Typography variant="body1" color="textSecondary">
            This is a placeholder for the Finance module.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Finance;
