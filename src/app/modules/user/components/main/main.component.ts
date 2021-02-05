import {Component, OnDestroy, OnInit} from '@angular/core';
import * as feather from 'feather-icons';
import {Observable, of, Subscription} from 'rxjs';
import {LoginService} from '../../../../services/login.service';
import {Utils} from '../../../../shared/utils';
import {UserService} from '../../../../services/user.service';
import {select, Store} from '@ngrx/store';
import {SearchAction} from '../../../../store/search/search.reducer';
import {ProductService} from '../../../../services/product.service';
import {User} from '../../../../interfaces/user';
import {Product} from '../../../../interfaces/product';
import {MOVEMENT} from '../../../../store/movement/movement.reducer';
import {Title} from '@angular/platform-browser'

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
  counterNotification: Observable<number> = of(0)

  constructor(private ls: LoginService, private us: UserService, private store: Store<any>, private ps: ProductService,
              private title: Title) {
    this.search = store.pipe(select('search'));
    store.select(MOVEMENT).subscribe(data => {
      console.log(data)
      this.getNotifications()
    })
    title.setTitle('Amachay | Almacenero')
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
    this.counterNotification = of(this.productsNotification.length)
    this.title.setTitle(this.title.getTitle() +
      (this.productsNotification.length !== 0 ? ' (' + this.productsNotification.length + ')' : ''))
  }

  viewNotifications(): void {
    this.counterNotification = of(0)
    this.title.setTitle('Amachay | Almacenero')
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
