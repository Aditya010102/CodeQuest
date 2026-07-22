import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css'
})
export class ChangePasswordComponent {

  user = JSON.parse(localStorage.getItem('user') || '{}');

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) {

    this.form = this.fb.group({

      current_password: ['', Validators.required],

      new_password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],

      confirm_password: ['', Validators.required]

    });

  }

  submit() {

    if (this.form.invalid) {
      return;
    }

    const value = this.form.value;

    if (value.new_password !== value.confirm_password) {

      alert('Passwords do not match.');

      return;

    }

    this.profileService.changePassword(

      {
        current_password: value.current_password,
        new_password: value.new_password
      }
    ).subscribe({

      next: (res: any) => {

        alert(res.message);

        this.router.navigate(['/settings']);

      },

      error: (err) => {

        alert(err.error.message);

      }

    });

  }

}