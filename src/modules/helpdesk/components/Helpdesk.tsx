import React from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Button, 
  List, 
  ListItem, 
  ListItemText,
  Chip,
  Stack
} from '@mui/material';
import { useHelpdesk } from '../hooks/useHelpdesk';

const Helpdesk: React.FC = () => {
  const { tickets, loading } = useHelpdesk();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'error';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'error';
      case 'In Progress': return 'warning';
      case 'Resolved': return 'success';
      case 'Closed': return 'default';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading helpdesk data...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Helpdesk Management
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Handle and resolve employee queries through the helpdesk.
      </Typography>

      <Box>
        <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Support Tickets</Typography>
              <Button variant="contained" color="primary">
                Create New Ticket
              </Button>
            </Box>
            
            <List>
              {tickets.map((ticket) => (
                <ListItem key={ticket.id} divider>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1">{ticket.title}</Typography>
                        <Stack direction="row" spacing={1}>
                          <Chip 
                            label={ticket.priority} 
                            color={getPriorityColor(ticket.priority) as any}
                            size="small"
                          />
                          <Chip 
                            label={ticket.status} 
                            color={getStatusColor(ticket.status) as any}
                            size="small"
                          />
                        </Stack>
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {ticket.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Category: {ticket.category} | Created: {new Date(ticket.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
    </Box>
  );
};

export default Helpdesk;
