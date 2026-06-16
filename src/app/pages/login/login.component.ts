import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loading = false;
  error = '';
  infoMessage = '';
  infoType: 'info' | 'warning' = 'info';

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor() {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['expired'] === 'true') {
        this.infoMessage = 'Your session has expired. Please sign in again.';
        this.infoType = 'warning';
      } else if (params['loggedOut'] === 'true') {
        this.infoMessage = 'You have been successfully signed out.';
        this.infoType = 'info';
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    this.infoMessage = '';
    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        if (err.status === 0) {
          this.error = 'Cannot connect to server. Please check your network connection.';
        } else if (err.error?.error) {
          this.error = err.error.error;
        } else if (err.error?.message) {
          this.error = err.error.message;
        } else if (err.status === 401) {
          this.error = 'Invalid email or password';
        } else {
          this.error = 'An unexpected error occurred. Please try again.';
        }
      }
    });
  }
}
