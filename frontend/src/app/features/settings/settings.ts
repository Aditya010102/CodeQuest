import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

@Component({

  selector: 'app-settings',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './settings.html',

  styleUrl: './settings.css'

})

export class SettingsComponent {

  constructor(

    private router: Router

  ) { }

  goProfile() {

    this.router.navigate(

      ['/profile']

    );

  }

  changePassword() {

    this.router.navigate(

      ['/change-password']

    );

  }

  logout() {

    localStorage.clear();

    this.router.navigate(

      ['/']

    );

  }

}