import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  auth = inject(AuthService);
  isLoggedIn = computed(() => this.auth.isLoggedIn());
  currentUser = this.auth.currentUser;

  userName = computed(() => this.currentUser()?.name || 'User');
  userEmail = computed(() => this.currentUser()?.email || '');
  userInitials = computed(() => {
    const name = this.userName();
    return name.split(' ').map(n => n[0]).join('').slice(0, 2);
  });

  logout(): void {
    this.auth.logout();
  }
}
