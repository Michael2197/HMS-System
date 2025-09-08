import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const Procurement: React.FC = () => {
  return (
    <Box p={2} sx={{ width: '85vw', height: '89vh' }}>
      <Typography variant="h4" gutterBottom>Procurement Management</Typography>
      
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>Procurement Overview</Typography>
          <Typography variant="body1" color="textSecondary">
            This is a placeholder for the Procurement module.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Procurement;
