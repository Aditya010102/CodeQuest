import {

  Component,

  OnInit,

  inject,

  signal

} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { FavoriteService } from '../../core/services/favorite.service';

import { Favorite } from '../../shared/interfaces/favorite.interface';

@Component({

  selector: 'app-favorites',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './favorites.html',

  styleUrl: './favorites.css'

})

export class FavoritesComponent implements OnInit {

  private service = inject(FavoriteService);

  private router = inject(Router);

  favorites = signal<Favorite[]>([]);

  loading = signal(true);

  user = JSON.parse(

    localStorage.getItem('user') || '{}'

  );

  ngOnInit() {

    this.loadFavorites();

  }

  loadFavorites() {

    this.loading.set(true);

    this.service

      .getFavorites(this.user.id)

      .subscribe({

        next: (res) => {

          this.favorites.set(res);

          this.loading.set(false);

        },

        error: (err) => {

          console.error(err);

          this.loading.set(false);

        }

      });

  }

  remove(id: number) {

    this.service

      .removeFavorite(id)

      .subscribe({

        next: () => {

          this.loadFavorites();

        }

      });

  }

  practice(subjectId: number) {

    this.router.navigate([

      '/quiz',

      subjectId

    ]);

  }

}