/**
 * Core Attendance Types and Interfaces
 * Enhanced TypeScript definitions for the Attendance module
 */

// Type unions for better compatibility
export type AttendanceStatus = 
  | 'Present'
  | 'Late'
  | 'Absent'
  | 'Half Day'
  | 'Sick Leave'
  | 'Vacation'
  | 'Remote';

export type ShiftType = 
  | 'Morning'
  | 'Afternoon'
  | 'Night'
  | 'Flexible';

export type LocationType = 
  | 'Office'
  | 'Remote'
  | 'Client Site'
  | 'Field';

export type CheckInMethod = 
  | 'Manual'
  | 'QR Code'
  | 'Geofence'
  | 'Card';

// Constants for easy access
export const AttendanceStatus = {
  PRESENT: 'Present' as const,
  LATE: 'Late' as const,
  ABSENT: 'Absent' as const,
  HALF_DAY: 'Half Day' as const,
  SICK_LEAVE: 'Sick Leave' as const,
  VACATION: 'Vacation' as const,
  REMOTE: 'Remote' as const
};

export const ShiftType = {
  MORNING: 'Morning' as const,
  AFTERNOON: 'Afternoon' as const,
  NIGHT: 'Night' as const,
  FLEXIBLE: 'Flexible' as const
};

export const LocationType = {
  OFFICE: 'Office' as const,
  REMOTE: 'Remote' as const,
  CLIENT_SITE: 'Client Site' as const,
  FIELD: 'Field' as const
};

export const CheckInMethod = {
  MANUAL: 'Manual' as const,
  QR_CODE: 'QR Code' as const,
  GEOFENCE: 'Geofence' as const,
  CARD: 'Card' as const
};

// Core Interfaces
export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  checkInLocation?: GeoLocation;
  checkOutLocation?: GeoLocation;
  location: LocationType;
  status: AttendanceStatus;
  workingHours: number;
  overtimeHours: number;
  breakTime: number;
  lateMinutes: number;
  earlyDepartureMinutes: number;
  shiftType: ShiftType;
  checkInMethod: CheckInMethod;
  notes?: string;
  isManuallyAdjusted: boolean;
  adjustedBy?: string;
  adjustmentReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  address?: string;
  timestamp: string;
}

export interface AttendanceShift {
  id: string;
  name: string;
  type: ShiftType;
  startTime: string;
  endTime: string;
  graceMinutes: number;
  minWorkingHours: number;
  allowOvertime: boolean;
  isActive: boolean;
  daysOfWeek: number[]; // 0 = Sunday, 1 = Monday, etc.
}

export interface AttendancePolicy {
  id: string;
  name: string;
  lateToleranceMinutes: number;
  earlyDepartureToleranceMinutes: number;
  minimumWorkingHours: number;
  maximumWorkingHours: number;
  overtimeRateMultiplier: number;
  allowFlexibleHours: boolean;
  requireGeofenceCheckin: boolean;
  autoCheckoutEnabled: boolean;
  autoCheckoutTime: string;
  breakDurationMinutes: number;
  maxBreaksPerDay: number;
}

export interface BreakRecord {
  id: string;
  attendanceRecordId: string;
  startTime: string;
  endTime?: string;
  duration: number;
  type: 'Lunch' | 'Short Break' | 'Meeting' | 'Other';
  location?: GeoLocation;
  notes?: string;
}

// Analytics and Statistics Types
export interface AttendanceStatistics {
  totalWorkingDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  attendancePercentage: number;
  averageWorkingHours: number;
  totalOvertimeHours: number;
  averageCheckInTime: string;
  averageCheckOutTime: string;
  perfectAttendanceStreak: number;
  lateArrivalStreak: number;
}

export interface DepartmentAttendanceStats {
  departmentId: string;
  departmentName: string;
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  attendancePercentage: number;
  averageWorkingHours: number;
}

export interface AttendanceTrend {
  date: string;
  totalPresent: number;
  totalAbsent: number;
  totalLate: number;
  averageWorkingHours: number;
  overtimeHours: number;
}

export interface AttendanceKPI {
  label: string;
  value: string | number;
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
  icon: string;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

// Chart Data Types
export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
  color?: string;
}

export interface AttendanceChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    fill?: boolean;
    tension?: number;
  }[];
}

export interface HeatmapDataPoint {
  day: string;
  hour: number;
  value: number;
  count: number;
}

// Filter and Search Types
export interface AttendanceFilters {
  startDate?: string;
  endDate?: string;
  employeeIds?: string[];
  departments?: string[];
  status?: AttendanceStatus[];
  shiftTypes?: ShiftType[];
  locations?: LocationType[];
  dateRange?: 'today' | 'week' | 'month' | 'quarter' | 'year' | 'custom';
}

export interface SortConfig {
  field: keyof AttendanceRecord;
  direction: 'asc' | 'desc';
}

export interface PaginationConfig {
  page: number;
  pageSize: number;
  total: number;
}

