import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { API } from '../constants/api.constants';

import { environment } from '../../../environments/environment';

import { AdminDashboard } from '../../shared/interfaces/admin-dashboard.interface';

@Injectable({

    providedIn: 'root'

})

export class AdminDashboardService {

    private http = inject(HttpClient);

    getDashboard(): Observable<AdminDashboard> {

        return this.http.get<AdminDashboard>(

            environment.apiUrl +

            API.ADMIN_DASHBOARD

        );

    }

}