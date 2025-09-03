/**
 * Main Attendance Dashboard Component
 * Comprehensive dashboard with KPIs, charts, and real-time data
 */

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  IconButton,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  useTheme,
  alpha,
  Fade,
  Zoom
} from '@mui/material';
import {
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  AccessTime as AccessTimeIcon,
  DateRange as DateRangeIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
  Download as DownloadIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { KPIGrid, CompactKPICard } from './KPICards';
import { AttendanceChartsContainer } from '../charts/AttendanceCharts';
import type { AttendanceKPI } from '../../types';

interface AttendanceDashboardProps {
  onRefresh?: () => void;
  onExport?: () => void;
  onSettings?: () => void;
  loading?: boolean;
}

// Mock data for demonstration - in real app, this would come from hooks/API
const mockKPIs: AttendanceKPI[] = [
  {
    label: 'Total Working Hours',
    value: '168.5h',
    trend: 'up',
    trendPercentage: 5.2,
    icon: 'time',
    color: 'primary'
  },
  {
    label: 'Attendance Rate',
    value: '94.8%',
    trend: 'up',
    trendPercentage: 2.1,
    icon: 'check',
    color: 'success'
  },
  {
    label: 'Late Arrivals',
    value: '3',
    trend: 'down',
    trendPercentage: -12.5,
    icon: 'warning',
    color: 'warning'
  },
  {
    label: 'Overtime Hours',
    value: '12.5h',
    trend: 'up',
    trendPercentage: 8.3,
    icon: 'schedule',
    color: 'secondary'
  }
];

const mockTrendData = [
  { date: '2025-01-01', value: 8.5 },
  { date: '2025-01-02', value: 8.2 },
  { date: '2025-01-03', value: 9.1 },
  { date: '2025-01-04', value: 8.8 },
  { date: '2025-01-05', value: 7.9 },
  { date: '2025-01-06', value: 8.6 },
  { date: '2025-01-07', value: 8.4 }
];

const mockStatusData = [
  { name: 'Present', value: 85, count: 85 },
  { name: 'Late', value: 8, count: 8 },
  { name: 'Absent', value: 5, count: 5 },
  { name: 'Remote', value: 2, count: 2 }
];

const mockRecentActivity = [
  {
    id: 1,
    user: 'John Doe',
    action: 'Checked in',
    time: '09:15 AM',
    location: 'Office',
    status: 'success'
  },
  {
    id: 2,
    user: 'Jane Smith',
    action: 'Checked out',
    time: '06:30 PM',
    location: 'Office',
    status: 'success'
  },
  {
    id: 3,
    user: 'Mike Johnson',
    action: 'Late arrival',
    time: '09:45 AM',
    location: 'Office',
    status: 'warning'
  },
  {
    id: 4,
    user: 'Sarah Wilson',
    action: 'Started break',
    time: '12:00 PM',
    location: 'Office',
    status: 'info'
  }
];

export const AttendanceDashboard: React.FC<AttendanceDashboardProps> = ({
  onRefresh,
  onExport,
  onSettings,
  loading = false
}) => {
  const theme = useTheme();
  const [selectedPeriod] = useState<'today' | 'week' | 'month'>('today');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return theme.palette.success.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'error':
        return theme.palette.error.main;
      default:
        return theme.palette.info.main;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon sx={{ fontSize: 16 }} />;
      case 'warning':
        return <WarningIcon sx={{ fontSize: 16 }} />;
      case 'error':
        return <ErrorIcon sx={{ fontSize: 16 }} />;
      default:
        return <ScheduleIcon sx={{ fontSize: 16 }} />;
    }
  };

  return (
    <Box sx={{ 
      width: '100%',
      maxWidth: '100%',
      backgroundColor: theme.palette.background.default,
      overflow: 'visible'
    }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Attendance Dashboard
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Real-time attendance tracking and analytics
          </Typography>
        </Box>
        
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<DateRangeIcon />}
            size="small"
            onClick={() => {/* Open date picker */}}
          >
            {selectedPeriod === 'today' ? 'Today' : selectedPeriod === 'week' ? 'This Week' : 'This Month'}
          </Button>
          <IconButton onClick={onRefresh} size="small">
            <RefreshIcon />
          </IconButton>
          <IconButton size="small">
            <NotificationsIcon />
          </IconButton>
          <IconButton onClick={onExport} size="small">
            <DownloadIcon />
          </IconButton>
          <IconButton onClick={onSettings} size="small">
            <SettingsIcon />
          </IconButton>
        </Stack>
      </Stack>

      {/* KPI Cards */}
      <Fade in timeout={300}>
        <Box mb={3}>
          <KPIGrid
            kpis={mockKPIs}
            loading={loading}
            columns={4}
            size="medium"
            onKPIClick={(kpi) => {
              // Handle KPI click
              console.log('KPI clicked:', kpi.label);
            }}
          />
        </Box>
      </Fade>

      {/* Charts Section */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: '1fr', lg: '2fr 1fr' }, 
        gap: 3, 
        mb: 3,
        width: '100%',
        maxWidth: '100%'
      }}>
        <Zoom in timeout={400}>
          <Box>
            <AttendanceChartsContainer
              chartType="trend"
              data={mockTrendData}
              title="Daily Attendance Trend"
              height={320}
            />
          </Box>
        </Zoom>
        
        <Zoom in timeout={500}>
          <Box>
            <AttendanceChartsContainer
              chartType="distribution"
              data={mockStatusData}
              title="Today's Status"
              height={320}
            />
          </Box>
        </Zoom>
      </Box>

      {/* Secondary Charts and Stats */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
        gap: 3, 
        mb: 3,
        width: '100%',
        maxWidth: '100%'
      }}>
        <AttendanceChartsContainer
          chartType="heatmap"
          data={[
            { day: 'Mon', hours: 8.5, status: 'Present' },
            { day: 'Tue', hours: 8.2, status: 'Present' },
            { day: 'Wed', hours: 9.1, status: 'Present' },
            { day: 'Thu', hours: 8.8, status: 'Present' },
            { day: 'Fri', hours: 7.9, status: 'Late' },
            { day: 'Sat', hours: 0, status: 'Absent' },
            { day: 'Sun', hours: 0, status: 'Absent' }
          ]}
          title="Weekly Pattern"
          height={280}
        />
        
        <AttendanceChartsContainer
          chartType="departments"
          data={[
            { department: 'Engineering', attendanceRate: 96, avgHours: 8.5, employeeCount: 25 },
            { department: 'Marketing', attendanceRate: 92, avgHours: 8.2, employeeCount: 15 },
            { department: 'Sales', attendanceRate: 89, avgHours: 8.8, employeeCount: 20 },
            { department: 'HR', attendanceRate: 94, avgHours: 8.1, employeeCount: 8 }
          ]}
          title="Department Performance"
          height={280}
        />
      </Box>

      {/* Bottom Section */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
        gap: 3,
        width: '100%',
        maxWidth: '100%'
      }}>
        {/* Recent Activity */}
        <Card>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={600}>
                Recent Activity
              </Typography>
              <Button size="small" onClick={() => {}}>
                View All
              </Button>
            </Stack>
            
            <List sx={{ p: 0 }}>
              {mockRecentActivity.map((activity, index) => (
                <React.Fragment key={activity.id}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          backgroundColor: alpha(getStatusColor(activity.status), 0.1),
                          color: getStatusColor(activity.status)
                        }}
                      >
                        {getStatusIcon(activity.status)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Typography variant="body2" fontWeight={600} component="span">
                            {activity.user}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="span">
                            {activity.action}
                          </Typography>
                        </span>
                      }
                      secondary={
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                          <Typography variant="caption" color="textSecondary" component="span">
                            {activity.time}
                          </Typography>
                          <Chip
                            label={activity.location}
                            size="small"
                            variant="outlined"
                            sx={{ height: 20 }}
                          />
                        </span>
                      }
                    />
                  </ListItem>
                  {index < mockRecentActivity.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Stack spacing={2}>
          <CompactKPICard
            label="Average Check-in Time"
            value="09:12 AM"
            icon={<AccessTimeIcon sx={{ color: '#1976d2' }} />}
            color="#1976d2"
            trend={{ value: 5, direction: 'up' }}
          />
          <CompactKPICard
            label="Perfect Attendance Streak"
            value="12 days"
            icon={<TrendingUpIcon sx={{ color: '#4caf50' }} />}
            color="#4caf50"
            trend={{ value: 20, direction: 'up' }}
          />
          <CompactKPICard
            label="Total Employees"
            value="68"
            icon={<PeopleIcon sx={{ color: '#ff9800' }} />}
            color="#ff9800"
            trend={{ value: 0, direction: 'stable' }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default AttendanceDashboard;
