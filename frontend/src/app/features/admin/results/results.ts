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

import { AdminResultService } from '../../../core/services/admin-result.service';

import {

  AdminResult,
  ResultAnswer,
  ResultDetail

} from '../../../shared/interfaces/admin-result.interface';

@Component({

  selector: 'app-admin-results',

  standalone: true,

  imports: [

    CommonModule,

    FormsModule

  ],

  templateUrl: './results.html',

  styleUrl: './results.css'

})

export class AdminResultsComponent implements OnInit {

  private resultService =

    inject(AdminResultService);

  private searchSubject =

    new Subject<string>();

  loading = signal(true);

  results = signal<AdminResult[]>([]);

  searchText = '';

  selectedUser: number | null = null;

  selectedSubject: number | null = null;

  currentPage = 1;

  totalPages = 1;

  totalResults = signal(0);

  averagePercentage = signal(0);

  selectedResult = signal<ResultDetail | null>(null);

  resultAnswers = signal<ResultAnswer[]>([]);

  showModal = signal(false);

  ngOnInit() {

    this.searchSubject

      .pipe(

        debounceTime(300),

        distinctUntilChanged()

      )

      .subscribe(() => {

        this.currentPage = 1;

        this.loadResults();

      });

    this.loadResults();

  }

  loadResults() {

    this.loading.set(true);

    this.resultService

      .getResults(

        this.currentPage,

        this.searchText,

        this.selectedUser,

        this.selectedSubject

      )

      .subscribe({

        next: (response) => {

          this.results.set(

            response.results

          );

          this.currentPage =

            response.pagination.page;

          this.totalPages =

            response.pagination.total_pages;

          this.totalResults.set(

            response.statistics.total_results

          );

          this.averagePercentage.set(

            response.statistics.average_percentage

          );

          this.loading.set(false);

        },

        error: () => {

          this.loading.set(false);

        }

      });

  }
  viewResult(resultId: number) {

    this.resultService
      .getResultDetails(resultId)
      .subscribe({

        next: (response) => {

          this.selectedResult.set(
            response.result
          );

          this.resultAnswers.set(
            response.answers
          );

          this.showModal.set(true);

        },

        error: (err) => {

          console.error(err);

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

      this.loadResults();

    }

  }

  nextPage() {

    if (this.currentPage < this.totalPages) {

      this.currentPage++;

      this.loadResults();

    }

  }

  closeModal() {

    this.showModal.set(false);

    this.selectedResult.set(null);

    this.resultAnswers.set([]);

  }

}