import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ResultService } from '../../core/services/result.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './result.html',
  styleUrl: './result.css'
})
export class ResultComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private resultService = inject(ResultService);

  loading = signal(true);

  result = signal<any>(null);

  answers = signal<any[]>([]);

  ngOnInit() {

    const id = Number(

      this.route.snapshot.paramMap.get('id')

    );

    this.loadResult(id);

  }

  loadResult(id: number) {

    this.loading.set(true);

    this.resultService
      .getResultById(id)
      .subscribe({

        next: (response: any) => {

          this.result.set(response.result);

          this.answers.set(response.answers);

          this.loading.set(false);

        },

        error: (err) => {

          console.error(err);

          this.loading.set(false);

        }

      });

  }

}