import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExternalApiService } from '../services/external-api.service';

@Injectable()
export class ExternalApiInterceptor implements HttpInterceptor {
  constructor(private externalApi: ExternalApiService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiToken = this.externalApi.getToken();

    const isExternalApi = req.url.startsWith('https://ravishing-courtesy-production.up.railway.app');

    if (apiToken && isExternalApi) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${apiToken}`
        }
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
