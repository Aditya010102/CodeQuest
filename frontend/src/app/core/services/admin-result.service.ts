import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { API } from '../constants/api.constants';

import {

    ResultDetailResponse,
    ResultResponse

} from '../../shared/interfaces/admin-result.interface';

@Injectable({

    providedIn: 'root'

})

export class AdminResultService {

    private http = inject(HttpClient);

    private api =

        environment.apiUrl +

        API.ADMIN_RESULTS;

    getResults(

        page: number,

        search: string = '',

        userId: number | null = null,

        subjectId: number | null = null

    ): Observable<ResultResponse> {

        let url =

            `${this.api}

?page=${page}

&search=${search}`;

        if (userId) {

            url += `&user_id=${userId}`;

        }

        if (subjectId) {

            url += `&subject_id=${subjectId}`;

        }

        return this.http.get<ResultResponse>(url);

    }

    getResultDetails(
        id: number
    ): Observable<ResultDetailResponse> {

        return this.http.get<ResultDetailResponse>(
            `${this.api}/${id}`
        );

    }

}