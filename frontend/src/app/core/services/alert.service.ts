import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    success(message: string) {

        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: message,
            timer: 1800,
            showConfirmButton: false
        });

    }

    error(message: string) {

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
        });

    }

    confirm(title: string, text: string) {

        return Swal.fire({

            title,

            text,

            icon: 'warning',

            showCancelButton: true,

            confirmButtonColor: '#2563eb',

            cancelButtonColor: '#ef4444',

            confirmButtonText: 'Yes'

        });

    }

}