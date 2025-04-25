import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, collectionData, doc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone:false
})
export class HomePage implements OnInit {
  contacts$: Observable<any[]> | undefined;
  userId: string | null = null;

  constructor(private auth: Auth, private firestore: Firestore, private router: Router) {}

  ngOnInit() {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
        const contactsRef = collection(this.firestore, `users/${user.uid}/contacts`);
        this.contacts$ = collectionData(contactsRef, { idField: 'id' });
      }
    });
  }

  goToAddContact() {
    this.router.navigate(['/add-contact']);
  }
}
