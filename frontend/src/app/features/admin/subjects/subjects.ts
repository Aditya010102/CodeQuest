import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSubjectService } from '../../../core/services/admin-subject.service';

import { AdminSubject } from '../../../shared/interfaces/admin-subject.interface';
import { ReactiveFormsModule, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { AlertService } from '../../../core/services/alert.service';
import {
  Subject,
  debounceTime,
  distinctUntilChanged
} from 'rxjs';


@Component({
  selector: 'app-admin-subjects',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule
  ],
  templateUrl: './subjects.html',
  styleUrl: './subjects.css'
})
export class AdminSubjectsComponent implements OnInit {

  private subjectService = inject(
    AdminSubjectService
  );
  private alert = inject(AlertService);
  private searchSubject = new Subject<string>();

  private fb = inject(FormBuilder);

  showModal = signal(false);

  isEditMode = signal(false);

  searchText = '';

  currentPage = 1;

  totalPages = 1;

  selectedSubjectId = signal<number | null>(null);

  subjectForm = this.fb.group({

    name: [

      '',

      Validators.required

    ],

    description: [

      ''

    ]

  });

  loading = signal(true);

  subjects = signal<AdminSubject[]>([]);



  ngOnInit(): void {

    //this.loadSubjects();
    this.searchSubject

      .pipe(

        debounceTime(300),

        distinctUntilChanged()

      )

      .subscribe(() => {

        this.loadSubjects();

      });

    this.loadSubjects();

  }

  loadSubjects() {

    this.loading.set(true);

    this.subjectService

      .getSubjects(

        this.currentPage,

        this.searchText

      )

      .subscribe({

        next: (response) => {

          this.subjects.set(

            response.subjects

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

  openAddModal() {

    this.subjectForm.reset();

    this.selectedSubjectId.set(null);

    this.isEditMode.set(false);

    this.showModal.set(true);

  }

  openEditModal(subject: AdminSubject) {

    this.subjectForm.patchValue({

      name: subject.name,

      description: subject.description

    });

    this.selectedSubjectId.set(

      subject.id

    );

    this.isEditMode.set(true);

    this.showModal.set(true);

  }

  closeModal() {

    this.showModal.set(false);

  }

  saveSubject() {

    if (this.subjectForm.invalid) {

      this.subjectForm.markAllAsTouched();

      return;

    }

    const data = this.subjectForm.value;

    const request = this.isEditMode()

      ? this.subjectService.updateSubject(

        this.selectedSubjectId()!,

        data

      )

      : this.subjectService.createSubject(data);

    request.subscribe({

      next: (res: any) => {

        this.closeModal();

        this.loadSubjects();

        this.alert.success(res.message);

      },

      error: (err) => {

        this.alert.error(

          err.error.message

        );

      }

    });

  }

  deleteSubject(subject: AdminSubject) {

    this.alert

      .confirm(

        'Delete Subject',

        `Delete "${subject.name}"?`

      )

      .then(result => {

        if (!result.isConfirmed) return;

        this.subjectService

          .deleteSubject(subject.id)

          .subscribe({

            next: (res: any) => {

              this.loadSubjects();

              this.alert.success(

                res.message

              );

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

      this.loadSubjects();

    }

  }

  nextPage() {

    if (

      this.currentPage <

      this.totalPages

    ) {

      this.currentPage++;

      this.loadSubjects();

    }

  }
}