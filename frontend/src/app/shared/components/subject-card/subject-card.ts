import {

  Component,

  Input

} from '@angular/core';

import {

  CommonModule

} from '@angular/common';

import {

  Router

} from '@angular/router';

import {

  Subject

} from '../../interfaces/subject.interface';

@Component({

  selector: 'app-subject-card',

  standalone: true,

  imports: [

    CommonModule

  ],

  templateUrl: './subject-card.html',

  styleUrl: './subject-card.css'

})

export class SubjectCardComponent {

  @Input()

  subject!: Subject;

  constructor(

    private router: Router

  ) { }

  startQuiz() {

    this.router.navigate([

      '/quiz',

      this.subject.id

    ]);

  }

}