import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiFilesService {

  token: string

  constructor(private http: HttpClient) { }

  loginApiFiles(): Observable<any> {
    const item = {
      secret: environment.SECRET_API_FILES
    };
    return this.http.post(environment.api_files + '/login', item).pipe(
      map((resp: any) => {
        this.token = resp.token;
      })
    );
  }

  getInvoice(token: string, idImage: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    const params = new HttpParams()
      .set('name', idImage)
      .set('token', token)
    return this.http.get(environment.api_files + '/invoice/', {params, responseType: 'arraybuffer', headers});
  }

  uploadInvoice(file: File, token: string): Observable<any> {
    const formData = new FormData()
    formData.append('file', file, file.name)
    const headers = new HttpHeaders({
      Authorization: token
    });

    return this.http.post(environment.api_files + '/invoice/', formData, {headers});
  }

  deleteInvoice(idImage: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.http.delete(environment.api_files + `/${idImage}`, {headers});
  }
}
