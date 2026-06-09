import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { ResumeService } from '../../core/resume.service';

@Component({
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './upload.component.html'
})
export class UploadComponent {
  files: File[] = [];
  uploading = false;
  progress = 0;
  message = '';
  error = '';

  constructor(private resumeService: ResumeService, private router: Router) { }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.files = Array.from(input.files ?? []);
    this.message = '';
    this.error = '';
  }

  upload(): void {
    if (this.files.length === 0) return;
    this.uploading = true;
    this.progress = 0;
    this.message = '';
    this.error = '';

    this.resumeService.uploadResumes(this.files).subscribe({
      next: event => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.progress = Math.round((event.loaded / event.total) * 100);
        }
        if (event.type === HttpEventType.Response) {
          this.uploading = false;
          this.message = `${event.body?.uploaded.length ?? 0} resume(s) uploaded. Scoring started.`;
          setTimeout(() => this.router.navigate(['/home']), 800);
        }
      },
      error: () => { this.uploading = false; this.error = 'Upload failed. Please try again.'; }
    });
  }

  clear(): void { this.files = []; this.progress = 0; this.message = ''; this.error = ''; }
}
