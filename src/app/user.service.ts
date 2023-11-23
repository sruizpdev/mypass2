import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  isLogged(): boolean {
    return localStorage.getItem('user') ? true : false;
  }
}
