import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { API } from '../constants/api.constants';

import { QuizHistory } from '../../shared/interfaces/history.interface';
import { environment } from '../../../environments/environment';

@Injectable({

  providedIn: 'root'

})

export class ResultService {

  private http = inject(HttpClient);

  saveResult(result: any) {

    return this.http.post(

      environment.apiUrl +

      API.RESULTS,

      result

    );

  }

  getHistory(userId: number): Observable<QuizHistory[]> {

    return this.http.get<QuizHistory[]>(

      environment.apiUrl +

      API.RESULTS +

      '/user/' +

      userId

    );

  }

}