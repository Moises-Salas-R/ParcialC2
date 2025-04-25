import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ExternalPushService {
  private apiUrl = 'https://ravishing-courtesy-production.up.railway.app/notifications';

  constructor(private http: HttpClient) {}

  sendCallNotification(data: {
    token: string;
    title: string;
    body: string;
    userId: string;
    meetingId: string;
    name: string;
    userFrom: string;
  }) {
    const payload = {
      token: data.token,
      notification: {
        title: data.title,
        body: data.body,
      },
      android: {
        priority: 'high',
        data: {
          userId: data.userId,
          meetingId: data.meetingId,
          type: 'incoming_call',
          name: data.name,
          userFrom: data.userFrom,
        },
      },
    };//localStorage.setItem('externalToken', response.token);


    return this.http.post(this.apiUrl, payload);
  }
}
