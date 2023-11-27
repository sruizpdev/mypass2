import { Injectable, inject } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private auth: Auth, private fs: Firestore) {}
  router = inject(Router);

  addNew(user: Object) {
    const newRef = collection(this.fs, 'passwords');
    return addDoc(newRef, user);
  }
  getAll() {}

  isLogged(): boolean {
    return localStorage.getItem('user') ? true : false;
  }

  // login
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
