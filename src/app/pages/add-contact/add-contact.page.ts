import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  standalone:false
})
export class AddContactPage {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private auth: Auth,
    private router: Router
  ) {
    this.form = this.fb.group({
      telefono: ['']
    });
  }

  async onSubmit() {
    const { telefono } = this.form.value;
    const contactQuery = doc(this.firestore, `users`, telefono);
    const snapshot = await getDoc(contactQuery);

    if (!snapshot.exists()) {
      alert('Contacto no encontrado');
      return;
    }

    const contactData = snapshot.data();
    const currentUser = this.auth.currentUser;
    if (!currentUser) return;

    const contactRef = doc(this.firestore, `users/${currentUser.uid}/contacts/${telefono}`);
    await setDoc(contactRef, {
      nombre: contactData['nombre'],
      telefono: telefono
    });

    this.router.navigate(['/home']);
  }
}
