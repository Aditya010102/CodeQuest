import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {

  const router = inject(Router);

  const userString = localStorage.getItem('user');

  if (!userString) {

    router.navigate(['/']);

    return false;

  }

  const user = JSON.parse(userString);

  if (user.role === 'admin') {

    return true;

  }

  router.navigate(['/dashboard']);

  return false;

};