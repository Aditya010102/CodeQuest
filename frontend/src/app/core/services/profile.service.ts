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

    Profile

} from '../../shared/interfaces/profile.interface';
import { environment } from '../../../environments/environment';

@Injectable({

    providedIn: 'root'

})

export class ProfileService {

    private http = inject(HttpClient);

    getProfile(

        userId: number

    ): Observable<Profile> {

        return this.http.get<Profile>(

            API.BASE_URL +

            API.PROFILE +

            "/" +

            userId

        );

    }

    updateProfile(

        userId: number,

        data: any

    ) {

        return this.http.put(

            API.BASE_URL +

            API.PROFILE +

            "/" +

            userId,

            data

        );

    }

    changePassword(

        userId: number,

        data: any

    ) {

        return this.http.put(

            environment.apiUrl +

            API.CHANGE_PASSWORD +

            "/" +

            userId,

            data

        );

    }

}