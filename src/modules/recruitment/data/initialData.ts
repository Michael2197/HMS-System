interface Candidate {
  id: number;
  name: string;
  jobTitle: string;
  status: string;
  applicationDate: string;
  hiringManager: string;
  method: string;
}

interface RecruitmentFilters {
  jobTitle: string;
  vacancy: string;
  hiringManager: string;
  candidateName: string;
  keywords: string;
  status: string;
  method: string;
  dateFrom: string;
  dateTo: string;
}

export const initialCandidates: Candidate[] = [];

export const initialFilters: RecruitmentFilters = {
  jobTitle: '',
  vacancy: '',
  hiringManager: '',
  candidateName: '',
  keywords: '',
  status: '',
  method: '',
  dateFrom: '',
  dateTo: '',
}; 