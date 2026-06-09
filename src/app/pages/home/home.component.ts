import { Component, OnInit, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';
import { ResumeService } from '../../core/resume.service';
import { ResumeSummary } from '../../models/resume.models';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private auth = inject(AuthService);
  private resumeService = inject(ResumeService);

  currentUser = this.auth.currentUser;
  userName = computed(() => this.currentUser()?.name || 'User');
  
  recentResumes: ResumeSummary[] = [];
  loading = true;
  totalResumes = 0;
  averageScore = 0;
  highestScore = 0;

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.resumeService.getHistory().subscribe({
      next: data => {
        // Sort by upload date descending
        const sorted = [...data].sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
        this.recentResumes = sorted.slice(0, 3);
        this.totalResumes = data.length;
        
        // Calculate average and highest scores
        const scoredResumes = data.filter(r => r.overallScore !== undefined && r.overallScore !== null);
        if (scoredResumes.length > 0) {
          const sum = scoredResumes.reduce((acc, curr) => acc + (curr.overallScore || 0), 0);
          this.averageScore = Math.round(sum / scoredResumes.length);
          this.highestScore = Math.max(...scoredResumes.map(r => r.overallScore || 0));
        }

        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
