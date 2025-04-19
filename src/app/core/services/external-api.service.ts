import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiLoginRequest, ApiLoginResponse } from '../models/api-login.model';
import { environment } from 'src/environments/environment';
import { NotificationPayload } from '../models/external-notification.model';

@Injectable({
  providedIn: 'root'
})
export class ExternalApiService {
  private tokenKey = 'external_api_token';

  constructor(private http: HttpClient) {}

  loginToExternalApi(data: ApiLoginRequest) {
    return this.http.post<ApiLoginResponse>(`${environment.externalApiUrl}/user/login`, data);
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }

  sendNotification(payload: NotificationPayload) {
    return this.http.post(`${environment.externalApiUrl}/notifications`, payload);
  }

}
