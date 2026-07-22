import {

  Component,

  OnInit,

  inject,

  signal

} from '@angular/core';

import {

  CommonModule

} from '@angular/common';

import {

  FormsModule

} from '@angular/forms';

import {

  ProfileService

} from '../../core/services/profile.service';

@Component({

  selector: 'app-profile',

  standalone: true,

  imports: [

    CommonModule,

    FormsModule

  ],

  templateUrl: './profile.html',

  styleUrl: './profile.css'

})

export class ProfileComponent implements OnInit {

  private service =

    inject(ProfileService);

  user =

    JSON.parse(

      localStorage.getItem(

        'user'

      ) || '{}'

    );

  profile =

    signal<any>(null);

  editing = false;

  ngOnInit() {

    this.loadProfile();

  }

  loadProfile() {

    this.service
      .getProfile()
      .subscribe({

        next: (res) => {

          this.profile.set(res);

        }

      });

  }

  save() {

    this.service
      .updateProfile(
        this.profile()
      )
      .subscribe({

        next: () => {

          alert("Profile Updated");

          this.editing = false;

          this.loadProfile();

        }

      });

  }

}