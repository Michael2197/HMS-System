/**
 * Enhanced Attendance Table Component
 * Modern data table with sorting, filtering, pagination, and advanced features
 */

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Avatar,
  Stack,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  useTheme,
  alpha,
  Skeleton
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  GetApp as ExportIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import type { AttendanceRecord, SortConfig, PaginationConfig } from '../../types';
import { AttendanceStatus } from '../../types';

interface AttendanceTableProps {
  data: AttendanceRecord[];
  loading?: boolean;
  sortConfig?: SortConfig;
  pagination?: PaginationConfig;
  onSort?: (config: SortConfig) => void;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  onRowClick?: (record: AttendanceRecord) => void;
  onEdit?: (record: AttendanceRecord) => void;
  onDelete?: (recordId: string) => void;
  onExport?: (selectedIds: string[]) => void;
  selectable?: boolean;
  showActions?: boolean;
}

const statusConfig = {
  [AttendanceStatus.PRESENT]: {
    color: 'success' as const,
    icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
    bgcolor: '#e8f5e8'
  },
  [AttendanceStatus.LATE]: {
    color: 'warning' as const,
    icon: <WarningIcon sx={{ fontSize: 16 }} />,
    bgcolor: '#fff3e0'
  },
  [AttendanceStatus.ABSENT]: {
    color: 'error' as const,
    icon: <ErrorIcon sx={{ fontSize: 16 }} />,
    bgcolor: '#ffebee'
  },
  [AttendanceStatus.HALF_DAY]: {
    color: 'info' as const,
    icon: <ScheduleIcon sx={{ fontSize: 16 }} />,
    bgcolor: '#e3f2fd'
  },
  [AttendanceStatus.REMOTE]: {
    color: 'secondary' as const,
    icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
    bgcolor: '#f3e5f5'
  },
  [AttendanceStatus.SICK_LEAVE]: {
    color: 'error' as const,
    icon: <ErrorIcon sx={{ fontSize: 16 }} />,
    bgcolor: '#ffebee'
  },
  [AttendanceStatus.VACATION]: {
    color: 'info' as const,
    icon: <ScheduleIcon sx={{ fontSize: 16 }} />,
    bgcolor: '#e0f2f1'
  }
};

