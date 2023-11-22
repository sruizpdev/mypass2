import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  if (localStorage.getItem('user')) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
