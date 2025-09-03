/**
 * Main Attendance Module Component
 * Optimized and enhanced attendance management system
 */

import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  useTheme,
  alpha
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Schedule as ScheduleIcon,
  TableChart as TableIcon,
  Assessment as AnalyticsIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

// Import our new components
import AttendanceDashboard from './dashboard/AttendanceDashboard';
import CheckInOut from './check-in/CheckInOut';
import AttendanceTable from './tables/AttendanceTable';
import { AttendanceChartsContainer } from './charts/AttendanceCharts';

// Import hooks
import { useAttendance } from '../hooks/useAttendance';
import { useAttendanceAnalytics } from '../hooks/useAttendanceAnalytics';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`attendance-tabpanel-${index}`}
      aria-labelledby={`attendance-tab-${index}`}
      {...other}
      style={{ width: '100%', maxWidth: '100%', overflow: 'visible' }}
    >
      {value === index && (
        <Box sx={{ 
          pt: 3, 
          width: '100%',
          maxWidth: '100%',
          overflow: 'visible'
        }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const AttendanceModule: React.FC = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  
  // Use our enhanced hooks
  const attendanceHook = useAttendance();
  const {
    filteredData,
    isCheckedIn,
    currentLocation,
    loading,
    error,
    sortConfig,
    pagination,
    checkIn,
    checkOut,
    updateSort,
    updatePagination,
    refreshData,
    exportData
  } = attendanceHook;

  // Access properties safely with fallbacks
  const snack = (attendanceHook as any)?.snack || { open: false, message: '', severity: 'info' };
  const handleSnackClose = (attendanceHook as any)?.handleSnackClose || (() => {});
  const geoFencingEnabled = (attendanceHook as any)?.geoFencingEnabled || false;

  const {
    chartData,
    refreshAnalytics
  } = useAttendanceAnalytics();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleExport = async (format: 'csv' | 'excel' | 'pdf' = 'csv') => {
    await exportData(format);
  };

  const handleRefresh = async () => {
    await Promise.all([
      refreshData(),
      refreshAnalytics()
    ]);
  };

  const handleRecordEdit = (record: any) => {
    console.log('Edit record:', record);
    // Implement edit functionality
  };

  const handleRecordDelete = (recordId: string) => {
    console.log('Delete record:', recordId);
    // Implement delete functionality
  };

  return (
    <Box sx={{ 
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
      backgroundColor: theme.palette.background.default,
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      {/* Header with Tabs */}
      <Card 
        sx={{ 
          mb: 2,
          mx: 3,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
          borderRadius: 2,
          width: 'calc(100% - 48px)',
          maxWidth: '100%'
        }}
      >
        <CardContent sx={{ pb: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" fontWeight={700}>
              📍 Attendance Management
            </Typography>
            
            <Box>
              <Tooltip title="Refresh Data">
                <IconButton onClick={handleRefresh} disabled={loading}>
                  <ScheduleIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Settings">
                <IconButton>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 600,
                textTransform: 'none',
                minHeight: 48,
                px: 3
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0'
              }
            }}
          >
            <Tab
              icon={<DashboardIcon />}
              iconPosition="start"
              label="Dashboard"
              id="attendance-tab-0"
              aria-controls="attendance-tabpanel-0"
            />
            <Tab
              icon={<ScheduleIcon />}
              iconPosition="start"
              label="Check In/Out"
              id="attendance-tab-1"
              aria-controls="attendance-tabpanel-1"
            />
            <Tab
              icon={<TableIcon />}
              iconPosition="start"
              label="Records"
              id="attendance-tab-2"
              aria-controls="attendance-tabpanel-2"
            />
            <Tab
              icon={<AnalyticsIcon />}
              iconPosition="start"
              label="Analytics"
              id="attendance-tab-3"
              aria-controls="attendance-tabpanel-3"
            />
          </Tabs>
        </CardContent>
      </Card>

      {/* Tab Content */}
      <Box sx={{ 
        flex: 1, 
        width: '100%',
        maxWidth: '100%',
        overflow: 'visible',
        px: 3,
        minWidth: 0
      }}>
        {/* Dashboard Tab */}
        <TabPanel value={activeTab} index={0}>
          <AttendanceDashboard
            onRefresh={handleRefresh}
            onExport={() => handleExport('pdf')}
            loading={loading}
          />
        </TabPanel>

        {/* Check In/Out Tab */}
        <TabPanel value={activeTab} index={1}>
          <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <CheckInOut
              isCheckedIn={isCheckedIn}
              currentLocation={currentLocation}
              onCheckIn={checkIn}
              onCheckOut={checkOut}
              loading={loading}
              geoFencingEnabled={geoFencingEnabled}
              qrCodeEnabled={false}
            />
          </Box>
        </TabPanel>

        {/* Records Tab */}
        <TabPanel value={activeTab} index={2}>
          <AttendanceTable
            data={filteredData}
            loading={loading}
            sortConfig={sortConfig}
            pagination={pagination}
            onSort={updateSort}
            onPageChange={(page) => updatePagination({ page })}
            onRowsPerPageChange={(pageSize) => updatePagination({ pageSize })}
            onEdit={handleRecordEdit}
            onDelete={handleRecordDelete}
            onExport={(_selectedIds) => handleExport('csv')}
            selectable={true}
            showActions={true}
          />
        </TabPanel>

        {/* Analytics Tab */}
        <TabPanel value={activeTab} index={3}>
          <Box sx={{ 
            width: '100%',
            maxWidth: '100%',
            overflow: 'visible'
          }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Attendance Analytics
            </Typography>
            
            <Box sx={{ 
              display: 'grid', 
              gap: 3, 
              mt: 3,
              width: '100%',
              maxWidth: '100%'
            }}>
              {/* Trend Chart */}
              <AttendanceChartsContainer
                chartType="trend"
                data={chartData.attendanceTrend}
                title="Attendance Trend Over Time"
                height={350}
              />
              
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
                gap: 3,
                width: '100%',
                maxWidth: '100%'
              }}>
                {/* Status Distribution */}
                <AttendanceChartsContainer
                  chartType="distribution"
                  data={chartData.statusDistribution}
                  title="Status Distribution"
                  height={300}
                />
                
                {/* Department Comparison */}
                <AttendanceChartsContainer
                  chartType="departments"
                  data={chartData.departmentComparison}
                  title="Department Performance"
                  height={300}
                />
              </Box>

              {/* Overtime Trend */}
              <AttendanceChartsContainer
                chartType="overtime"
                data={[
                  { date: '2025-01-01', regularHours: 8, overtimeHours: 0 },
                  { date: '2025-01-02', regularHours: 8, overtimeHours: 1 },
                  { date: '2025-01-03', regularHours: 8, overtimeHours: 2 },
                  { date: '2025-01-04', regularHours: 8, overtimeHours: 0.5 },
                  { date: '2025-01-05', regularHours: 7, overtimeHours: 0 }
                ]}
                title="Overtime Hours Trend"
                height={300}
              />
            </Box>
          </Box>
        </TabPanel>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snack.open} 
        autoHideDuration={4000} 
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          severity={snack.severity} 
          sx={{ width: '100%' }}
          onClose={handleSnackClose}
          variant="filled"
        >
          {snack.message}
        </Alert>
      </Snackbar>

      {/* Error handling */}
      {error && (
        <Snackbar 
          open={!!error} 
          autoHideDuration={6000} 
          onClose={() => {/* clear error */}}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            severity="error" 
            sx={{ width: '100%' }}
            variant="filled"
          >
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default AttendanceModule;
