import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  register(email: string, password: string): Promise<User | null> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(cred => cred.user)
      .catch(() => null);
  }

  saveUserData(uid: string, data: any): Promise<void> {
    const userRef = doc(this.firestore, `users/${uid}`);
    return setDoc(userRef, { ...data, token: '' });
  }

  login(email: string, password: string): Promise<User | null> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(cred => cred.user)
      .catch(() => null);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  authState(): Observable<User | null> {
    return authState(this.auth);
  }
}
