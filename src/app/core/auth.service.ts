import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, switchMap, map } from 'rxjs';
import { API_BASE_URL } from './api.config';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userKey = 'resume_analyzer_user';
  readonly currentUser = signal<User | null>(this.loadUser());

  constructor(private http: HttpClient, private router: Router) { }

  register(payload: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_BASE_URL}/auth/register`, payload);
  }

  login(payload: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_BASE_URL}/auth/login`, payload).pipe(
      switchMap(authRes => {
        // Fetch full user details to retrieve the display name
        return this.http.get<{ success: boolean; data: User }>(`${API_BASE_URL}/users/email/${authRes.email}`).pipe(
          map(userRes => {
            authRes.user = userRes.data;
            this.saveSession(authRes);
            return authRes;
          })
        );
      })
    );
  }

  verifyEmail(token: string): Observable<any> {
    return this.http.get<any>(`${API_BASE_URL}/users/verify`, { params: { token } });
  }

  resendVerification(email: string): Observable<any> {
    return this.http.post<any>(`${API_BASE_URL}/users/resend-verification`, { email });
  }

  logout(): void {
    this.http.post(`${API_BASE_URL}/auth/logout`, {}).subscribe({
      next: () => this.clearLocalSession(),
      error: () => this.clearLocalSession()
    });
  }

  private clearLocalSession(): void {
    localStorage.removeItem(this.userKey);
    this.currentUser.set(null);
    this.router.navigate(['']);
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  private saveSession(response: AuthResponse): void {
    if (response.user) {
      localStorage.setItem(this.userKey, JSON.stringify(response.user));
    } else {
      localStorage.removeItem(this.userKey);
    }
    this.currentUser.set(response.user || null);
  }

  private loadUser(): User | null {
    const raw = localStorage.getItem(this.userKey);
    if (!raw || raw === 'undefined') {
      return null;
    }
    try {
      return JSON.parse(raw) as User;
    } catch (e) {
      localStorage.removeItem(this.userKey);
      return null;
    }
  }
}
