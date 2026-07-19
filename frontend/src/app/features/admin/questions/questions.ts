import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { AdminQuestionService } from '../../../core/services/admin-question.service';

import {
  AdminQuestion
} from '../../../shared/interfaces/admin-question.interface';

import {
  AdminSubject,
  SubjectResponse
} from '../../../shared/interfaces/admin-subject.interface';
import { AlertService } from '../../../core/services/alert.service';
import {

  Subject,

  debounceTime,

  distinctUntilChanged

} from 'rxjs';

@Component({
  selector: 'app-admin-questions',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './questions.html',
  styleUrl: './questions.css'
})
export class AdminQuestionsComponent implements OnInit {

  private questionService = inject(AdminQuestionService);

  private fb = inject(FormBuilder);
  private alert = inject(AlertService);
  private searchSubject = new Subject<string>();

  loading = signal(true);

  questions = signal<AdminQuestion[]>([]);

  subjects = signal<AdminSubject[]>([]);

  showModal = signal(false);

  isEditMode = signal(false);

  selectedQuestionId = signal<number | null>(null);

  currentPage = 1;

  totalPages = 1;

  searchText = '';

  selectedSubject: number | null = null;

  questionForm = this.fb.group({

    subject_id: this.fb.control<number | null>(
      null,
      Validators.required
    ),

    question_text: this.fb.control(
      '',
      Validators.required
    ),

    optionA: this.fb.control(
      '',
      Validators.required
    ),

    optionB: this.fb.control(
      '',
      Validators.required
    ),

    optionC: this.fb.control(
      '',
      Validators.required
    ),

    optionD: this.fb.control(
      '',
      Validators.required
    ),

    correctAnswer: this.fb.control(
      'A',
      Validators.required
    ),

    difficulty: this.fb.control(
      'Easy',
      Validators.required
    ),

    marks: this.fb.control<number>(
      1,
      Validators.required
    )

  });
  ngOnInit(): void {

    this.loadSubjects();

    this.searchSubject

      .pipe(

        debounceTime(300),

        distinctUntilChanged()

      )

      .subscribe(() => {

        this.currentPage = 1;

        this.loadQuestions();

      });

    this.loadQuestions();

    this.loadSubjects();

  }

  // ==========================
  // LOAD SUBJECTS
  // ==========================

  loadSubjects() {

    this.questionService

      .getSubjects()

      .subscribe({

        next: (response: SubjectResponse) => {

          this.subjects.set(

            response.subjects

          );

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  // ==========================
  // LOAD QUESTIONS
  // ==========================

  loadQuestions() {

    this.loading.set(true);

    this.questionService

      .getQuestions(

        this.currentPage,

        this.searchText,

        this.selectedSubject

      )

      .subscribe({

        next: (response) => {

          this.questions.set(

            response.questions

          );

          this.currentPage =

            response.pagination.page;

          this.totalPages =

            response.pagination.total_pages;

          this.loading.set(false);

        },

        error: (err) => {

          console.error(err);

          this.loading.set(false);

        }

      });

  }

  // ==========================
  // ADD
  // ==========================

  openAddModal() {

    this.questionForm.reset({

      subject_id: null,

      question_text: '',

      optionA: '',

      optionB: '',

      optionC: '',

      optionD: '',

      correctAnswer: 'A',

      difficulty: 'Easy',

      marks: 1

    });

    this.selectedQuestionId.set(null);

    this.isEditMode.set(false);

    this.showModal.set(true);

  }

  // ==========================
  // EDIT
  // ==========================

  openEditModal(question: AdminQuestion) {

    const index = question.options.findIndex(

      option => option.is_correct

    );

    const answer =

      ['A', 'B', 'C', 'D'][index] ?? 'A';

    this.questionForm.patchValue({

      subject_id: question.subject_id,

      question_text: question.question_text,

      optionA: question.options[0]?.text ?? '',

      optionB: question.options[1]?.text ?? '',

      optionC: question.options[2]?.text ?? '',

      optionD: question.options[3]?.text ?? '',

      correctAnswer: answer,

      difficulty: question.difficulty,

      marks: question.marks

    });

    this.selectedQuestionId.set(

      question.id

    );

    this.isEditMode.set(true);

    this.showModal.set(true);

  }

  // ==========================
  // CLOSE
  // ==========================

  closeModal() {

    this.showModal.set(false);

  }

  // ==========================
  // SAVE
  // ==========================

  saveQuestion() {

    if (this.questionForm.invalid) {

      this.questionForm.markAllAsTouched();

      return;

    }

    const value = this.questionForm.getRawValue();

    const payload = {

      subject_id: value.subject_id!,

      question_text: value.question_text!,

      difficulty: value.difficulty!,

      marks: value.marks!,

      options: [

        {

          text: value.optionA!,

          is_correct: value.correctAnswer === 'A'

        },

        {

          text: value.optionB!,

          is_correct: value.correctAnswer === 'B'

        },

        {

          text: value.optionC!,

          is_correct: value.correctAnswer === 'C'

        },

        {

          text: value.optionD!,

          is_correct: value.correctAnswer === 'D'

        }

      ]

    };

    const request =

      this.isEditMode()

        ? this.questionService.updateQuestion(

          this.selectedQuestionId()!,

          payload

        )

        : this.questionService.createQuestion(

          payload

        );

    request.subscribe({

      next: (res: any) => {

        this.closeModal();

        this.loadQuestions();

        this.alert.success(res.message);

      },

      error: (err) => {

        this.alert.error(

          err.error.message

        );

      }

    });

  }
  deleteQuestion(question: AdminQuestion) {

    this.alert

      .confirm(

        'Delete Question',

        'Delete this question?'

      )

      .then(result => {

        if (!result.isConfirmed) {

          return;

        }

        this.questionService

          .deleteQuestion(

            question.id

          )

          .subscribe({

            next: (res: any) => {

              this.alert.success(

                res.message

              );

              this.loadQuestions();

            },

            error: (err) => {

              this.alert.error(

                err.error.message

              );

            }

          });

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

      this.loadQuestions();

    }

  }

  nextPage() {

    if (

      this.currentPage <

      this.totalPages

    ) {

      this.currentPage++;

      this.loadQuestions();

    }

  }
}