/**
 * Shift Management Types
 * Type definitions for shift scheduling and management
 */

// Types will be properly imported when needed to avoid circular dependencies

export type ShiftStatus = 
  | 'Scheduled'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled'
  | 'No Show';

export type ShiftRequestStatus = 
  | 'Pending'
  | 'Approved'
  | 'Rejected'
  | 'Cancelled';

export type ShiftRequestType = 
  | 'Change'
  | 'Swap'
  | 'Overtime'
  | 'Extra';

export interface ShiftTemplate {
  id: string;
  name: string;
  code: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  breakDuration: number; // in minutes
  colorCode: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ShiftAssignment {
  id: string;
  employeeId: string;
  employeeName: string;
  shiftTemplateId: string;
  shiftTemplate: ShiftTemplate;
  date: string;
  startTime: string;
  endTime: string;
  status: ShiftStatus;
  actualStartTime?: string;
  actualEndTime?: string;
  location?: {
    latitude: number;
    longitude: number;
    accuracy: number;
    address?: string;
    timestamp: string;
  };
  notes?: string;
  assignedBy: string;
  attendanceRecord?: any; // Will be properly typed when circular dependency is resolved
  createdAt: string;
  updatedAt: string;
}

export interface ShiftRequest {
  id: string;
  requestType: ShiftRequestType;
  employeeId: string;
  employeeName: string;
  status: ShiftRequestStatus;
  
  // For shift changes
  originalShiftId?: string;
  requestedShiftId?: string;
  requestedDate?: string;
  
  // For shift swaps
  swapWithEmployeeId?: string;
  swapWithEmployeeName?: string;
  swapShiftId?: string;
  
  // For overtime/extra shifts
  overtimeHours?: number;
  extraShiftDate?: string;
  extraShiftTemplateId?: string;
  
  reason: string;
  requestedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewNotes?: string;
  
  // Auto-approval rules
  isAutoApproved: boolean;
  autoApprovalReason?: string;
}

export interface ShiftRule {
  id: string;
  name: string;
  description: string;
  
  // Time constraints
  minHoursBetweenShifts: number;
  maxConsecutiveDays: number;
  maxWeeklyHours: number;
  maxMonthlyHours: number;
  
  // Shift change rules
  allowShiftChanges: boolean;
  shiftChangeDeadlineHours: number;
  requireApprovalForChanges: boolean;
  allowShiftSwaps: boolean;
  
  // Overtime rules
  allowOvertime: boolean;
  maxOvertimeHours: number;
  overtimeApprovalRequired: boolean;
  
  // Auto-approval conditions
  autoApprovalEnabled: boolean;
  autoApprovalConditions: {
    advanceNoticeHours: number;
    maxRequestsPerWeek: number;
    allowedRequestTypes: ShiftRequestType[];
  };
  
