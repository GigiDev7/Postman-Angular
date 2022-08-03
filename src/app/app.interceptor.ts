import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const newReq = request.clone({
      headers: request.headers.set(
        'startTime',
        new Date().getTime().toString()
      ),
    });
    return next.handle(newReq).pipe(
      tap((res: any) => {
        res.endTime = new Date().getTime().toString();
        res.startTime = newReq.headers.get('startTime');
      })
    );
  }
}
