import {

  Component,

  effect,

  input,

  output,

  signal

} from '@angular/core';

@Component({

  selector: 'app-timer',

  standalone: true,

  templateUrl: './timer.html',

  styleUrl: './timer.css'

})

export class TimerComponent {

  minutes = input(10);

  timeUp = output<void>();

  remainingSeconds = signal(0);

  interval: any;

  constructor() {

    effect(() => {

      this.startTimer();

    });

  }

  startTimer() {

    clearInterval(this.interval);

    this.remainingSeconds.set(

      this.minutes() * 60

    );

    this.interval = setInterval(() => {

      const time = this.remainingSeconds() - 1;

      this.remainingSeconds.set(time);

      if (time <= 0) {

        clearInterval(this.interval);

        this.timeUp.emit();

      }

    }, 1000);

  }

  display() {

    const min = Math.floor(

      this.remainingSeconds() / 60

    );

    const sec = this.remainingSeconds() % 60;

    return `${min}:${sec < 10 ? '0' : ''}${sec}`;

  }

}