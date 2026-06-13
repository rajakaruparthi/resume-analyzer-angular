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
  comments: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  duration: string;
  bullets: string[];
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
  location: string;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
}

export interface ResumeDetail extends ResumeSummary {
  candidateName?: string;
  detailedFeedback: string;
  strengths: string[];
  improvements: string[];
  scoreBreakdown: ScoreBreakdown[];
  resumeData?: ResumeThemeData;
}

export interface UploadResponse {
  uploaded: ResumeSummary[];
}
