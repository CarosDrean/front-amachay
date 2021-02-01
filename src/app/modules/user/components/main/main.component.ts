import {Component, OnDestroy, OnInit} from '@angular/core';
import * as feather from 'feather-icons';
import {Observable, of, Subscription} from 'rxjs';
import {LoginService} from '../../../../services/login.service';
import {Utils} from '../../../../shared/utils';
import {UserService} from '../../../../services/user.service';
import {select, Store} from '@ngrx/store';
import {SEARCH, SearchAction} from '../../../../store/search/search.reducer';
import {ProductService} from '../../../../services/product.service';
import {User} from '../../../../interfaces/user';
import {Product} from '../../../../interfaces/product';
import {MOVEMENT} from '../../../../store/movement/movement.reducer';

declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  user: Observable<string>;
  private subscription = new Subscription();
  search: Observable<string>;
  systemUser: User
  products: Product[] = []
  productsNotification: Product[] = []

  constructor(private ls: LoginService, private us: UserService, private store: Store<any>, private ps: ProductService) {
    this.search = store.pipe(select('search'));
    this.subscription.add(store.select(MOVEMENT).subscribe(data => {
      this.getNotifications()
    }));
  }

  ngOnInit(): void {
    feather.replace();
    Utils.loadScript();
    this.getUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getNotifications(): void {
    if (this.systemUser) {
      this.getProductsStock(this.systemUser.idWarehouse);
    }
  }

  getProductsStock(idWarehouse: number): void {
    this.ps.getItemsAllId(idWarehouse.toString()).subscribe(() => {
      this.products = this.ps.items
      this.getProductsNotification(this.products)
    });
  }

  private getProductsNotification(products: Product[]): void {
    this.productsNotification = []
    products.forEach(e => {
      if (e.stock <= e.minAlert) {
        this.productsNotification.push(e)
      }
    })
  }

  searchEvent(event: any): void {
    const action = new SearchAction(event.target.value.toLowerCase());
    this.store.dispatch(action);
  }

  private getUser(): void {
    const id = sessionStorage.getItem('_id');
    this.subscription.add(this.us.getItem(id).subscribe(() => {
      this.systemUser = this.us.item
      this.user = of(this.us.item.name);
      this.getNotifications()
    }));
  }

  logOut(): void {
    this.ls.logOut();
  }

}
