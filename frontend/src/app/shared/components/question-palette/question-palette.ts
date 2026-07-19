import {

  Component,

  input,

  output

} from '@angular/core';

@Component({

  selector: 'app-question-palette',

  standalone: true,

  templateUrl: './question-palette.html',

  styleUrl: './question-palette.css'

})

export class QuestionPaletteComponent {

  total = input(0);

  current = input(0);

  answers = input<(number | null)[]>([]);

  questionSelected = output<number>();

}