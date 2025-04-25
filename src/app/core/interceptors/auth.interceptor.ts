import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Auth } from '@angular/fire/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: Auth) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const externalToken = localStorage.getItem('externalToken');

    return from(this.auth.currentUser?.getIdToken() ?? Promise.resolve(null)).pipe(
      switchMap(firebaseToken => {
        let cloned = req;
        if (externalToken) {
          cloned = cloned.clone({
            headers: req.headers.set('Authorization', `Bearer ${externalToken}`)
          });
        }
        if (firebaseToken) {
          cloned = cloned.clone({
            headers: cloned.headers.set('X-Firebase-Token', firebaseToken)
          });
        }
        return next.handle(cloned);
      })
    );
  }
}
