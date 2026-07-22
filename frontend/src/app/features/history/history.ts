import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ResultService } from '../../core/services/result.service';
import { QuizHistory } from '../../shared/interfaces/history.interface';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePipe
  ],
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export class HistoryComponent implements OnInit {

  private resultService = inject(ResultService);
  private router = inject(Router);

  user = JSON.parse(localStorage.getItem('user') || '{}');

  history = signal<QuizHistory[]>([]);

  search = signal('');

  currentPage = signal(1);

  pageSize = 5;

  filteredHistory = computed(() => {

    return this.history().filter(item =>

      item.subject.name

        .toLowerCase()

        .includes(

          this.search()

            .toLowerCase()

        )

    );

  });

  pagedHistory = computed(() => {

    const start =

      (this.currentPage() - 1)

      * this.pageSize;

    return this.filteredHistory()

      .slice(

        start,

        start + this.pageSize

      );

  });

  totalPages = computed(() =>

    Math.ceil(

      this.filteredHistory().length

      / this.pageSize

    )

  );

  ngOnInit(): void {

    this.loadHistory();

  }

  loadHistory() {

    this.resultService

      .getHistory(



    )

      .subscribe({

        next: (response) => {

          this.history.set(response);

        },

        error: console.error

      });

  }

  onSearch(event: Event) {

    this.search.set(

      (event.target as HTMLInputElement)

        .value

    );

    this.currentPage.set(1);

  }

  previousPage() {

    if (this.currentPage() > 1) {

      this.currentPage.update(page => page - 1);

    }

  }

  nextPage() {

    if (

      this.currentPage()

      <

      this.totalPages()

    ) {

      this.currentPage.update(page => page + 1);

    }

  }

  retakeQuiz(subjectId: number) {

    this.router.navigate([

      '/quiz',

      subjectId

    ]);

  }

}