import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from './api.config';
import { ResumeDetail, ResumeSummary, UploadResponse } from '../models/resume.models';

@Injectable({ providedIn: 'root' })
export class ResumeService {
  constructor(private http: HttpClient) { }

  uploadResumes(files: File[]): Observable<UploadResponse> {
    const uploads = files.map(file => {
      const formData = new FormData();
      formData.append('file', file);
      return this.http.post<any>(`${API_BASE_URL}/resumes/upload`, formData);
    });

    return forkJoin(uploads).pipe(
      map(results => ({
        uploaded: results.map(res => ({
          id: res.s3Key,
          key: res.key,
          originalFilename: res.fileName,
          s3Key: res.s3Key,
          status: 'COMPLETED',
          uploadedAt: new Date().toISOString()
        }))
      }))
    );
  }

  getHistory(): Observable<ResumeSummary[]> {
    return this.http.get<ResumeSummary[]>(`${API_BASE_URL}/resumes`);
  }

  getResumeDetail(id: string): Observable<ResumeDetail> {
    return this.http.get<ResumeDetail>(`${API_BASE_URL}/resumes/${id}`);
  }
}


