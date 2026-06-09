import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/landing/landing.component').then(m => m.LandingComponent) },
  { path: 'home', canActivate: [authGuard], loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
  { path: 'verify-email', loadComponent: () => import('./pages/email-verification/email-verification.component').then(m => m.EmailVerificationComponent) },
  { path: 'dashboard', canActivate: [authGuard], loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'upload', canActivate: [authGuard], loadComponent: () => import('./pages/upload/upload.component').then(m => m.UploadComponent) },
  { path: 'resumes/:id', canActivate: [authGuard], loadComponent: () => import('./pages/resume-detail/resume-detail.component').then(m => m.ResumeDetailComponent) },
  { path: '**', redirectTo: '' }
];
