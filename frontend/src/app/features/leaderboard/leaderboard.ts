import {

  Component,

  OnInit,

  inject,

  signal

} from '@angular/core';

import {

  CommonModule

} from '@angular/common';

import {

  LeaderboardService

} from '../../core/services/leaderboard.service';

import {

  Leaderboard

} from '../../shared/interfaces/leaderboard.interface';

@Component({

  selector: 'app-leaderboard',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './leaderboard.html',

  styleUrl: './leaderboard.css'

})

export class LeaderboardComponent implements OnInit {

  private service =

    inject(LeaderboardService);

  leaders =

    signal<Leaderboard[]>([]);

  ngOnInit() {

    this.service

      .getLeaderboard()

      .subscribe({

        next: (res) => {

          this.leaders.set(res);

        }

      });

  }

}