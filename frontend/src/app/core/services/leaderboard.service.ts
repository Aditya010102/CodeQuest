import {

    Injectable,

    inject

} from '@angular/core';

import {

    HttpClient

} from '@angular/common/http';

import {

    Observable

} from 'rxjs';

import {

    API

} from '../constants/api.constants';

import {

    Leaderboard

} from '../../shared/interfaces/leaderboard.interface';

@Injectable({

    providedIn: 'root'

})

export class LeaderboardService {

    private http = inject(HttpClient);

    getLeaderboard():

        Observable<Leaderboard[]> {

        return this.http.get<Leaderboard[]>(

            API.BASE_URL +

            API.LEADERBOARD

        );

    }

}