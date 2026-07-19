import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({

    providedIn: 'root'

})

export class DashboardService {

    private http = inject(HttpClient);

    private api =

        'http://127.0.0.1:5000/api/dashboard';

    getDashboard(userId: number) {

        return this.http.get(

            `${this.api}/${userId}`

        );

    }

}