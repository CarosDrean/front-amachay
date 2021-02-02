import { Injectable } from '@angular/core';
import {Service} from '../api/service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Filter} from '../interfaces/filter';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovementService extends Service{

  constructor(private https: HttpClient) {
    super(https, environment.api + '/movement/');
  }

  getItemsAllLotsWarehouse(filter: Filter): Observable<any> {
    return this.https.post(this.URL_API + `all-lots-warehouse/`, filter).pipe(
      map((items: any[]) => {
        this.items = items;
      })
    );
  }

  getItemsAllBrandsWarehouse(filter: Filter): Observable<any> {
    return this.https.post(this.URL_API + `all-brands-warehouse/`, filter).pipe(
      map((items: any[]) => {
        this.items = items;
      })
    );
  }
}
