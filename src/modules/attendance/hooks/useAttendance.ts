import { useState, useEffect } from 'react';
import { initialAttendanceRecords } from '../data/initialData';
import { checkGeoLocation } from '../services/attendanceService';
import type { 
  AttendanceRecord,
  AttendanceFilters,
  AttendanceKPI,
  AttendanceStatistics,
  SortConfig,
  PaginationConfig,
  GeoLocation,
  UseAttendanceReturn
} from '../types';
import { 
  CheckInMethod,
  AttendanceStatus,
  LocationType,
  ShiftType
} from '../types';

// Legacy interface for backward compatibility
// interface LegacyAttendanceRecord {
//   date: string;
//   checkIn: string;
//   checkOut: string;
//   location: string;
//   status: 'Present' | 'Late' | 'Absent';
// }

export function useAttendance(): UseAttendanceReturn {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [geoFencingEnabled, setGeoFencingEnabled] = useState(true);

  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Present' | 'Late' | 'Absent'>('All');
  const [snack, setSnack] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<GeoLocation | null>(null);
  const [filters, setFilters] = useState<AttendanceFilters>({
    dateRange: 'month'
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'date',
    direction: 'desc'
  });
  const [pagination, setPagination] = useState<PaginationConfig>({
    page: 0,
    pageSize: 10,
    total: 0
  });

  // Initialize data and location
  useEffect(() => {
    initializeAttendance();
    getCurrentLocation();
  }, []);

  const initializeAttendance = async () => {
    setLoading(true);
    try {
      // Convert legacy data to new format
      const convertedData: AttendanceRecord[] = initialAttendanceRecords.map((record, index) => ({
        id: `legacy-${index}`,
        employeeId: 'EMP001', // Mock employee ID
        employeeName: 'Current User',
        date: record.date,
        checkIn: record.checkIn !== '-' ? record.checkIn : undefined,
        checkOut: record.checkOut !== '-' ? record.checkOut : undefined,
        location: record.location === 'Office' ? LocationType.OFFICE : LocationType.REMOTE,
        status: record.status as AttendanceStatus,
        workingHours: record.checkIn !== '-' && record.checkOut !== '-' ? 8 : 0,
        overtimeHours: 0,
        breakTime: 60,
        lateMinutes: record.status === 'Late' ? 15 : 0,
        earlyDepartureMinutes: 0,
        shiftType: ShiftType.MORNING,
        checkInMethod: CheckInMethod.MANUAL,
        isManuallyAdjusted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
      
      setAttendanceData(convertedData);
      setPagination(prev => ({ ...prev, total: convertedData.length }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load attendance data');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date().toISOString()
        });
      } catch (err) {
        console.log('Geolocation not available');
      }
    }
  };

  const triggerSnack = (message: string, severity: 'success' | 'error') => {
    setSnack({ open: true, message, severity });
  };

  const handleSnackClose = () => setSnack((s) => ({ ...s, open: false }));

  // Enhanced check-in function
  const checkIn = async (location?: GeoLocation, method: CheckInMethod = CheckInMethod.MANUAL) => {
    setLoading(true);
    try {
      if (geoFencingEnabled && !checkGeoLocation()) {
        throw new Error('Outside geo-fenced area!');
      }


      const now = new Date();
      const newRecord: AttendanceRecord = {
        id: `checkin-${Date.now()}`,
        employeeId: 'EMP001',
        employeeName: 'Current User',
        date: now.toISOString().split('T')[0],
        checkIn: now.toLocaleTimeString('en-US', { hour12: false }),
        location: location ? LocationType.OFFICE : LocationType.REMOTE,
        status: AttendanceStatus.PRESENT,
        workingHours: 0,
        overtimeHours: 0,
        breakTime: 0,
        lateMinutes: 0,
        earlyDepartureMinutes: 0,
        shiftType: ShiftType.MORNING,
        checkInMethod: method,
        isManuallyAdjusted: false,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString()
      };

      setAttendanceData(prev => [newRecord, ...prev]);
      setIsCheckedIn(true);
      triggerSnack('Checked in successfully!', 'success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Check-in failed');
      triggerSnack(err instanceof Error ? err.message : 'Check-in failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Enhanced check-out function
  const checkOut = async (_location?: GeoLocation) => {
    setLoading(true);
    try {
      const now = new Date();
      const time = now.toLocaleTimeString('en-US', { hour12: false });
      
      setAttendanceData(prev => 
        prev.map(record => {
          if (record.id.startsWith('checkin-') && !record.checkOut) {
            const checkInTime = new Date(`${record.date}T${record.checkIn}`);
            const checkOutTime = now;
            const workingHours = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);
            
            return {
              ...record,
              checkOut: time,
              workingHours: Math.max(0, workingHours),
              overtimeHours: Math.max(0, workingHours - 8),
              updatedAt: now.toISOString()
            };
          }
          return record;
        })
      );
      
      setIsCheckedIn(false);
      triggerSnack('Checked out successfully!', 'success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Check-out failed');
      triggerSnack(err instanceof Error ? err.message : 'Check-out failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort data
  const filteredData = attendanceData.filter(record => {
    if (statusFilter !== 'All' && record.status !== statusFilter) return false;
    // Add more filter logic here based on filters state
    return true;
  });

  // Calculate statistics
  const statistics: AttendanceStatistics = {
    totalWorkingDays: attendanceData.length,
    presentDays: attendanceData.filter(r => r.status === AttendanceStatus.PRESENT).length,
    absentDays: attendanceData.filter(r => r.status === AttendanceStatus.ABSENT).length,
    lateDays: attendanceData.filter(r => r.status === AttendanceStatus.LATE).length,
    attendancePercentage: attendanceData.length > 0 
      ? (attendanceData.filter(r => r.status === AttendanceStatus.PRESENT || r.status === AttendanceStatus.LATE).length / attendanceData.length) * 100 
      : 0,
    averageWorkingHours: attendanceData.length > 0 
      ? attendanceData.reduce((sum, r) => sum + r.workingHours, 0) / attendanceData.length 
      : 0,
    totalOvertimeHours: attendanceData.reduce((sum, r) => sum + r.overtimeHours, 0),
    averageCheckInTime: '09:15',
    averageCheckOutTime: '18:00',
    perfectAttendanceStreak: 5,
    lateArrivalStreak: 0
  };

  // Generate KPIs
  const kpis: AttendanceKPI[] = [
    {
      label: 'Attendance Rate',
      value: `${statistics.attendancePercentage.toFixed(1)}%`,
      trend: 'up',
      trendPercentage: 2.1,
      icon: 'check',
      color: 'success'
    },
    {
      label: 'Working Hours',
      value: `${statistics.averageWorkingHours.toFixed(1)}h`,
      trend: 'up',
      trendPercentage: 1.5,
      icon: 'time',
      color: 'primary'
    }
  ];

  // Update filters
  const updateFilters = (newFilters: Partial<AttendanceFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Update sort
  const updateSort = (config: SortConfig) => {
    setSortConfig(config);
  };

  // Update pagination
  const updatePagination = (config: Partial<PaginationConfig>) => {
    setPagination(prev => ({ ...prev, ...config }));
  };

  // Refresh data
  const refreshData = async () => {
    await initializeAttendance();
  };

  // Export data
  const exportData = async (format: 'csv' | 'excel' | 'pdf') => {
    try {
      // Implementation for data export
      // In a real implementation, you would use ExportManager
      // ExportManager.export(format, attendanceData, { statistics });
      console.log(`Exporting data in ${format} format`);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  // Legacy chart data for backward compatibility
  const chartData = {
    labels: attendanceData.map((r) => r.date).reverse(),
    datasets: [
      {
        label: 'Check-ins',
        data: attendanceData.map((r) => (r.status === 'Present' || r.status === 'Late' ? 1 : 0)).reverse(),
        fill: false,
        borderColor: '#00B74A',
        tension: 0.1,
      },
    ],
  };

  return {
    // State
    attendanceData: filteredData,
    filteredData,
    statistics,
    kpis,
    isCheckedIn,
    currentLocation,
    loading,
    error,
    
    // Filters and Pagination
    filters,
    sortConfig,
    pagination,
    
    // Actions
    checkIn,
    checkOut,
    updateFilters,
    updateSort,
    updatePagination,
    refreshData,
    exportData,
    
    // Legacy properties for backward compatibility
    geoFencingEnabled,
    statusFilter,
    snack,
    chartData,
    setGeoFencingEnabled,
    setStatusFilter,
    handleCheckInOut: () => isCheckedIn ? checkOut() : checkIn(),
    triggerSnack,
    handleSnackClose,
  } as any;
} 