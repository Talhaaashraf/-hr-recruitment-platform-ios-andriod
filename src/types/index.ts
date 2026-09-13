// ─── User & Auth ────────────────────────────────────────────────────────────

export type UserRole = 'client' | 'candidate';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  company_name: string | null; // clients only
  job_title: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Services ────────────────────────────────────────────────────────────────

export type ServiceCategory =
  | 'hr_consulting'
  | 'business_consulting'
  | 'recruitment_technical'
  | 'recruitment_non_technical';

export interface Service {
  id: string;
  title: string;
  category: ServiceCategory;
  description: string;
  icon: string; // Ionicons name
}

// ─── Engagements (Client requests) ───────────────────────────────────────────

export type EngagementStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface Engagement {
  id: string;
  client_id: string;
  service_id: string;
  service?: Service;
  title: string;
  description: string;
  status: EngagementStatus;
  assigned_consultant_name: string | null;
  notes: string | null;
  attachment_urls: string[];
  created_at: string;
  updated_at: string;
}

// ─── Jobs ────────────────────────────────────────────────────────────────────

export type JobType = 'technical' | 'non_technical';

export interface Job {
  id: string;
  title: string;
  company_name: string;
  location: string;
  type: JobType;
  description: string;
  requirements: string[];
  salary_range: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ─── Applications ─────────────────────────────────────────────────────────────

export type ApplicationStatus =
  | 'applied'
  | 'under_review'
  | 'interview'
  | 'rejected'
  | 'hired';

export interface Application {
  id: string;
  job_id: string;
  candidate_id: string;
  job?: Job;
  cover_note: string | null;
  resume_url: string | null;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
}

// ─── Messages ────────────────────────────────────────────────────────────────

export interface Conversation {
  id: string;
  participant_ids: string[];
  last_message: string | null;
  last_message_at: string | null;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Signup: { role?: UserRole };
  ForgotPassword: undefined;
};

export type ClientStackParamList = {
  Engagements: undefined;
  EngagementDetail: { engagementId: string };
  RequestService: { serviceId?: string };
};

export type CandidateStackParamList = {
  JobListings: undefined;
  JobDetail: { jobId: string };
  Apply: { jobId: string };
  MyApplications: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  JobsOrEngagements: undefined;
  Chat: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};
