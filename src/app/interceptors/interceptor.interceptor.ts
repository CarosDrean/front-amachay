import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {LoginService} from "../services/login.service";
import {NotifierService} from "angular-notifier";
import {catchError} from "rxjs/operators";

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private injector: Injector, private nts: NotifierService) { }

  // tslint:disable-next-line:typedef
  static manageError(error: HttpErrorResponse){
    console.log(error.error);
    return throwError(error)
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('Authorization')) {
      return next.handle(req);
    }
    const authService = this.injector.get(LoginService);

    const token = authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token
    });

    const reqClone = req.clone({
      headers
    });
    return next.handle(reqClone).pipe(catchError(InterceptorInterceptor.manageError));
  }

}
