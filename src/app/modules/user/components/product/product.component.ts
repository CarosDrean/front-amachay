import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../../../../interfaces/product";
import {ComponentAbstract} from "../../../../api/component";
import {NotifierService} from "angular-notifier";
import {ProductService} from "../../../../services/product.service";
import {CategoryService} from "../../../../services/category.service";
import {Category} from "../../../../interfaces/category";
import {User} from "../../../../interfaces/user";
import {UserService} from "../../../../services/user.service";
import {SEARCH} from "../../../../store/search/search.reducer";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent extends ComponentAbstract implements OnInit, OnDestroy {

  case = 'Nuevo';
  title = 'Producto';
  item: Product;
  products: Product[] = [];
  categories: Category[] = [];
  private user: User;
  filter = 'all';
  temp = [];
  aux = [];

  constructor(public ps: ProductService, private nt: NotifierService, private cs: CategoryService,
              private us: UserService, private store: Store<any>) {
    super(ps, nt);
    this.subscription.add(store.select(SEARCH).subscribe(data => {
      let text = 'all';
      if (data !== ''){
        text = data;
      }
      this.search(text);
    }));
  }

  ngOnInit(): void {
    this.getCategories();
    this.getUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  search(val: string): void {
    this.filter = 'all';
    this.products = this.temp;
    if (val !== 'all') {
      this.products = this.products.filter(data => data.name.toLowerCase().indexOf(val) !== -1 || !val);
    }
  }

  getItems() {
    if (this.user) {
      this.getProductsStock(this.user.idWarehouse);
    }
  }

  getProductsStock(idWarehouse: number): void {
    this.ps.getItemsAllId(idWarehouse.toString()).subscribe(() => {
      this.products = this.ps.items;
      this.temp = this.products;
    });
  }

  private getUser(): void {
    const id = sessionStorage.getItem('_id');
    this.subscription = this.us.getItem(id).subscribe(() => {
      this.user = this.us.item
      this.getProductsStock(this.user.idWarehouse)
    })
  }

  private getCategories(): void {
    this.subscription.add(this.cs.getItems().subscribe(() => {
      this.categories = this.cs.items;
    }));
  }

  edit(item: any) {
    this.case = 'Editar';
    this.idEdit = item._id;
    this.item = Object.assign({}, item);
  }

  sendForm() {
    const n = this.item.idCategory.toString();
    this.item.idCategory = +n;
    this.addItem(this.item);
  }

  resetItem() {
    this.item = {
      name: '',
      description: '',
      idCategory: 0,
      price: 0,
      stock: 0
    };
  }

}
