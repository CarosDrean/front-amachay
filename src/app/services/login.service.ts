import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {User} from "../interfaces/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL_API: string;

  constructor(private http: HttpClient, private router: Router) {
    this.URL_API = environment.api + '/login';
  }

  sessionIn(id: string, role: string, token: string): void {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('_id', id);
    sessionStorage.setItem('rol', role);
    if (role === 'Admin') {
      this.router.navigate(['/admin']).then(r => console.log(r));
    }
    if (role === 'User') {
      this.router.navigate(['/user']).then(r => console.log(r));
    }
  }

  login(item: User): Observable<any> {
    return this.http.post(this.URL_API, item);
  }

  logOut(): void {
    sessionStorage.removeItem('_id');
    sessionStorage.removeItem('rol');
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']).then(r => console.log(r));
  }

  getToken(): string {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return '';
    }
    return token;
  }
}
