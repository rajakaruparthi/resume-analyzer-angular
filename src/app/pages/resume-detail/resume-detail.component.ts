import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ResumeService } from '../../core/resume.service';
import { ResumeDetail } from '../../models/resume.models';

@Component({
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './resume-detail.component.html'
})
export class ResumeDetailComponent implements OnInit {
  resume: ResumeDetail | null = null;
  loading = true;

  constructor(private route: ActivatedRoute, private resumeService: ResumeService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.loading = false; return; }
    this.resumeService.getResumeDetail(id).subscribe({
      next: data => { this.resume = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
