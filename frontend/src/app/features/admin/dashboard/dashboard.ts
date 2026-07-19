import { Component, OnInit, inject, signal } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AdminDashboardService } from '../../../core/services/admin-dashboard.service';

import { AdminDashboard } from '../../../shared/interfaces/admin-dashboard.interface';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class AdminDashboardComponent implements OnInit {

  private dashboardService = inject(

    AdminDashboardService

  );

  loading = signal(true);

  dashboard = signal<AdminDashboard | null>(

    null

  );

  ngOnInit(): void {

    this.loadDashboard();

  }

  loadDashboard() {

    this.dashboardService

      .getDashboard()

      .subscribe({

        next: (response) => {

          this.dashboard.set(

            response

          );

          this.loading.set(false);

        },

        error: (err) => {

          console.error(err);

          this.loading.set(false);

        }

      });

  }

}