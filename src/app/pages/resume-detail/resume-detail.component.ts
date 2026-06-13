import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ResumeService } from '../../core/resume.service';
import { ResumeDetail, ResumeThemeData } from '../../models/resume.models';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, RouterLink],
  templateUrl: './resume-detail.component.html',
  styleUrls: ['./resume-detail.component.css']
})
export class ResumeDetailComponent implements OnInit {
  resume: ResumeDetail | null = null;
  loading = true;

  // Tabs and Themes State
  activeTab: 'feedback' | 'themes' = 'feedback';
  selectedTheme: 'modern' | 'creative' | 'classic' | 'executive' = 'modern';
  newSkillText = '';

  // Accordion form state
  openSections: { [key: string]: boolean } = {
    personal: true,
    summary: false,
    experience: false,
    education: false,
    skills: false
  };

  // Pre-populated Resume Data
  resumeData: ResumeThemeData = {
    name: 'Alex Rivera',
    title: 'Senior Software Engineer',
    email: 'alex.rivera@gmail.com',
    phone: '(555) 019-2834',
    website: 'github.com/alexrivera',
    location: 'San Francisco, CA',
    summary: 'Senior Software Engineer with 6+ years of experience designing and implementing scalable web applications. Expert in Angular, TypeScript, Node.js, and cloud architectures.',
    experience: [
      {
        company: 'Innovate Tech Solutions',
        role: 'Senior Software Engineer',
        duration: '2022 - Present',
        bullets: [
          'Led migration of legacy monolithic application to a microservices architecture using Spring Boot and Angular, reducing API latency by 35%.',
          'Managed a team of 4 junior developers, conducting code reviews and mentoring them on TypeScript and Angular best practices.',
          'Established CI/CD pipelines using GitHub Actions, decreasing release cycle deployment time by 50%.'
        ]
      },
      {
        company: 'CloudStream Systems',
        role: 'Software Engineer II',
        duration: '2020 - 2022',
        bullets: [
          'Developed and optimized web applications using Angular, achieving a 98% Lighthouse performance score.',
          'Collaborated with UX designers to build a reusable component library, saving 80+ engineering hours per project.'
        ]
      }
    ],
    education: [
      {
        school: 'University of California, Berkeley',
        degree: 'B.S. in Computer Science',
        duration: '2016 - 2020'
      }
    ],
    skills: ['Angular', 'TypeScript', 'JavaScript', 'HTML5/CSS3', 'Node.js', 'Spring Boot', 'PostgreSQL', 'Docker', 'AWS', 'Git']
  };

