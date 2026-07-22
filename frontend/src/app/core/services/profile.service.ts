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

    getProfile(): Observable<Profile> {

        return this.http.get<Profile>(
            API.BASE_URL +
            API.PROFILE
        );

    }

    updateProfile(data: any) {

        return this.http.put(
            API.BASE_URL +
            API.PROFILE,
            data
        );

    }

    changePassword(data: any) {

        return this.http.put(
            environment.apiUrl +
            API.CHANGE_PASSWORD,
            data
        );

    }

}