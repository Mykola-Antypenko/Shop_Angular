import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import type {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { type Observable } from 'rxjs';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clonedRequest;
    let startTime = new Date();
    if (req.method === 'GET' || (req.method === 'POST')) {
      clonedRequest = req.clone();
      console.log('Time of requests in seconds: ', (new Date().valueOf() - startTime.valueOf())/1000);
      return next.handle(clonedRequest);
    } if (req.method === 'POST' || (req.method === 'PUT')) {
      clonedRequest = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
      return next.handle(clonedRequest);
    } else {
      return next.handle(req);
    }
  }
}
