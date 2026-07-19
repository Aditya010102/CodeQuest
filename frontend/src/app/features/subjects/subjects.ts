import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SubjectService } from '../../core/services/subject.service';
import { Subject } from '../../shared/interfaces/subject.interface';
import { SubjectCardComponent } from '../../shared/components/subject-card/subject-card';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SubjectCardComponent
  ],
  templateUrl: './subjects.html',
  styleUrl: './subjects.css'
})
export class SubjectsComponent implements OnInit {

  constructor(private subjectService: SubjectService) { }

  loading = signal(true);

  subjects = signal<Subject[]>([]);

  searchText = signal('');

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
  }

  loadSubjects() {

    this.loading.set(true);

    this.subjectService
      .getSubjects()
      .subscribe({

        next: (response) => {

          this.subjects.set(response);

          this.loading.set(false);

        },

        error: (err) => {

          console.error(err);

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