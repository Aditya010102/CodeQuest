import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AdminSidebarComponent } from '../../../shared/components/admin-sidebar/admin-sidebar';
import { AdminNavbarComponent } from '../../../shared/components/admin-navbar/admin-navbar';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    AdminSidebarComponent,
    AdminNavbarComponent
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayoutComponent {

}