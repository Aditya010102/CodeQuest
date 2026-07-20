import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import {

  Subject,

  debounceTime,

  distinctUntilChanged

} from 'rxjs';

import { AlertService } from '../../../core/services/alert.service';

import { AdminUserService } from '../../../core/services/admin-user.service';

import {

  AdminUser

} from '../../../shared/interfaces/admin-user.interface';

@Component({

  selector: 'app-admin-users',

  standalone: true,

  imports: [

    CommonModule,

    FormsModule

  ],

  templateUrl: './users.html',

  styleUrl: './users.css'

})

export class AdminUsersComponent implements OnInit {

  private userService = inject(AdminUserService);

  private alert = inject(AlertService);

  private searchSubject = new Subject<string>();

  loading = signal(true);

  users = signal<AdminUser[]>([]);

  currentUser = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  searchText = '';

  selectedRole = '';

  currentPage = 1;

  totalPages = 1;

  totalUsers = signal(0);

  totalAdmins = signal(0);

  activeUsers = signal(0);

  inactiveUsers = signal(0);

  ngOnInit() {

    this.searchSubject

      .pipe(

        debounceTime(300),

        distinctUntilChanged()

      )

      .subscribe(() => {

        this.currentPage = 1;

        this.loadUsers();

      });

    this.loadUsers();

  }

  loadUsers() {

    this.loading.set(true);



    this.userService

      .getUsers(

        this.currentPage,

        this.searchText,

        this.selectedRole

      )

      .subscribe({

        next: (response) => {

          this.users.set(

            response.users

          );

          this.totalUsers.set(
            response.statistics.total_users
          );

          this.totalAdmins.set(
            response.statistics.total_admins
          );

          this.activeUsers.set(
            response.statistics.active_users
          );

          this.inactiveUsers.set(
            response.statistics.inactive_users
          );

          this.currentPage =

            response.pagination.page;

          this.totalPages =

            response.pagination.total_pages;

          this.loading.set(false);

        },

        error: () => {

          this.loading.set(false);

        }

      });

  }

  onSearch() {

    this.searchSubject.next(

      this.searchText

    );

  }

  previousPage() {

    if (this.currentPage > 1) {

      this.currentPage--;

      this.loadUsers();

    }

  }

  nextPage() {

    if (

      this.currentPage <

      this.totalPages

    ) {

      this.currentPage++;

      this.loadUsers();

    }

  }
  changeRole(user: AdminUser) {

    const newRole = user.role === 'admin'
      ? 'user'
      : 'admin';

    this.alert.confirm(

      'Change Role',

      `Change ${user.full_name} to ${newRole}?`

    ).then(result => {

      if (!result.isConfirmed) {

        return;

      }

      this.userService
        .updateRole(
          user.id,
          newRole
        )
        .subscribe({

          next: (res: any) => {

            this.alert.success(
              res.message
            );

            this.loadUsers();

          },

          error: (err) => {

            this.alert.error(
              err.error.message
            );

          }

        });

    });

  }

  toggleStatus(user: AdminUser) {

    if (user.id === this.currentUser.id) {

      this.alert.error(

        'You cannot deactivate your own account.'

      );

      return;

    }

    const newStatus = !user.is_active;

    const action = newStatus

      ? 'Activate'

      : 'Deactivate';

    this.alert.confirm(

      action + ' User',

      `${action} ${user.full_name}?`

    ).then(result => {

      if (!result.isConfirmed) {

        return;

      }

      this.userService
        .updateStatus(
          user.id,
          newStatus
        )
        .subscribe({

          next: (res: any) => {

            this.alert.success(
              res.message
            );

            this.loadUsers();

          },

          error: (err) => {

            this.alert.error(
              err.error.message
            );

          }

        });

    });

  }
}