import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing.component.html'
})
export class LandingComponent implements OnInit {
  auth = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }
}
