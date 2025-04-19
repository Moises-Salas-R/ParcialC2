import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/core/services/contact.service';
import { Contact } from 'src/app/core/models/contact.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ExternalApiService } from 'src/app/core/services/external-api.service'; // ajustá el path si es necesario
import { JitsiService } from 'src/app/core/services/jitsi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone:false,
})
export class HomePage implements OnInit {
  contacts: Contact[] = [];
  currentUserName: string = '';
  currentUserId: string = '';

  constructor(
    private contactService: ContactService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private externalApiService: ExternalApiService,
    private jitsiService: JitsiService,

  ) {

  }

  ngOnInit() {
    this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
    });
  
    this.authService.getCurrentUser().subscribe((user: any) => {
      if (user) {
        this.currentUserId = user.uid;
        this.currentUserName = user.displayName || 'Sin nombre'; // o buscarlo desde Firestore
      }
    });
  
    this.notificationService.initPush();
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  startVideoCall(contact: any) {
    const meetingId = crypto.randomUUID();
  
    const payload = {
      token: contact.token,
      notification: {
        title: 'Llamada entrante',
        body: `${this.currentUserName} te está llamando`
      },
      android: {
        priority: 'high',
        data: {
          userId: contact.uid,
          meetingId,
          type: 'incoming_call',
          name: this.currentUserName,
          userFrom: this.currentUserId
        }
      }
    };
  
    this.externalApiService.sendNotification(payload).subscribe({
      next: () => {
        console.log('Notificación enviada');
        this.notificationService.openJitsiCall(meetingId, this.currentUserName);
      },
      error: (err) => {
        console.error('Error al enviar notificación:', err);
      }
    });
  }
  
  

}
