import { Component, OnInit } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ResumeService } from '../../core/resume.service';
import { ResumeSummary } from '../../models/resume.models';

@Component({
  standalone: true,
  imports: [DatePipe, RouterLink, NgClass],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  resumes: ResumeSummary[] = [];
  loading = true;

  constructor(private resumeService: ResumeService) { }

  ngOnInit(): void { this.loadHistory(); }

  loadHistory(): void {
    this.resumeService.getHistory().subscribe({
      next: data => {
        this.resumes = data;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }
}