  constructor(private route: ActivatedRoute, private resumeService: ResumeService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.loading = false; return; }
    this.resumeService.getResumeDetail(id).subscribe({
      next: data => {
        this.resume = data;
        this.loading = false;
        this.initializeResumeData(data);
      },
      error: () => { this.loading = false; }
    });
  }

  private initializeResumeData(data: ResumeDetail): void {
    if (data.resumeData) {
      this.resumeData = {
        name: data.resumeData.name || '',
        title: data.resumeData.title || '',
        email: data.resumeData.email || '',
        phone: data.resumeData.phone || '',
        website: data.resumeData.website || '',
        location: data.resumeData.location || '',
        summary: data.resumeData.summary || '',
        experience: data.resumeData.experience || [],
        education: data.resumeData.education || [],
        skills: data.resumeData.skills || []
      };
      return;
    }

    if (data.candidateName) {
      this.resumeData.name = data.candidateName;
    } else if (data.originalFilename) {
      // Extract candidate name from filename
      const clean = data.originalFilename.replace(/_/g, ' ').replace(/\.pdf|\.docx|\.doc/gi, '');
      const parts = clean.split(' ');
      if (parts.length >= 2) {
        this.resumeData.name = parts[0] + ' ' + parts[1];
      } else {
        this.resumeData.name = clean;
      }
    }

    // Adapt content based on filename keywords
    const filenameLower = (data.originalFilename || '').toLowerCase();
    if (filenameLower.includes('product') || filenameLower.includes('pm')) {
      this.resumeData.title = 'Senior Product Manager';
      this.resumeData.summary = 'Product Leader with 6+ years of experience directing cross-functional teams to build, scale, and optimize high-impact SaaS products.';
      this.resumeData.experience = [
        {
          company: 'SaaSify Inc.',
          role: 'Senior Product Manager',
          duration: '2022 - Present',
          bullets: [
            'Owned product roadmap and strategy for key enterprise billing features, driving a 22% increase in expansion revenue.',
            'Collaborated with design and engineering to launch a self-serve onboarding portal, reducing support tickets by 45%.',
            'Implemented product analytics tracking using Amplitude, uncovering key drops in customer conversion funnels.'
          ]
        },
        {
          company: 'AppScale Corp',
          role: 'Product Manager',
          duration: '2020 - 2022',
          bullets: [
            'Launched new integrations marketplace which expanded partnership ecosystems by 150%.',
            'Conducted 40+ user interviews to identify high-value roadmap items and improve user engagement.'
          ]
        }
      ];
      this.resumeData.education = [
        {
          school: 'University of Washington',
          degree: 'B.A. in Business Administration',
          duration: '2015 - 2019'
        }
      ];
      this.resumeData.skills = ['Product Strategy', 'Roadmapping', 'Agile/Scrum', 'Amplitude', 'SQL', 'User Research', 'A/B Testing', 'Jira', 'UI/UX Design'];
    } else if (filenameLower.includes('morgan') || filenameLower.includes('designer') || filenameLower.includes('design')) {
      this.resumeData.title = 'UI/UX Designer';
      this.resumeData.summary = 'Creative UI/UX Designer with 4+ years of experience designing beautiful, accessible, and user-centric interfaces for mobile and web platforms.';
      this.resumeData.experience = [
        {
          company: 'PixelPerfect Agency',
          role: 'Senior Product Designer',
          duration: '2023 - Present',
          bullets: [
            'Re-designed flagship e-commerce portal, increasing conversion rate by 2.4% and improving user flow satisfaction scores.',
            'Built and maintained complex Figma design system, alignment of design assets across 3 product lines.',
            'Conducted rapid prototyping and usability testing session for new iOS/Android release.'
          ]
        },
        {
          company: 'DesignWorks Co',
          role: 'UI Designer',
          duration: '2021 - 2023',
          bullets: [
            'Designed high-fidelity mockups, user personas, and flow diagrams for 10+ client websites.',
            'Optimized assets and worked directly with frontend developers to ensure perfect visual implementation.'
          ]
        }
      ];
      this.resumeData.education = [
        {
          school: 'Rhode Island School of Design',
          degree: 'BFA in Graphic Design',
          duration: '2017 - 2021'
        }
      ];
      this.resumeData.skills = ['Figma', 'Sketch', 'Wireframing', 'Prototyping', 'User Flows', 'UI Design', 'Graphic Design', 'HTML/CSS', 'Usability Testing'];
    }
  }

  // Editor actions
  toggleSection(section: string): void {
    this.openSections[section] = !this.openSections[section];
  }

  addExperience(): void {
    this.resumeData.experience.push({
      company: 'New Company',
      role: 'Job Title',
      duration: 'Year - Year',
      bullets: ['Responsibility or key achievement description.']
    });
  }

  removeExperience(index: number): void {
    this.resumeData.experience.splice(index, 1);
  }

  addExpBullet(expIndex: number): void {
    this.resumeData.experience[expIndex].bullets.push('New responsibility or achievement.');
  }

  removeExpBullet(expIndex: number, bulletIndex: number): void {
    this.resumeData.experience[expIndex].bullets.splice(bulletIndex, 1);
  }

  addEducation(): void {
    this.resumeData.education.push({
      school: 'School Name',
      degree: 'Degree Title',
      duration: 'Year - Year'
    });
  }

  removeEducation(index: number): void {
    this.resumeData.education.splice(index, 1);
  }

  addSkill(): void {
    const clean = this.newSkillText.trim();
    if (clean && !this.resumeData.skills.includes(clean)) {
      this.resumeData.skills.push(clean);
    }
    this.newSkillText = '';
  }

  removeSkill(index: number): void {
    this.resumeData.skills.splice(index, 1);
  }

  printResume(): void {
    window.print();
  }
}

