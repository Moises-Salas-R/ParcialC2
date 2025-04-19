import { Component } from '@angular/core';
import { ContactService } from 'src/app/core/services/contact.service';
import { UserService } from 'src/app/core/services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  standalone:false,
})
export class AddContactPage {
  phone = '';

  constructor(
    private userService: UserService,
    private contactService: ContactService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async addContact() {
    const contactUser = await this.userService.getUserByPhone(this.phone).toPromise();

    if (!contactUser) {
      this.presentAlert('Usuario no encontrado');
      return;
    }

    const currentUser = await this.afAuth.currentUser;
    if (currentUser?.uid === contactUser.uid) {
      this.presentAlert('No puedes agregarte a ti mismo');
      return;
    }

    await this.contactService.addContact(currentUser!.uid, {
      uid: contactUser.uid,
      name: contactUser.name,
      lastname: contactUser.lastname,
      phone: contactUser.phone
    });

    this.router.navigate(['/home']);
  }

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
