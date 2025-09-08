import React from 'react';
import { Box, Typography, Card, CardContent, MenuItem, Select, InputLabel, FormControl, Button } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download as DownloadIcon } from '@mui/icons-material';
import { useAnalytics } from '../hooks/useAnalytics';
import { COLORS } from '../data/initialData';

const Analytics: React.FC = () => {
  const { filter, setFilter, handleExport, kpiData, barData, pieData } = useAnalytics();

  return (
    <Box p={2} sx={{ width: '85vw', height: '89vh' }}>
      <Typography variant="h4" gutterBottom>Analytics Dashboard</Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} mb={3}>
        <FormControl size="small">
          <InputLabel id="filter-label">Filter</InputLabel>
          <Select labelId="filter-label" value={filter} label="Filter" onChange={(e) => setFilter(e.target.value as any)} sx={{ minWidth: 140 }}>
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Quarterly">Quarterly</MenuItem>
            <MenuItem value="Yearly">Yearly</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleExport} sx={{ textTransform: 'none' }}>Export Data</Button>
      </Box>

      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        {kpiData.map((kpi) => (
          <Box key={kpi.label} flex="1 1 calc(25% - 16px)" minWidth={200}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>{kpi.label}</Typography>
                <Typography variant="h5">{kpi.value}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <Box display="flex" flexWrap="wrap" gap={3}>
        <Box flex="1 1 65%" minWidth={300}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>Hiring & Exits Over Time</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Hires" fill="#8884d8" />
                  <Bar dataKey="Exits" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>
        <Box flex="1 1 30%" minWidth={250}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>Employees by Department</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Analytics; 