import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {

  private router = inject(Router);
  private authService = inject(AuthService);

  username = '';

  ngOnInit() {

    const user = this.authService.getUser();

    if (user) {
      this.username = user.full_name;
    }

  }

  logout() {

    this.authService.logout();

    this.router.navigate(['/']);

  }

}