import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { UserService } from './user.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userService = inject(UserService);

  const lsItem = localStorage.getItem('user');
  if (lsItem) {
    if (JSON.parse(lsItem).uid == userService.whoIsLogged()) {
      return true;
    } else {
      localStorage.removeItem('user');
      router.navigate(['login']);
      return false;
    }
  } else {
    router.navigate(['login']);
    return false;
  }
};
