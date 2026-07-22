import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectService } from '../../core/services/subject.service';

import { Subject } from '../../shared/interfaces/subject.interface';

import { SubjectCardComponent } from '../../shared/components/subject-card/subject-card';

import { StatCardComponent } from '../../shared/components/stat-card/stat-card';
import { DashboardService } from '../../core/services/dashboard.service';
import { DashboardData } from '../../shared/interfaces/dashboard.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    StatCardComponent
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  constructor(
    private subjectService: SubjectService,
    private dashboardService: DashboardService
  ) { }

  user = JSON.parse(localStorage.getItem('user') || '{}');

  loading = signal(true);

  subjects = signal<Subject[]>([]);

  completedQuiz = signal(0);

  accuracy = signal(0);

  searchText = signal('');
  dashboardData = signal<DashboardData | null>(null);

  filteredSubjects = computed(() => {

    return this.subjects().filter(subject =>

      subject.name

        .toLowerCase()

        .includes(

          this.searchText()

            .toLowerCase()

        )

    );

  });

  ngOnInit(): void {

    this.loadSubjects();
    this.loadDashboard();

  }

  loadDashboard() {

    this.dashboardService
      .getDashboard()
      .subscribe({

        next: (response: any) => {

          this.dashboardData.set(response);

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  loadSubjects() {

    this.loading.set(true);

    this.subjectService

      .getSubjects()

      .subscribe({

        next: (res: any) => {

          this.subjects.set(res.subjects);

          this.loading.set(false);

        },

        error: (err) => {

          console.log(err);

          this.loading.set(false);

        }

      });

  }

  onSearch(event: Event) {

    this.searchText.set(

      (event.target as HTMLInputElement).value

    );

  }

}