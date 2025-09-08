import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const Husbandry: React.FC = () => {
  return (
    <Box p={2} sx={{ width: '85vw', height: '89vh' }}>
      <Typography variant="h4" gutterBottom>Husbandry Management</Typography>
      
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>Livestock Overview</Typography>
          <Typography variant="body1" color="textSecondary">
            This is a placeholder for the Husbandry module.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Husbandry;
