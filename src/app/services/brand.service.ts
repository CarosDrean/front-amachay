import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Service} from '../api/service';

@Injectable({
  providedIn: 'root'
})
export class BrandService extends Service{

  constructor(private https: HttpClient) {
    super(https, environment.api + '/brand/');
  }
}
