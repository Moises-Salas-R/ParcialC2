import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {}

  async register(email: string, password: string, data: any) {
    const cred = await this.afAuth.createUserWithEmailAndPassword(email, password);
    const uid = cred.user?.uid;
    if (uid) {
      await this.afs.collection('users').doc(uid).set({
        uid,
        name: data.name,
        lastname: data.lastname,
        phone: data.phone,
        email
      });
    }
    return cred;
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut();
  }

  getCurrentUser() {
    return this.afAuth.authState;
  }

  getUserData(uid: string) {
    return this.afs.doc(`users/${uid}`).valueChanges();
  }

  

}