// Report Types
export interface ReportConfig {
  id: string;
  name: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  filters: AttendanceFilters;
  includeCharts: boolean;
  includeStatistics: boolean;
  format: 'pdf' | 'excel' | 'csv';
  emailRecipients?: string[];
  scheduleEnabled: boolean;
  scheduleFrequency?: 'daily' | 'weekly' | 'monthly';
  scheduleDayOfWeek?: number;
  scheduleDayOfMonth?: number;
  createdBy: string;
  createdAt: string;
  lastRun?: string;
}

export interface AttendanceReport {
  id: string;
  configId: string;
  title: string;
  subtitle: string;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  data: AttendanceRecord[];
  statistics: AttendanceStatistics;
  departmentStats: DepartmentAttendanceStats[];
  trends: AttendanceTrend[];
  kpis: AttendanceKPI[];
  generatedAt: string;
  generatedBy: string;
}

// Component Props Types
export interface AttendanceTableProps {
  data: AttendanceRecord[];
  loading?: boolean;
  filters?: AttendanceFilters;
  sortConfig?: SortConfig;
  pagination?: PaginationConfig;
  onSort?: (config: SortConfig) => void;
  onFilter?: (filters: AttendanceFilters) => void;
  onPageChange?: (page: number) => void;
  onRowClick?: (record: AttendanceRecord) => void;
  onEdit?: (record: AttendanceRecord) => void;
  onDelete?: (recordId: string) => void;
}

export interface AttendanceChartProps {
  data: AttendanceChartData | ChartDataPoint[];
  type: 'line' | 'bar' | 'pie' | 'heatmap' | 'area';
  height?: number;
  title?: string;
  subtitle?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
  interactive?: boolean;
  onDataPointClick?: (dataPoint: ChartDataPoint) => void;
}

export interface KPICardProps {
  kpi: AttendanceKPI;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  showTrend?: boolean;
}

// Hook Return Types
export interface UseAttendanceReturn {
  // State
  attendanceData: AttendanceRecord[];
  filteredData: AttendanceRecord[];
  statistics: AttendanceStatistics;
  kpis: AttendanceKPI[];
  isCheckedIn: boolean;
  currentLocation: GeoLocation | null;
  loading: boolean;
  error: string | null;
  
  // Filters and Pagination
  filters: AttendanceFilters;
  sortConfig: SortConfig;
  pagination: PaginationConfig;
  
  // Actions
  checkIn: (location?: GeoLocation, method?: CheckInMethod) => Promise<void>;
  checkOut: (location?: GeoLocation) => Promise<void>;
  updateFilters: (filters: Partial<AttendanceFilters>) => void;
  updateSort: (config: SortConfig) => void;
  updatePagination: (config: Partial<PaginationConfig>) => void;
  refreshData: () => Promise<void>;
  exportData: (format: 'csv' | 'excel' | 'pdf') => Promise<void>;
}

export interface UseAttendanceAnalyticsReturn {
  trends: AttendanceTrend[];
  departmentStats: DepartmentAttendanceStats[];
  chartData: {
    attendanceTrend: ChartDataPoint[];
    statusDistribution: ChartDataPoint[];
    departmentComparison: ChartDataPoint[];
    weeklyHeatmap: HeatmapDataPoint[];
  };
  loading: boolean;
  error: string | null;
  refreshAnalytics: () => Promise<void>;
}

// API Response Types
export interface AttendanceApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  meta?: {
    pagination?: PaginationConfig;
    filters?: AttendanceFilters;
    sort?: SortConfig;
  };
}

export interface CheckInOutResponse {
  success: boolean;
  attendanceRecord: AttendanceRecord;
  message: string;
  timestamp: string;
}

// Settings and Configuration Types
export interface AttendanceModuleSettings {
  geofencing: {
    enabled: boolean;
    radius: number; // in meters
    officeLocations: GeoLocation[];
  };
  shifts: {
    defaultShift: string;
    allowShiftChanges: boolean;
    requireApprovalForChanges: boolean;
  };
  notifications: {
    checkInReminders: boolean;
    checkOutReminders: boolean;
    lateArrivalAlerts: boolean;
    overtimeAlerts: boolean;
    weeklyReports: boolean;
  };
  automation: {
    autoCheckOut: boolean;
    autoBreakDetection: boolean;
    autoOvertimeCalculation: boolean;
  };
}

// Error Types
export interface AttendanceError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
}

export const ErrorCodes = {
  GEOLOCATION_DENIED: 'GEOLOCATION_DENIED' as const,
  GEOLOCATION_UNAVAILABLE: 'GEOLOCATION_UNAVAILABLE' as const,
  OUTSIDE_GEOFENCE: 'OUTSIDE_GEOFENCE' as const,
  ALREADY_CHECKED_IN: 'ALREADY_CHECKED_IN' as const,
  ALREADY_CHECKED_OUT: 'ALREADY_CHECKED_OUT' as const,
  INVALID_SHIFT: 'INVALID_SHIFT' as const,
  NETWORK_ERROR: 'NETWORK_ERROR' as const,
  PERMISSION_DENIED: 'PERMISSION_DENIED' as const,
  VALIDATION_ERROR: 'VALIDATION_ERROR' as const
};
