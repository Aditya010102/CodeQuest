import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = false;

  errorMessage = '';

  successMessage = '';

  hidePassword = true;

  hideConfirmPassword = true;

  registerForm = this.fb.group({

    full_name: [

      '',

      [

        Validators.required,

        Validators.minLength(3)

      ]

    ],

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

    ],

    confirmPassword: [

      '',

      Validators.required

    ],

    terms: [

      false,

      Validators.requiredTrue

    ]

  }, {

    validators: this.passwordMatchValidator

  });

  passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {

    const password = control.get('password')?.value;

    const confirm = control.get('confirmPassword')?.value;

    return password === confirm

      ? null

      : { passwordMismatch: true };

  }

  get passwordStrength() {

    const password =

      this.registerForm.get('password')?.value || '';

    if (password.length < 6)

      return 'Weak';

    if (password.length < 10)

      return 'Medium';

    return 'Strong';

  }

  register() {

    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    const data = {
      full_name: this.registerForm.value.full_name ?? '',
      email: this.registerForm.value.email ?? '',
      password: this.registerForm.value.password ?? ''
    };

    this.authService.register(data)

      .subscribe({

        next: () => {

          this.loading = false;

          this.successMessage =

            'Registration Successful';

          setTimeout(() => {

            this.router.navigate(['/']);

          }, 1500);

        },

        error: (err) => {

          this.loading = false;

          this.errorMessage =

            err.error?.message ||

            'Registration Failed';

        }

      });

  }

}