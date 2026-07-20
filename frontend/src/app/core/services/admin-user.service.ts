import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { API } from '../constants/api.constants';

import {

    UserResponse

} from '../../shared/interfaces/admin-user.interface';

@Injectable({

    providedIn: 'root'

})

export class AdminUserService {

    private http = inject(HttpClient);

    private api =

        environment.apiUrl +

        API.ADMIN_USERS;

    getUsers(

        page: number,

        search: string = '',

        role: string = ''

    ): Observable<UserResponse> {

        let url =

            `${this.api}

?page=${page}

&search=${search}

&role=${role}`;

        return this.http.get<UserResponse>(url);

    }

    updateRole(

        id: number,

        role: string

    ) {

        return this.http.put(

            `${this.api}/${id}/role`,

            {

                role

            }

        );

    }

    updateStatus(

        id: number,

        is_active: boolean

    ) {

        return this.http.put(

            `${this.api}/${id}/status`,

            {

                is_active

            }

        );

    }

}