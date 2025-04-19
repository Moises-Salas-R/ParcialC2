import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Contact } from '../models/contact.model';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {}

  getContacts(): Observable<Contact[]> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (!user) return of([]);
        return this.afs
          .collection<Contact>(`users/${user.uid}/contacts`)
          .valueChanges();
      })
    );
  }

  addContact(currentUserId: string, contact: Contact) {
    return this.afs
      .collection(`users/${currentUserId}/contacts`)
      .doc(contact.uid)
      .set(contact);
  }

}
