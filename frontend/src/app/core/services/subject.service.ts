import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { API } from '../constants/api.constants';

import { Subject } from '../../shared/interfaces/subject.interface';
import { environment } from '../../../environments/environment';

@Injectable({

  providedIn: 'root'

})

export class SubjectService {

  private http = inject(HttpClient);


  getSubjects(): Observable<Subject[]> {

    return this.http.get<Subject[]>(

      environment.apiUrl +

      API.SUBJECTS

    );

  }

  createSubject(data: any) {

    return this.http.post(

      environment.apiUrl +

      API.SUBJECTS,

      data

    );

  }

  updateSubject(

    id: number,

    data: any

  ) {

    return this.http.put(

      environment.apiUrl +

      API.SUBJECTS +

      "/" +

      id,

      data

    );

  }

  deleteSubject(id: number) {

    return this.http.delete(

      environment.apiUrl +

      API.SUBJECTS +

      "/" +

      id

    );

  }

}

