import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { API } from '../constants/api.constants';

import { AdminSubject, SubjectResponse } from '../../shared/interfaces/admin-subject.interface';

@Injectable({
    providedIn: 'root'
})
export class AdminSubjectService {

    private http = inject(HttpClient);

    private apiUrl =
        environment.apiUrl + API.ADMIN_SUBJECTS;

    getSubjects(

        page: number,

        search: string = ''

    ): Observable<SubjectResponse> {

        return this.http.get<SubjectResponse>(

            `${this.apiUrl}

?page=${page}

&per_page=10

&search=${search}`

        );

    }

    createSubject(data: any) {

        return this.http.post(

            this.apiUrl,

            data

        );

    }

    updateSubject(id: number, data: any) {

        return this.http.put(

            `${this.apiUrl}/${id}`,

            data

        );

    }

    deleteSubject(id: number) {

        return this.http.delete(

            `${this.apiUrl}/${id}`

        );

    }

}