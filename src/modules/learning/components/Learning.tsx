import React from 'react';
import { Box, Typography, Paper, Grid, Button, List, ListItem, ListItemText, LinearProgress } from '@mui/material';
import { useLearning } from '../hooks/useLearning';

const Learning: React.FC = () => {
  const { courses, certifications, loading } = useLearning();

  if (loading) {
    return (
      <Box p={8}>
        <Typography>Loading learning data...</Typography>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Typography variant="h5" gutterBottom>
        📚 Learning & Development
      </Typography>

      <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(2, 1fr)' }} gap={3}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Your Courses</Typography>
          <List>
            {courses.map((course) => (
              <ListItem key={course.id}>
                <ListItemText
                  primary={course.title}
                  secondary={
                    <Box>
                      <Typography variant="body2">Status: {course.status}</Typography>
                      {course.progress !== undefined && (
                        <Box sx={{ mt: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={course.progress} 
                            sx={{ height: 8, borderRadius: 4 }}
                          />
                          <Typography variant="caption">{course.progress}%</Typography>
                        </Box>
                      )}
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Certifications</Typography>
          <List>
            {certifications.map((cert) => (
              <ListItem key={cert.id}>
                <ListItemText
                  primary={cert.name}
                  secondary={`Status: ${cert.status} | Issued: ${cert.issuedDate}`}
                />
              </ListItem>
            ))}
          </List>
          <Button variant="contained" sx={{ mt: 2 }}>
            Upload Certificate
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default Learning;
