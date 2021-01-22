import { Injectable } from '@angular/core';
import {Service} from '../api/service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeasureService extends Service{

  constructor(private https: HttpClient) {
    super(https, environment.api + '/measure/');
  }
}
