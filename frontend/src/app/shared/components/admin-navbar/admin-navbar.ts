import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './admin-navbar.html',
  styleUrl: './admin-navbar.css'
})
export class AdminNavbarComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  user = this.authService.getUser();

  logout() {

    this.authService.logout();

    this.router.navigate(['/']);

  }

}