export const AttendanceTable: React.FC<AttendanceTableProps> = ({
  data,
  loading = false,
  sortConfig,
  pagination,
  onSort,
  onPageChange,
  onRowsPerPageChange,
  onRowClick,
  onEdit,
  onDelete,
  onExport,
  selectable = false,
  showActions = true
}) => {
  const theme = useTheme();
  const [selected, setSelected] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(data.map(record => record.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelectOne = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleSort = (field: keyof AttendanceRecord) => {
    const direction = sortConfig?.field === field && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    onSort?.({ field, direction });
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, record: AttendanceRecord) => {
    setAnchorEl(event.currentTarget);
    setSelectedRecord(record);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRecord(null);
  };

  const filteredData = data.filter(record =>
    record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.date.includes(searchTerm)
  );

  const formatTime = (time?: string) => {
    if (!time || time === '-') return '-';
    return time;
  };

  const formatWorkingHours = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const getEmployeeInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Stack spacing={2}>
            {Array.from({ length: 10 }).map((_, index) => (
              <Stack key={index} direction="row" spacing={2} alignItems="center">
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="text" width="20%" />
                <Skeleton variant="text" width="15%" />
                <Skeleton variant="text" width="15%" />
                <Skeleton variant="text" width="20%" />
                <Skeleton variant="rectangular" width={80} height={32} />
              </Stack>
            ))}
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent sx={{ p: 0 }}>
        {/* Table Header */}
        <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography variant="h6" fontWeight={600}>
              Attendance Records
            </Typography>
            
            <Stack direction="row" spacing={2} alignItems="center">
              {/* Search */}
              <TextField
                size="small"
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: 20 }} />
                    </InputAdornment>
                  )
                }}
                sx={{ minWidth: 200 }}
              />
              
              {/* Filter Button */}
              <Button
                variant="outlined"
                startIcon={<FilterIcon />}
                size="small"
              >
                Filter
              </Button>
              
              {/* Export Button */}
              {selected.length > 0 && (
                <Button
                  variant="contained"
                  startIcon={<ExportIcon />}
                  size="small"
                  onClick={() => onExport?.(selected)}
                >
                  Export ({selected.length})
                </Button>
              )}
            </Stack>
          </Stack>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {selectable && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selected.length > 0 && selected.length < data.length}
                      checked={data.length > 0 && selected.length === data.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                )}
                
                <TableCell>
                  <TableSortLabel
                    active={sortConfig?.field === 'employeeName'}
                    direction={sortConfig?.direction}
                    onClick={() => handleSort('employeeName')}
                  >
                    <Typography variant="subtitle2" fontWeight={600}>
                      Employee
                    </Typography>
                  </TableSortLabel>
                </TableCell>
                
                <TableCell>
                  <TableSortLabel
                    active={sortConfig?.field === 'date'}
                    direction={sortConfig?.direction}
                    onClick={() => handleSort('date')}
                  >
                    <Typography variant="subtitle2" fontWeight={600}>
                      Date
                    </Typography>
                  </TableSortLabel>
                </TableCell>
                
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Check In
                  </Typography>
                </TableCell>
                
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Check Out
                  </Typography>
                </TableCell>
                
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Working Hours
                  </Typography>
                </TableCell>
                
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Status
                  </Typography>
                </TableCell>
                
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Location
                  </Typography>
                </TableCell>
                
                {showActions && (
                  <TableCell align="center">
                    <Typography variant="subtitle2" fontWeight={600}>
                      Actions
                    </Typography>
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            
            <TableBody>
              {filteredData.map((record) => {
                const isSelected = selected.includes(record.id);
                const config = statusConfig[record.status] || statusConfig[AttendanceStatus.PRESENT];
                
                return (
                  <TableRow
                    key={record.id}
                    hover
                    selected={isSelected}
                    onClick={() => onRowClick?.(record)}
                    sx={{
                      cursor: onRowClick ? 'pointer' : 'default',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.04)
                      }
                    }}
                  >
                    {selectable && (
                      <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={isSelected}
                          onChange={() => handleSelectOne(record.id)}
                        />
                      </TableCell>
                    )}
                    
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            backgroundColor: theme.palette.primary.main,
                            fontSize: '0.75rem',
                            fontWeight: 600
                          }}
                        >
                          {getEmployeeInitials(record.employeeName)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {record.employeeName}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            ID: {record.employeeId}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(record.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </Typography>
                    </TableCell>
                    
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace">
                        {formatTime(record.checkIn)}
                      </Typography>
                      {record.lateMinutes > 0 && (
                        <Typography variant="caption" color="warning.main">
                          +{record.lateMinutes}m late
                        </Typography>
                      )}
                    </TableCell>
                    
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace">
                        {formatTime(record.checkOut)}
                      </Typography>
                      {record.earlyDepartureMinutes > 0 && (
                        <Typography variant="caption" color="warning.main">
                          -{record.earlyDepartureMinutes}m early
                        </Typography>
                      )}
                    </TableCell>
                    
                    <TableCell>
                      <Stack spacing={0.5}>
                        <Typography variant="body2" fontWeight={600}>
                          {formatWorkingHours(record.workingHours)}
                        </Typography>
                        {record.overtimeHours > 0 && (
                          <Typography variant="caption" color="info.main">
                            +{formatWorkingHours(record.overtimeHours)} OT
                          </Typography>
                        )}
                      </Stack>
                    </TableCell>
                    
                    <TableCell>
                      <Chip
                        icon={config.icon}
                        label={record.status}
                        color={config.color}
                        variant="outlined"
                        size="small"
                        sx={{
                          backgroundColor: config.bgcolor,
                          fontWeight: 600,
                          '& .MuiChip-icon': {
                            color: 'inherit'
                          }
                        }}
                      />
                    </TableCell>
                    
                    <TableCell>
                      <Typography variant="body2">
                        {record.location}
                      </Typography>
                      {record.checkInMethod && (
                        <Typography variant="caption" color="textSecondary">
                          via {record.checkInMethod}
                        </Typography>
                      )}
                    </TableCell>
                    
                    {showActions && (
                      <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, record)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {pagination && (
          <TablePagination
            component="div"
            count={pagination.total}
            page={pagination.page}
            onPageChange={(_, page) => onPageChange?.(page)}
            rowsPerPage={pagination.pageSize}
            onRowsPerPageChange={(e) => onRowsPerPageChange?.(parseInt(e.target.value, 10))}
            rowsPerPageOptions={[10, 25, 50, 100]}
            sx={{
              borderTop: `1px solid ${theme.palette.divider}`,
              '.MuiTablePagination-toolbar': {
                px: 3
              }
            }}
          />
        )}

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => { onRowClick?.(selectedRecord!); handleMenuClose(); }}>
            <ViewIcon sx={{ mr: 1, fontSize: 16 }} />
            View Details
          </MenuItem>
          <MenuItem onClick={() => { onEdit?.(selectedRecord!); handleMenuClose(); }}>
            <EditIcon sx={{ mr: 1, fontSize: 16 }} />
            Edit Record
          </MenuItem>
          <MenuItem 
            onClick={() => { onDelete?.(selectedRecord!.id); handleMenuClose(); }}
            sx={{ color: 'error.main' }}
          >
            <DeleteIcon sx={{ mr: 1, fontSize: 16 }} />
            Delete Record
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default AttendanceTable;
