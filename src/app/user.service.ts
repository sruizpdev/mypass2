import { Injectable, inject } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private auth: Auth, private fs: Firestore) {}
  router = inject(Router);

  addNew(user: Object) {
    const dbInstance = collection(this.fs, 'passwords');
    return addDoc(dbInstance, user);
  }
  getAll() {
    const collectionInstance = collection(this.fs, 'passwords');
    return collectionData(collectionInstance, { idField: 'id' });
  }

  isLogged(): boolean {
    return localStorage.getItem('user') ? true : false;
  }

  // login
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
