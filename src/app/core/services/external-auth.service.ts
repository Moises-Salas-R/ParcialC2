import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ExternalAuthService {
  private authUrl = 'https://ravishing-courtesy-production.up.railway.app/user/login';

  constructor(private http: HttpClient) {}

  loginToExternalServer(email: string, password: string) {
    return this.http.post<{ token: string }>(this.authUrl, { email, password });
  }
  
  

}
