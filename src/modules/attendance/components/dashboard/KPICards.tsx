/**
 * KPI Cards Component for Attendance Dashboard
 * Displays key performance indicators with modern design
 */

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  IconButton,
  useTheme,
  alpha,
  Skeleton
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  TrendingFlat as TrendingFlatIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  AccessTime as AccessTimeIcon,
  DateRange as DateRangeIcon,
  Person as PersonIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import type { AttendanceKPI } from '../../types';

// Icon mapping
const iconMap = {
  schedule: ScheduleIcon,
  check: CheckCircleIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  time: AccessTimeIcon,
  date: DateRangeIcon,
  person: PersonIcon,
  default: ScheduleIcon
};

// Color mapping
const colorMap = {
  primary: '#1976d2',
  secondary: '#388e3c',
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3'
};

interface KPICardProps {
  kpi: AttendanceKPI;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  showTrend?: boolean;
  loading?: boolean;
}

export const KPICard: React.FC<KPICardProps> = ({
  kpi,
  onClick,
  size = 'medium',
  showTrend = true,
  loading = false
}) => {
  const theme = useTheme();
  const IconComponent = iconMap[kpi.icon as keyof typeof iconMap] || iconMap.default;
  const color = colorMap[kpi.color] || colorMap.primary;
  
  const getTrendIcon = () => {
    switch (kpi.trend) {
      case 'up':
        return <TrendingUpIcon sx={{ color: theme.palette.success.main, fontSize: 16 }} />;
      case 'down':
        return <TrendingDownIcon sx={{ color: theme.palette.error.main, fontSize: 16 }} />;
      default:
        return <TrendingFlatIcon sx={{ color: theme.palette.grey[500], fontSize: 16 }} />;
    }
  };

  const getTrendColor = () => {
    switch (kpi.trend) {
      case 'up':
        return theme.palette.success.main;
      case 'down':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const cardHeight = {
    small: 120,
    medium: 140,
    large: 160
  };

  const iconSize = {
    small: 24,
    medium: 32,
    large: 40
  };

  if (loading) {
    return (
      <Card 
        sx={{ 
          height: cardHeight[size],
          cursor: onClick ? 'pointer' : 'default',
          transition: 'all 0.3s ease',
          '&:hover': onClick ? {
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows[8]
          } : {}
        }}
      >
        <CardContent sx={{ p: 2, height: '100%' }}>
          <Stack spacing={2} height="100%">
            <Skeleton variant="circular" width={iconSize[size]} height={iconSize[size]} />
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="40%" height={32} />
            <Skeleton variant="rectangular" width="100%" height={20} />
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      sx={{ 
        height: cardHeight[size],
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0.05)} 100%)`,
        borderLeft: `4px solid ${color}`,
        '&:hover': onClick ? {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[8],
          background: `linear-gradient(135deg, ${alpha(color, 0.15)} 0%, ${alpha(color, 0.08)} 100%)`
        } : {}
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 2, height: '100%' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Box
            sx={{
              width: iconSize[size],
              height: iconSize[size],
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 4px 12px ${alpha(color, 0.3)}`
            }}
          >
            <IconComponent 
              sx={{ 
                color: 'white', 
                fontSize: iconSize[size] * 0.6 
              }} 
            />
          </Box>
          <IconButton size="small" sx={{ color: theme.palette.grey[400] }}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Stack>

        <Typography 
          variant={size === 'small' ? 'body2' : 'subtitle2'} 
          color="textSecondary" 
          gutterBottom
          sx={{ 
            fontWeight: 500,
            lineHeight: 1.2,
            mb: 1
          }}
        >
          {kpi.label}
        </Typography>
        
        <Typography 
          variant={size === 'large' ? 'h4' : size === 'medium' ? 'h5' : 'h6'} 
          sx={{ 
            fontWeight: 700,
            color: theme.palette.text.primary,
            lineHeight: 1,
            mb: showTrend ? 1 : 0
          }}
        >
          {kpi.value}
        </Typography>

        {showTrend && (
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {getTrendIcon()}
            <Typography 
              variant="caption" 
              sx={{ 
                color: getTrendColor(),
                fontWeight: 600
              }}
            >
              {kpi.trendPercentage > 0 ? '+' : ''}{kpi.trendPercentage}%
            </Typography>
            <Typography 
              variant="caption" 
              color="textSecondary"
              sx={{ fontWeight: 500 }}
            >
              vs last period
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

interface KPIGridProps {
  kpis: AttendanceKPI[];
  loading?: boolean;
  columns?: 2 | 3 | 4;
  size?: 'small' | 'medium' | 'large';
  onKPIClick?: (kpi: AttendanceKPI) => void;
}

export const KPIGrid: React.FC<KPIGridProps> = ({
  kpis,
  loading = false,
  columns = 4,
  size = 'medium',
  onKPIClick
}) => {
  const gridColumns = {
    2: 'repeat(2, 1fr)',
    3: 'repeat(3, 1fr)',
    4: 'repeat(4, 1fr)'
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: columns <= 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          lg: gridColumns[columns]
        },
        gap: 2,
        mb: 3
      }}
    >
      {loading ? (
        // Show skeleton cards while loading
        Array.from({ length: columns }, (_, index) => (
          <KPICard
            key={index}
            kpi={{
              label: '',
              value: '',
              trend: 'stable',
              trendPercentage: 0,
              icon: 'default',
              color: 'primary'
            }}
            size={size}
            loading={true}
          />
        ))
      ) : (
        kpis.map((kpi, index) => (
          <KPICard
            key={`${kpi.label}-${index}`}
            kpi={kpi}
            size={size}
            onClick={() => onKPIClick?.(kpi)}
          />
        ))
      )}
    </Box>
  );
};

// Quick Stats Component for compact display
export const QuickStats: React.FC<{
  stats: { label: string; value: string; color?: string }[];
  title?: string;
}> = ({ stats, title = "Quick Stats" }) => {
  const theme = useTheme();

  return (
    <Card>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Stack spacing={2}>
          {stats.map((stat, index) => (
            <Stack key={index} direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="textSecondary">
                {stat.label}
              </Typography>
              <Chip
                label={stat.value}
                size="small"
                sx={{
                  backgroundColor: stat.color || theme.palette.primary.main,
                  color: 'white',
                  fontWeight: 600,
                  minWidth: 60
                }}
              />
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

// Compact KPI Card for smaller spaces
export const CompactKPICard: React.FC<{
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
  trend?: { value: number; direction: 'up' | 'down' | 'stable' };
}> = ({ label, value, icon, color = '#1976d2', trend }) => {
  const theme = useTheme();

  return (
    <Card sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            backgroundColor: alpha(color, 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </Box>
        <Box flex={1}>
          <Typography variant="h6" fontWeight={700}>
            {value}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {label}
          </Typography>
          {trend && (
            <Stack direction="row" alignItems="center" spacing={0.5} mt={0.5}>
              {trend.direction === 'up' && <TrendingUpIcon sx={{ fontSize: 16, color: theme.palette.success.main }} />}
              {trend.direction === 'down' && <TrendingDownIcon sx={{ fontSize: 16, color: theme.palette.error.main }} />}
              {trend.direction === 'stable' && <TrendingFlatIcon sx={{ fontSize: 16, color: theme.palette.grey[500] }} />}
              <Typography variant="caption" fontWeight={600}>
                {trend.value > 0 ? '+' : ''}{trend.value}%
              </Typography>
            </Stack>
          )}
        </Box>
      </Stack>
    </Card>
  );
};

export default KPIGrid;
