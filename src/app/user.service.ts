import { Injectable, inject } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  router = inject(Router);

  //todo: hay que evitar este tipo 'any'

  login(user: any) {
    if (user.email == 'sergiotto@outlook.com' && user.password == '12345') {
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['home']);
    }
  }
  isLogged(): boolean {
    return localStorage.getItem('user') ? true : false;
  }
}
