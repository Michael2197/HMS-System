/**
 * Attendance Analytics Hook
 * Provides analytics data and calculations for attendance metrics
 */

import { useState, useEffect, useMemo } from 'react';
import type {
  AttendanceRecord,
  AttendanceTrend,
  DepartmentAttendanceStats,
  ChartDataPoint,
  HeatmapDataPoint,
  UseAttendanceAnalyticsReturn
} from '../types';
import { LocationType, AttendanceStatus, ShiftType, CheckInMethod } from '../types';

// Mock data - in a real app, this would come from an API
const mockAttendanceData: AttendanceRecord[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    date: '2025-01-20',
    checkIn: '09:00',
    checkOut: '18:00',
    location: LocationType.OFFICE,
    status: AttendanceStatus.PRESENT,
    workingHours: 8,
    overtimeHours: 0,
    breakTime: 60,
    lateMinutes: 0,
    earlyDepartureMinutes: 0,
    shiftType: ShiftType.MORNING,
    checkInMethod: CheckInMethod.MANUAL,
    isManuallyAdjusted: false,
    createdAt: '2025-01-20T09:00:00Z',
    updatedAt: '2025-01-20T18:00:00Z'
  },
  // Add more mock data as needed...
];

export const useAttendanceAnalytics = (
  dateRange?: { startDate: string; endDate: string },
  departmentIds?: string[]
): UseAttendanceAnalyticsReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>(mockAttendanceData);

  // Calculate attendance trends
  const trends = useMemo((): AttendanceTrend[] => {
    const trendMap = new Map<string, {
      totalPresent: number;
      totalAbsent: number;
      totalLate: number;
      totalHours: number;
      overtimeHours: number;
    }>();

    attendanceData.forEach(record => {
      const existing = trendMap.get(record.date) || {
        totalPresent: 0,
        totalAbsent: 0,
        totalLate: 0,
        totalHours: 0,
        overtimeHours: 0
      };

      if (record.status === AttendanceStatus.PRESENT) existing.totalPresent++;
      else if (record.status === AttendanceStatus.ABSENT) existing.totalAbsent++;
      else if (record.status === AttendanceStatus.LATE) existing.totalLate++;

      existing.totalHours += record.workingHours;
      existing.overtimeHours += record.overtimeHours;

      trendMap.set(record.date, existing);
    });

    return Array.from(trendMap.entries()).map(([date, data]) => ({
      date,
      totalPresent: data.totalPresent,
      totalAbsent: data.totalAbsent,
      totalLate: data.totalLate,
      averageWorkingHours: data.totalHours / (data.totalPresent + data.totalLate || 1),
      overtimeHours: data.overtimeHours
    })).sort((a, b) => a.date.localeCompare(b.date));
  }, [attendanceData]);

  // Calculate department statistics
  const departmentStats = useMemo((): DepartmentAttendanceStats[] => {
    // Mock department data - in real app, would aggregate by actual departments
    return [
      {
        departmentId: 'ENG',
        departmentName: 'Engineering',
        totalEmployees: 25,
        presentToday: 23,
        absentToday: 1,
        lateToday: 1,
        attendancePercentage: 92,
        averageWorkingHours: 8.2
      },
      {
        departmentId: 'MKT',
        departmentName: 'Marketing',
        totalEmployees: 15,
        presentToday: 14,
        absentToday: 1,
        lateToday: 0,
        attendancePercentage: 93.3,
        averageWorkingHours: 8.0
      },
      {
        departmentId: 'HR',
        departmentName: 'Human Resources',
        totalEmployees: 8,
        presentToday: 8,
        absentToday: 0,
        lateToday: 0,
        attendancePercentage: 100,
        averageWorkingHours: 8.1
      }
    ];
  }, [attendanceData]);

  // Generate chart data
  const chartData = useMemo(() => {
    // Attendance trend data
    const attendanceTrend: ChartDataPoint[] = trends.map(trend => ({
      date: trend.date,
      value: trend.totalPresent + trend.totalLate,
      label: `${trend.totalPresent + trend.totalLate} employees`
    }));

    // Status distribution data
    const statusCounts = attendanceData.reduce((acc, record) => {
      acc[record.status] = (acc[record.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const statusDistribution: ChartDataPoint[] = Object.entries(statusCounts).map(([status, count]) => ({
      date: status,
      value: count,
      label: `${count} records`
    }));

    // Department comparison data
    const departmentComparison: ChartDataPoint[] = departmentStats.map(dept => ({
      date: dept.departmentName,
      value: dept.attendancePercentage,
      label: `${dept.attendancePercentage}% attendance`
    }));

    // Weekly heatmap data
    const weeklyHeatmap: HeatmapDataPoint[] = [];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    days.forEach((day) => {
      for (let hour = 9; hour <= 18; hour++) {
        // Mock data for heatmap - in real app, would calculate from actual check-in times
        const value = Math.random() * 100;
        const count = Math.floor(Math.random() * 50);
        
        weeklyHeatmap.push({
          day,
          hour,
          value,
          count
        });
      }
    });

    return {
      attendanceTrend,
      statusDistribution,
      departmentComparison,
      weeklyHeatmap
    };
  }, [trends, departmentStats, attendanceData]);

  // Calculate overall statistics - available for future use
  // const statistics = useMemo((): AttendanceStatistics => {
  //   const totalRecords = attendanceData.length;
  //   if (totalRecords === 0) {
  //     return {
  //       totalWorkingDays: 0,
  //       presentDays: 0,
  //       absentDays: 0,
  //       lateDays: 0,
  //       attendancePercentage: 0,
  //       averageWorkingHours: 0,
  //       totalOvertimeHours: 0,
  //       averageCheckInTime: '00:00',
  //       averageCheckOutTime: '00:00',
  //       perfectAttendanceStreak: 0,
  //       lateArrivalStreak: 0
  //     };
  //   }
  //   const presentDays = attendanceData.filter(r => r.status === AttendanceStatus.PRESENT).length;
  //   const absentDays = attendanceData.filter(r => r.status === AttendanceStatus.ABSENT).length;
  //   const lateDays = attendanceData.filter(r => r.status === AttendanceStatus.LATE).length;
  //   const totalWorkingHours = attendanceData.reduce((sum, r) => sum + r.workingHours, 0);
  //   const totalOvertimeHours = attendanceData.reduce((sum, r) => sum + r.overtimeHours, 0);
  //   const checkInTimes = attendanceData
  //     .filter(r => r.checkIn && r.checkIn !== '-')
  //     .map(r => {
  //       const [hours, minutes] = r.checkIn!.split(':').map(Number);
  //       return hours * 60 + minutes;
  //     });
  //   const avgCheckInMinutes = checkInTimes.length > 0 
  //     ? checkInTimes.reduce((sum, time) => sum + time, 0) / checkInTimes.length 
  //     : 0;
  //   const avgCheckInHours = Math.floor(avgCheckInMinutes / 60);
  //   const avgCheckInMins = Math.floor(avgCheckInMinutes % 60);
  //   return {
  //     totalWorkingDays: totalRecords,
  //     presentDays,
  //     absentDays,
  //     lateDays,
  //     attendancePercentage: ((presentDays + lateDays) / totalRecords) * 100,
  //     averageWorkingHours: totalWorkingHours / totalRecords,
  //     totalOvertimeHours,
  //     averageCheckInTime: `${avgCheckInHours.toString().padStart(2, '0')}:${avgCheckInMins.toString().padStart(2, '0')}`,
  //     averageCheckOutTime: '18:00',
  //     perfectAttendanceStreak: 5,
  //     lateArrivalStreak: 0
  //   };
  // }, [attendanceData]);

  // Generate KPIs - currently not used but available for future use
  // const kpis = useMemo((): AttendanceKPI[] => {
  //   return [
  //     {
  //       label: 'Attendance Rate',
  //       value: `${statistics.attendancePercentage.toFixed(1)}%`,
  //       trend: 'up',
  //       trendPercentage: 2.5,
  //       icon: 'check',
  //       color: 'success'
  //     },
  //     {
  //       label: 'Average Working Hours',
  //       value: `${statistics.averageWorkingHours.toFixed(1)}h`,
  //       trend: 'up',
  //       trendPercentage: 1.2,
  //       icon: 'time',
  //       color: 'primary'
  //     },
  //     {
  //       label: 'Late Arrivals',
  //       value: statistics.lateDays.toString(),
  //       trend: 'down',
  //       trendPercentage: -15.3,
  //       icon: 'warning',
  //       color: 'warning'
  //     },
  //     {
  //       label: 'Overtime Hours',
  //       value: `${statistics.totalOvertimeHours.toFixed(1)}h`,
  //       trend: 'up',
  //       trendPercentage: 8.7,
  //       icon: 'schedule',
  //       color: 'secondary'
  //     }
  //   ];
  // }, [statistics]);

  const refreshAnalytics = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would fetch fresh data here
      setAttendanceData(mockAttendanceData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh analytics');
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    refreshAnalytics();
  }, [dateRange, departmentIds]);

  return {
    trends,
    departmentStats,
    chartData,
    loading,
    error,
    refreshAnalytics
  };
};
