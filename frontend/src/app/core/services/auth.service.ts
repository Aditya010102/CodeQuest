import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API } from '../constants/api.constants';
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse
} from '../../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  login(data: LoginRequest): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(
      API.BASE_URL + API.AUTH + '/login',
      data
    );

  }

  register(data: RegisterRequest): Observable<any> {

    return this.http.post(
      API.BASE_URL + API.AUTH + '/register',
      data
    );

  }

  logout(): void {

    localStorage.removeItem('token');
    localStorage.removeItem('user');

  }

  saveUser(auth: AuthResponse): void {

    localStorage.setItem(
      'token',
      auth.token
    );

    localStorage.setItem(
      'user',
      JSON.stringify(auth.user)
    );

  }

  getToken(): string | null {

    return localStorage.getItem('token');

  }

  getUser() {

    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;

  }

  isLoggedIn(): boolean {

    return !!this.getToken();

  }

}