import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginService} from "../services/login.service";

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(LoginService);

    const token = authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token
    });

    const reqClone = req.clone({
      headers
    });
    return next.handle(reqClone);
  }
}
