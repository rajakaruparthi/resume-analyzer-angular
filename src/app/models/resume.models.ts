export type ResumeStatus = 'UPLOADED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

export interface ResumeSummary {
  id: string;
  originalFilename: string;
  s3Key: string;
  status: ResumeStatus;
  overallScore?: number;
  uploadedAt: string;
  key: string;
}

export interface ScoreBreakdown {
  category: string;
  score: number;
  comments?: string;
  strengths?: string[];
  improvements?: string[];
}

export interface Experience {
  company: string;
  role: string;
  location?: string;
  duration: string;
  startDate?: string;
  endDate?: string;
  currentEmployer?: boolean;
  bullets: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies?: string[];
  bullets?: string[];
  githubUrl?: string;
  projectUrl?: string;
}

export interface Education {
  school: string;
  degree: string;
  duration: string;
}

export interface ResumeThemeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  linkedin?: string;
  github?: string;
  location: string;
  summary: string;
  experience: Experience[];
  projects?: Project[];
  education: Education[];
  skills: string[];
  certifications?: string[];
  awards?: string[];
  publications?: string[];
  languages?: string[];
}

export interface SectionScore {
  sectionName: string;
  sectionHash: string;
  score: number;
  feedback: string;
  strengths?: string[];
  improvements?: string[];
}

export interface ResumeDetail extends ResumeSummary {
  candidateName?: string;
  detailedFeedback: string;
  strengths: string[];
  improvements: string[];
  scoreBreakdown: ScoreBreakdown[];
  resumeData?: ResumeThemeData;
  sectionScores?: SectionScore[];
  isResume?: boolean;
  missingSections?: string[];
  weakSections?: string[];
}

export interface UploadResponse {
  uploaded: ResumeSummary[];
}
