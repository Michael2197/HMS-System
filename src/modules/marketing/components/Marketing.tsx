import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const Marketing: React.FC = () => {
  return (
    <Box p={2} sx={{ width: '85vw', height: '89vh' }}>
      <Typography variant="h4" gutterBottom>Marketing Management</Typography>
      
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>Marketing Overview</Typography>
          <Typography variant="body1" color="textSecondary">
            This is a placeholder for the Marketing module.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Marketing;
