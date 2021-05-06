import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ShortInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const TOKEN = '41504468fa4a70458feabb99737df6071fc264a5';

    request = request.clone({ setHeaders: {Authorization: 'Bearer ' + TOKEN} });
    return next.handle(request);
  }
}
