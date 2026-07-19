import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { API } from '../constants/api.constants';

import { Favorite } from '../../shared/interfaces/favorite.interface';

@Injectable({

    providedIn: 'root'

})

export class FavoriteService {

    private http = inject(HttpClient);

    addFavorite(data: any) {

        return this.http.post(

            environment.apiUrl +

            API.FAVORITES,

            data

        );

    }

    getFavorites(userId: number): Observable<Favorite[]> {

        return this.http.get<Favorite[]>(

            environment.apiUrl +

            API.FAVORITES +

            "/" +

            userId

        );

    }

    removeFavorite(id: number) {

        return this.http.delete(

            environment.apiUrl +

            API.FAVORITES +

            "/" +

            id

        );

    }

}