import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private afs: AngularFirestore) {}

  getUserByPhone(phone: string) {
    return this.afs
      .collection('users', ref => ref.where('phone', '==', phone))
      .get()
      .pipe(
        map(snapshot => {

          interface UserData {
            name: string;
            lastname: string;
            phone: string;
            email: string;
            
          }

          if (snapshot.empty) return null;
          const doc = snapshot.docs[0];
          return {
            uid: doc.id,
            ...(doc.data() as UserData)
          };
        })
      );
  }

  
}
