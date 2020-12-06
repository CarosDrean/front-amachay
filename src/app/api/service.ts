import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export abstract class Service {

  item;
  items: any[];

  protected constructor(private http: HttpClient, readonly URL_API) {}

  getItemsAllId(_id: string) {
    return this.http.get(this.URL_API + `/all/${_id}`).pipe(
      map((items: any[]) => {
        this.items = items;
      })
    );
  }

  getItemsAllIdRuta(_id: string, ruta: string) {
    return this.http.get(this.URL_API + `/${ruta}/${_id}`).pipe(
      map((items: any[]) => {
        this.items = items;
      })
    );
  }

  getItems() {
    return this.http.get(this.URL_API).pipe(
      map((items: any[]) => {
        this.items = items;
      })
    );
  }

  getItem(_id: string) {
    return this.http.get(this.URL_API + `/${_id}`).pipe(
      map((item: any) => {
        this.item = item;
      })
    );
  }

  createItem(item: any) {
    return this.http.post(this.URL_API, item);
  }

  updateItem(item: any) {
    return this.http.put(this.URL_API + `/${item._id}`, item);
  }

  deleteItem(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

}
