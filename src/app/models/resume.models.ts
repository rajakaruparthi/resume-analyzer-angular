export type ResumeStatus = 'UPLOADED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

export interface ResumeSummary {
  id: string;
  originalFilename: string;
  s3Key: string;
  status: ResumeStatus;
  overallScore?: number;
  uploadedAt: string;
}

export interface ScoreBreakdown {
  category: string;
  score: number;
  comments: string;
}

export interface ResumeDetail extends ResumeSummary {
  candidateName?: string;
  detailedFeedback: string;
  strengths: string[];
  improvements: string[];
  scoreBreakdown: ScoreBreakdown[];
}

export interface UploadResponse {
  uploaded: ResumeSummary[];
}
