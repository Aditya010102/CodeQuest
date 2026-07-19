import { Component } from '@angular/core';

import { CommonModule }

  from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({

  selector: 'app-result',

  standalone: true,

  imports: [

    CommonModule, RouterLink

  ],

  templateUrl: './result.html',

  styleUrl: './result.css'

})

export class ResultComponent {

  result =

    JSON.parse(

      localStorage.getItem(

        'quizResult'

      ) || '{}'

    );

}