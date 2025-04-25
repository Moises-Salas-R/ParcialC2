import { Injectable } from '@angular/core';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  async initPush() {
    await PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      }
    });

    PushNotifications.addListener('registration', async (token: Token) => {
      const user = this.auth.currentUser;
      if (user) {
        const userDoc = doc(this.firestore, `users/${user.uid}`);
        await updateDoc(userDoc, { token: token.value });
      }
    });

    PushNotifications.addListener('registrationError', error => {
      console.error('Error al registrar el token FCM', error);
    });

    PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Notificación recibida:', notification);
    });
  }
}
