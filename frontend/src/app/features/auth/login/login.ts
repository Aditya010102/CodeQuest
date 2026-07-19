import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ]

  });
  loading = false;

  rememberMe = false;

  hidePassword = true;

  errorMessage = '';

  login() {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    const data = this.loginForm.value;

    this.authService.login(data).subscribe({

      next: (response) => {

        this.authService.saveUser(response);

        if (response.user.role === 'admin') {

          this.router.navigate(['/admin']);

        } else {

          this.router.navigate(['/dashboard']);

        }

      },

      error: () => {

        this.loading = false;

        this.errorMessage = 'Invalid email or password';

      },

      complete: () => {

        this.loading = false;

      }

    });

  }
}