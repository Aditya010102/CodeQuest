import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { QuestionService } from '../../core/services/question.service';
import { Question } from '../../shared/interfaces/question.interface';
import { Router } from '@angular/router';

import { QuizService }

  from '../../core/services/quiz.service';
import { TimerComponent } from '../../shared/components/timer/timer';
import { QuestionPaletteComponent } from '../../shared/components/question-palette/question-palette';
import { ResultService } from '../../core/services/result.service';
import { FavoriteService } from '../../core/services/favorite.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, TimerComponent, QuestionPaletteComponent],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css'
})
export class QuizComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private questionService = inject(QuestionService);
  private quizService: QuizService = inject(QuizService);
  private router: Router = inject(Router);
  private resultService = inject(ResultService);
  private favoriteService = inject(FavoriteService);

  subjectId = 0;

  questions = signal<Question[]>([]);

  bookmarkedQuestions = signal<number[]>([]);

  currentQuestionIndex = signal(0);

  loading = signal(true);

  selectedOption = signal<number | null>(null);

  answers = signal<(number | null)[]>([]);

  bookmarks = signal<number[]>([]);
  currentQuestion = signal<Question | null>(null);

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      this.subjectId = Number(params.get('subjectId'));

      this.loadQuestions();

    });

  }

  loadQuestions() {

    this.loading.set(true);

    this.questionService

      .getQuestionsBySubject(this.subjectId)

      .subscribe({

        next: (response) => {
          this.questions.set(response);

          this.answers.set(new Array(response.length).fill(null));

          if (response.length > 0) {

            this.currentQuestion.set(response[0]);

          }

          this.loading.set(false);
        },

        error: (err) => {

          console.log(err);

          this.loading.set(false);

        }

      });

  }

  // get currentQuestion(): Question | undefined {

  //   return this.questions()[

  //     this.currentQuestionIndex()

  //   ];

  // }

  selectOption(optionId: number) {

    this.selectedOption.set(optionId);

    const answerArray = [...this.answers()];

    answerArray[this.currentQuestionIndex()] = optionId;

    this.answers.set(answerArray);

  }

  nextQuestion() {

    if (this.currentQuestionIndex() < this.questions().length - 1) {

      const nextIndex = this.currentQuestionIndex() + 1;

      this.currentQuestionIndex.set(nextIndex);

      this.currentQuestion.set(

        this.questions()[nextIndex]

      );

      this.selectedOption.set(

        this.answers()[nextIndex]

      );

    }

  }
  previousQuestion() {

    if (this.currentQuestionIndex() > 0) {

      const prevIndex = this.currentQuestionIndex() - 1;

      this.currentQuestionIndex.set(prevIndex);

      this.currentQuestion.set(

        this.questions()[prevIndex]

      );

      this.selectedOption.set(

        this.answers()[prevIndex]

      );

    }

  }
  submitQuiz() {

    if (!confirm('Submit Quiz?')) {
      return;
    }

    const payload = {

      subject_id: this.subjectId,

      answers: this.questions().map((question, index) => ({

        question_id: question.id,

        selected_option_id: this.answers()[index]

      }))

    };

    this.resultService
      .saveResult(payload)
      .subscribe({

        next: (response: any) => {

          this.router.navigate([
            '/result',
            response.result_id
          ]);

        },

        error: console.error

      });

  }

  goToQuestion(index: number) {

    this.currentQuestionIndex.set(index);

    this.currentQuestion.set(

      this.questions()[index]

    );

    this.selectedOption.set(

      this.answers()[index]

    );

  }

  toggleBookmark() {

    const question = this.currentQuestion();

    if (!question) {

      return;

    }

    const payload = {

      question_id: question.id

    };

    this.favoriteService

      .addFavorite(payload)

      .subscribe({

        next: (response: any) => {

          const bookmarked = [

            ...this.bookmarkedQuestions()

          ];

          if (!bookmarked.includes(question.id)) {

            bookmarked.push(question.id);

            this.bookmarkedQuestions.set(bookmarked);

          }

          alert(response.message);

        },

        error: (err) => {

          console.error(err);

        }

      });

  }
}