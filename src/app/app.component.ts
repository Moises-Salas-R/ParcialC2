import { Component } from '@angular/core';
import { NotificationsService } from './core/services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private notificationsService: NotificationsService) {}

  initPush() {
    this.notificationsService.initPush();
  }

  
}
