import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { API } from '../constants/api.constants';

import { Question } from '../../shared/interfaces/question.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private http = inject(HttpClient);

  // ==========================
  // Student Quiz
  // ==========================

  getQuestionsBySubject(subjectId: number): Observable<Question[]> {

    const url =
      environment.apiUrl +
      API.QUESTIONS +
      '/' +
      subjectId;

    console.log('Question API URL:', url);

    return this.http.get<Question[]>(url);

  }

  // ==========================
  // Admin
  // ==========================

  getQuestions(): Observable<Question[]> {

    return this.http.get<Question[]>(

      environment.apiUrl +

      API.QUESTIONS

    );

  }

  createQuestion(question: Question) {

    return this.http.post(

      environment.apiUrl +

      API.QUESTIONS,

      question

    );

  }

  updateQuestion(id: number, question: Question) {

    return this.http.put(

      environment.apiUrl +

      API.QUESTIONS +

      '/' +

      id,

      question

    );

  }

  deleteQuestion(id: number) {

    return this.http.delete(

      environment.apiUrl +

      API.QUESTIONS +

      '/' +

      id

    );

  }

}