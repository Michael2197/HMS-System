interface PerformanceFilters {
  employeeName: string;
  include: string;
  subUnit: string;
  jobTitle: string;
  reviewStatus: string;
  includePastEmployees: boolean;
}

export const initialFilters: PerformanceFilters = {
  employeeName: '',
  include: '',
  subUnit: '',
  jobTitle: '',
  reviewStatus: '',
  includePastEmployees: false,
}; 