export type VisaType = 'F1' | 'H1B' | 'OPT' | 'CPT';

export interface InstitutionInfo {
  name: string;
  state: string;
  country: string;
  type: 'university' | 'company';
}

export interface SearchQuery {
  institution: InstitutionInfo;
  program?: string;
  visaType: VisaType;
  searchType: 'admissions' | 'visa' | 'deadlines' | 'requirements';
}

export interface Deadline {
  date: string;
  description: string;
  isEstimated: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface Contact {
  department: string;
  role?: string;
  email?: string;
  phone?: string;
  office?: string;
}

export enum StepStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  BLOCKED = 'blocked'
}

export interface Substep {
  title: string;
  status: StepStatus;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  substeps: Substep[];
  timeframe: string;
  status: StepStatus;
  prerequisites: string[];
}

export interface ScrapedInformation {
  requirements: string[];
  deadlines: string[];
  contacts: string[];
  processSteps: string[];
} 