/**
 * Modern Chart Components for Attendance Module
 * Using Recharts for better visualization and interactivity
 */

import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart
} from 'recharts';
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  Chip,
  Stack
} from '@mui/material';
import type { ChartDataPoint } from '../../types';

// Color palette for charts
const CHART_COLORS = {
  primary: '#1976d2',
  secondary: '#388e3c',
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3',
  gradient: ['#1976d2', '#42a5f5', '#64b5f6'],
  status: {
    Present: '#4caf50',
    Late: '#ff9800',
    Absent: '#f44336',
    'Half Day': '#2196f3',
    'Sick Leave': '#9c27b0',
    Vacation: '#00bcd4',
    Remote: '#795548'
  }
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label, formatter }: any) => {
  const theme = useTheme();
  
  if (active && payload && payload.length) {
    return (
      <Card sx={{ 
        minWidth: 200,
        boxShadow: theme.shadows[8],
        border: `1px solid ${theme.palette.divider}`
      }}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            {formatter ? formatter(label) : label}
          </Typography>
          {payload.map((entry: any, index: number) => (
            <Stack key={`tooltip-${index}-${entry.name || entry.dataKey}`} direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: entry.color
                }}
              />
              <Typography variant="body2" color="textSecondary">
                {entry.name}:
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {entry.value}
              </Typography>
            </Stack>
          ))}
        </CardContent>
      </Card>
    );
  }
  return null;
};

// Attendance Trend Line Chart
export const AttendanceTrendChart: React.FC<{
  data: ChartDataPoint[];
  title?: string;
  height?: number;
}> = ({ data, title = "Attendance Trend", height = 300 }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ width: '100%', maxWidth: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              stroke={theme.palette.text.secondary}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke={theme.palette.text.secondary}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={CHART_COLORS.primary}
              strokeWidth={3}
              dot={{ fill: CHART_COLORS.primary, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: CHART_COLORS.primary, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Weekly Attendance Heatmap using Bar Chart
export const WeeklyHeatmapChart: React.FC<{
  data: { day: string; hours: number; status: string }[];
  title?: string;
  height?: number;
}> = ({ data, title = "Weekly Attendance Pattern", height = 300 }) => {
  return (
    <Card sx={{ width: '100%', maxWidth: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="hours" 
              fill={CHART_COLORS.primary}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Status Distribution Pie Chart
export const StatusDistributionChart: React.FC<{
  data: { name: string; value: number; count: number }[];
  title?: string;
  height?: number;
}> = ({ data, title = "Attendance Status Distribution", height = 300 }) => {
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        fontWeight={600}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card sx={{ width: '100%', maxWidth: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={CHART_COLORS.status[entry.name as keyof typeof CHART_COLORS.status] || CHART_COLORS.primary} 
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <Stack direction="row" spacing={1} flexWrap="wrap" mt={2}>
          {data.map((entry) => (
            <Chip
              key={entry.name}
              label={`${entry.name}: ${entry.count}`}
              size="small"
              sx={{
                backgroundColor: CHART_COLORS.status[entry.name as keyof typeof CHART_COLORS.status] || CHART_COLORS.primary,
                color: 'white',
                fontWeight: 500
              }}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

// Monthly Overview Composed Chart
export const MonthlyOverviewChart: React.FC<{
  data: { date: string; present: number; absent: number; late: number; hours: number }[];
  title?: string;
  height?: number;
}> = ({ data, title = "Monthly Attendance Overview", height = 400 }) => {
  return (
    <Card sx={{ width: '100%', maxWidth: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <ResponsiveContainer width="100%" height={height}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar yAxisId="left" dataKey="present" stackId="a" fill={CHART_COLORS.success} name="Present" />
            <Bar yAxisId="left" dataKey="late" stackId="a" fill={CHART_COLORS.warning} name="Late" />
            <Bar yAxisId="left" dataKey="absent" stackId="a" fill={CHART_COLORS.error} name="Absent" />
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="hours" 
              stroke={CHART_COLORS.primary} 
              strokeWidth={3}
              name="Working Hours"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Department Comparison Chart
export const DepartmentComparisonChart: React.FC<{
  data: { department: string; attendanceRate: number; avgHours: number; employeeCount: number }[];
  title?: string;
  height?: number;
}> = ({ data, title = "Department Attendance Comparison", height = 300 }) => {
  return (
    <Card sx={{ width: '100%', maxWidth: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="department" type="category" width={120} />
            <Tooltip
              content={<CustomTooltip />}
              formatter={(value: any, name: string) => [
                `${value}${name === 'attendanceRate' ? '%' : name === 'avgHours' ? ' hrs' : ''}`,
                name === 'attendanceRate' ? 'Attendance Rate' : 
                name === 'avgHours' ? 'Avg Hours' : 'Employees'
              ]}
            />
            <Bar 
              dataKey="attendanceRate" 
              fill={CHART_COLORS.primary}
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Overtime Trend Area Chart
export const OvertimeTrendChart: React.FC<{
  data: { date: string; regularHours: number; overtimeHours: number }[];
  title?: string;
  height?: number;
}> = ({ data, title = "Overtime Trend", height = 300 }) => {
  return (
    <Card sx={{ width: '100%', maxWidth: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="regularHours"
              stackId="1"
              stroke={CHART_COLORS.primary}
              fill={CHART_COLORS.primary}
              fillOpacity={0.7}
              name="Regular Hours"
            />
            <Area
              type="monotone"
              dataKey="overtimeHours"
              stackId="1"
              stroke={CHART_COLORS.warning}
              fill={CHART_COLORS.warning}
              fillOpacity={0.7}
              name="Overtime Hours"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Main Chart Container Component
export const AttendanceChartsContainer: React.FC<{
  chartType: 'trend' | 'heatmap' | 'distribution' | 'overview' | 'departments' | 'overtime';
  data: any;
  title?: string;
  height?: number;
  interactive?: boolean;
}> = ({ chartType, data, title, height = 300, interactive: _interactive = true }) => {
  const renderChart = () => {
    switch (chartType) {
      case 'trend':
        return <AttendanceTrendChart data={data} title={title} height={height} />;
      case 'heatmap':
        return <WeeklyHeatmapChart data={data} title={title} height={height} />;
      case 'distribution':
        return <StatusDistributionChart data={data} title={title} height={height} />;
      case 'overview':
        return <MonthlyOverviewChart data={data} title={title} height={height} />;
      case 'departments':
        return <DepartmentComparisonChart data={data} title={title} height={height} />;
      case 'overtime':
        return <OvertimeTrendChart data={data} title={title} height={height} />;
      default:
        return <AttendanceTrendChart data={data} title={title} height={height} />;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {renderChart()}
    </Box>
  );
};

export default AttendanceChartsContainer;
