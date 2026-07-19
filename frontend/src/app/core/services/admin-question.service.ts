import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { API } from '../constants/api.constants';

import {
    QuestionResponse
} from '../../shared/interfaces/admin-question.interface';

import {
    SubjectResponse
} from '../../shared/interfaces/admin-subject.interface';

@Injectable({
    providedIn: 'root'
})
export class AdminQuestionService {

    private http = inject(HttpClient);

    private apiUrl =
        environment.apiUrl + API.ADMIN_QUESTIONS;

    // =============================
    // GET QUESTIONS
    // =============================

    getQuestions(
        page: number = 1,
        search: string = '',
        subjectId: number | null = null
    ): Observable<QuestionResponse> {

        let url =
            `${this.apiUrl}?page=${page}&per_page=10&search=${encodeURIComponent(search)}`;

        if (subjectId !== null) {

            url += `&subject_id=${subjectId}`;

        }

        return this.http.get<QuestionResponse>(url);

    }

    // =============================
    // CREATE QUESTION
    // =============================

    createQuestion(data: any) {

        return this.http.post(

            this.apiUrl,

            data

        );

    }

    // =============================
    // UPDATE QUESTION
    // =============================

    updateQuestion(
        id: number,
        data: any
    ) {

        return this.http.put(

            `${this.apiUrl}/${id}`,

            data

        );

    }

    // =============================
    // DELETE QUESTION
    // =============================

    deleteQuestion(id: number) {

        return this.http.delete(

            `${this.apiUrl}/${id}`

        );

    }

    // =============================
    // GET SUBJECTS
    // =============================

    getSubjects(): Observable<SubjectResponse> {

        return this.http.get<SubjectResponse>(

            `${environment.apiUrl}${API.ADMIN_SUBJECTS}?page=1&per_page=100`

        );

    }

}