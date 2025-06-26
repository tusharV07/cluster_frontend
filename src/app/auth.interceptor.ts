import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const username = localStorage.getItem('username') || '';
    const password = localStorage.getItem('password') || '';
    const auth = btoa(`${username}:${password}`);
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Basic ${auth}`
      }
    });
    return next.handle(authReq);
  }
}

