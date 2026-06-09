import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api.config';
import { ResumeDetail, ResumeSummary, UploadResponse } from '../models/resume.models';

@Injectable({ providedIn: 'root' })
export class ResumeService {
  constructor(private http: HttpClient) { }

  uploadResumes(files: File[]): Observable<HttpEvent<UploadResponse>> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    return this.http.post<UploadResponse>(`${API_BASE_URL}/resumes/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getHistory(): Observable<ResumeSummary[]> {
    return this.http.get<ResumeSummary[]>(`${API_BASE_URL}/resumes`);
  }

  getResumeDetail(id: string): Observable<ResumeDetail> {
    return this.http.get<ResumeDetail>(`${API_BASE_URL}/resumes/${id}`);
  }
}
