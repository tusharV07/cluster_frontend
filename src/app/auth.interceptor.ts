import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClusterService } from './cluster.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private clusterService: ClusterService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const creds = this.clusterService.getCredentials();

    if (creds) {
      const auth = btoa(`${creds.username}:${creds.password}`);
      const authReq = req.clone({
        setHeaders: { Authorization: `Basic ${auth}` }
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}

