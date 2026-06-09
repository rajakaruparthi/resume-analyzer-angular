import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './email-verification.component.html'
})
export class EmailVerificationComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  token: string | null = null;
  loading = false;
  successMessage = '';
  errorMessage = '';

  resending = false;
  resendSuccess = '';
  resendError = '';

  resendForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  verify(): void {
    if (!this.token) return;
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.verifyEmail(this.token).subscribe({
      next: (res) => {
        this.loading = false;
        this.successMessage = res.message || 'Your email has been verified successfully!';
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.error || 'Verification failed. The token may be invalid or expired.';
      }
    });
  }

  resend(): void {
    if (this.resendForm.invalid) return;
    this.resending = true;
    this.resendSuccess = '';
    this.resendError = '';

    const email = this.resendForm.getRawValue().email;
    this.authService.resendVerification(email).subscribe({
      next: (res) => {
        this.resending = false;
        this.resendSuccess = res.message || 'Verification email resent successfully!';
        this.resendForm.reset();
      },
      error: (err) => {
        this.resending = false;
        this.resendError = err.error?.error || 'Failed to resend verification email.';
      }
    });
  }
}
