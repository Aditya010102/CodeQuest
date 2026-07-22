import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {

  private router = inject(Router);
  private authService = inject(AuthService);

  username = '';
  role = '';

  ngOnInit() {

    const user = this.authService.getUser();

    if (user) {

      this.username = user.full_name;
      this.role = user.role;

    }

  }

  logout() {

    this.authService.logout();

    this.router.navigate(['/']);

  }

}