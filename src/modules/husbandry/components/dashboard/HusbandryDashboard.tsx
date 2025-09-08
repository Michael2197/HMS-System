import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const HusbandryDashboard: React.FC = () => {
  return (
    <Box p={2} sx={{ width: '85vw', height: '89vh' }}>
      <Typography variant="h4" gutterBottom>Husbandry Dashboard</Typography>
      
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>Livestock Overview</Typography>
          <Typography variant="body1" color="textSecondary">
            This is a placeholder for the Husbandry Dashboard.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HusbandryDashboard;
