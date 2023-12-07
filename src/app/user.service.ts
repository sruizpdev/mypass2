import { Injectable, inject } from '@angular/core';

import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
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
  delete(id: string) {
    const docInstance = doc(this.fs, 'passwords', id);
    return deleteDoc(docInstance);
  }

  update(id: string, data: object) {
    const docInstance = doc(this.fs, 'passwords', id);
    return updateDoc(docInstance, data);
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
  whoIsLogged(){
    return this.auth.currentUser?.uid;
  }
}
