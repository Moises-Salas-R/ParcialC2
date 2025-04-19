import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth,private alertCtrl: AlertController,
    private router: Router, private platform: Platform) {}

  openJitsiCall(meetingId: string, displayName: string) {
    if (this.platform.is('android')) {
      (window as any).JitsiMeet?.joinConference({
        room: meetingId,
        serverUrl: 'https://jitsi1.geeksec.de',
        userInfo: {
        displayName
        }
      });
    } else {
     // Lógica alternativa para navegador o iOS
      window.open(`https://jitsi1.geeksec.de/${meetingId}`, '_blank');
    }
  }  
    
  async initPush() {
    const permStatus = await PushNotifications.requestPermissions();
    if (permStatus.receive !== 'granted') {
      console.error('Permisos de notificaciones no otorgados');
      return;
    }

    await PushNotifications.register();

    PushNotifications.addListener('registration', async (token) => {
      console.log('Token de dispositivo:', token.value);

      const user = await this.afAuth.currentUser;
      if (user) {
        await this.afs.doc(`users/${user.uid}`).update({
          token: token.value
        });
      }
    });


    PushNotifications.addListener('pushNotificationReceived', async (notification) => {
      const data = notification.data;
    
      if (data && data.type === 'incoming_call') {
        const alert = await this.alertCtrl.create({
          header: 'Llamada entrante',
          message: `${data.name} te está llamando`,
          buttons: [
            {
              text: 'Rechazar',
              role: 'cancel',
              handler: () => {
                console.log('Llamada rechazada');
              }
            },
            {
              text: 'Contestar',
              handler: () => {
                this.openJitsiCall(data.meetingId, data.name);
              }
            }
          ]
        });
    
        await alert.present();
      }
    });
    

    PushNotifications.addListener('registrationError', (err) => {
      console.error('Error en registro de notificaciones:', err);
    });

    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Notificación recibida:', notification);
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
      console.log('Interacción con notificación:', notification);
    });

    

  }
}