  isActive: boolean;
  appliesTo: {
    departments?: string[];
    roles?: string[];
    employees?: string[];
  };
  
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShiftPattern {
  id: string;
  name: string;
  description: string;
  pattern: ShiftPatternDay[];
  duration: number; // in days
  isRepeating: boolean;
  isActive: boolean;
  
  // Assignment rules
  autoAssignment: boolean;
  assignmentRules?: {
    departments?: string[];
    roles?: string[];
    employees?: string[];
    startDate?: string;
    endDate?: string;
  };
  
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShiftPatternDay {
  dayNumber: number; // 1-based
  shiftTemplateId?: string;
  isRestDay: boolean;
  notes?: string;
}

export interface ShiftSchedule {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  
  // Pattern or manual assignments
  shiftPatternId?: string;
  assignments: ShiftAssignment[];
  
  // Status and metadata
  status: 'Draft' | 'Published' | 'Active' | 'Completed' | 'Cancelled';
  publishedAt?: string;
  publishedBy?: string;
  
  // Approval workflow
  requiresApproval: boolean;
  approvedBy?: string;
  approvedAt?: string;
  
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShiftCoverage {
  date: string;
  shiftTemplateId: string;
  shiftTemplate: ShiftTemplate;
  requiredStaff: number;
  assignedStaff: number;
  coveragePercentage: number;
  isFullyCovered: boolean;
  gaps: ShiftGap[];
}

export interface ShiftGap {
  startTime: string;
  endTime: string;
  requiredStaff: number;
  assignedStaff: number;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface ShiftStatistics {
  totalShifts: number;
  completedShifts: number;
  cancelledShifts: number;
  noShowShifts: number;
  averageUtilization: number;
  overtimeHours: number;
  
  // By time period
  dailyStats: { date: string; shifts: number; coverage: number }[];
  weeklyStats: { week: string; shifts: number; coverage: number }[];
  monthlyStats: { month: string; shifts: number; coverage: number }[];
  
  // By shift type
  shiftTypeStats: { shiftTypeId: string; count: number; percentage: number }[];
  
  // Employee stats
  employeeStats: {
    employeeId: string;
    employeeName: string;
    totalShifts: number;
    completedShifts: number;
    cancelledShifts: number;
    noShows: number;
    reliabilityScore: number;
  }[];
}

export interface ShiftCalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  extendedProps: {
    shiftAssignmentId: string;
    employeeId: string;
    employeeName: string;
    shiftTemplate: ShiftTemplate;
    status: ShiftStatus;
    notes?: string;
  };
}

// Component Props
export interface ShiftCalendarProps {
  assignments: ShiftAssignment[];
  view: 'month' | 'week' | 'day';
  selectedDate: string;
  onDateSelect: (date: string) => void;
  onEventClick: (assignment: ShiftAssignment) => void;
  onEventDrop?: (assignmentId: string, newDate: string, newTime?: string) => void;
  onSlotClick?: (date: string, time?: string) => void;
  editable?: boolean;
  selectable?: boolean;
}

export interface ShiftRequestFormProps {
  requestType: ShiftRequestType;
  employeeId: string;
  availableShifts?: ShiftTemplate[];
  currentAssignments?: ShiftAssignment[];
  onSubmit: (request: Omit<ShiftRequest, 'id' | 'status' | 'requestedAt'>) => void;
  onCancel: () => void;
}

export interface ShiftManagementDashboardProps {
  dateRange: { start: string; end: string };
  selectedDepartments?: string[];
  onDateRangeChange: (range: { start: string; end: string }) => void;
  onDepartmentFilter: (departments: string[]) => void;
}

// Hook return types
export interface UseShiftManagementReturn {
  // State
  shifts: ShiftAssignment[];
  shiftTemplates: ShiftTemplate[];
  shiftRequests: ShiftRequest[];
  coverage: ShiftCoverage[];
  statistics: ShiftStatistics;
  calendarEvents: ShiftCalendarEvent[];
  
  // Loading states
  loading: {
    shifts: boolean;
    templates: boolean;
    requests: boolean;
    coverage: boolean;
  };
  
  // Actions
  createShiftAssignment: (assignment: Omit<ShiftAssignment, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateShiftAssignment: (id: string, updates: Partial<ShiftAssignment>) => Promise<void>;
  deleteShiftAssignment: (id: string) => Promise<void>;
  
  // Shift requests
  submitShiftRequest: (request: Omit<ShiftRequest, 'id' | 'status' | 'requestedAt'>) => Promise<void>;
  approveShiftRequest: (id: string, notes?: string) => Promise<void>;
  rejectShiftRequest: (id: string, notes: string) => Promise<void>;
  
  // Templates
  createShiftTemplate: (template: Omit<ShiftTemplate, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateShiftTemplate: (id: string, updates: Partial<ShiftTemplate>) => Promise<void>;
  
  // Bulk operations
  bulkAssignShifts: (assignments: Omit<ShiftAssignment, 'id' | 'createdAt' | 'updatedAt'>[]) => Promise<void>;
  applyShiftPattern: (patternId: string, dateRange: { start: string; end: string }, employeeIds: string[]) => Promise<void>;
  
  // Utilities
  checkShiftConflicts: (assignment: ShiftAssignment) => Promise<string[]>;
  calculateCoverage: (date: string, shiftTemplateId?: string) => ShiftCoverage;
  getAvailableEmployees: (date: string, shiftTemplateId: string) => Promise<string[]>;
}

export interface UseShiftSchedulingReturn {
  schedules: ShiftSchedule[];
  patterns: ShiftPattern[];
  rules: ShiftRule[];
  loading: boolean;
  error: string | null;
  
  createSchedule: (schedule: Omit<ShiftSchedule, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateSchedule: (id: string, updates: Partial<ShiftSchedule>) => Promise<void>;
  publishSchedule: (id: string) => Promise<void>;
  deleteSchedule: (id: string) => Promise<void>;
  
  createPattern: (pattern: Omit<ShiftPattern, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updatePattern: (id: string, updates: Partial<ShiftPattern>) => Promise<void>;
  
  createRule: (rule: Omit<ShiftRule, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateRule: (id: string, updates: Partial<ShiftRule>) => Promise<void>;
}

// API Response types
export interface ShiftApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface ShiftConflictError {
  type: 'OVERLAP' | 'MIN_HOURS_VIOLATION' | 'MAX_HOURS_VIOLATION' | 'CONSECUTIVE_DAYS_VIOLATION';
  message: string;
  conflictingShiftId?: string;
  suggestedAlternatives?: string[];
}
