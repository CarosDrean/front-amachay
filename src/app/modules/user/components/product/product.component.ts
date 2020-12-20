import { Component, OnInit } from '@angular/core';
import {Product} from "../../../../interfaces/product";
import {ComponentAbstract} from "../../../../api/component";
import {NotifierService} from "angular-notifier";
import {ProductService} from "../../../../services/product.service";
import {CategoryService} from "../../../../services/category.service";
import {Category} from "../../../../interfaces/category";
import {of} from "rxjs";
import {User} from "../../../../interfaces/user";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent extends ComponentAbstract implements OnInit {

  case = 'Nuevo';
  title = 'Producto';
  item: Product;
  products: Product[] = [];
  categories: Category[] = [];
  private user: User;

  constructor(public ps: ProductService, private nt: NotifierService, private cs: CategoryService, private us: UserService) {
    super(ps, nt);
  }

  ngOnInit(): void {
    this.getCategories();
    this.getUser();
  }

  getItems() {
    if (this.user) {
      this.getProductsStock(this.user.idWarehouse);
    }
  }

  getProductsStock(idWarehouse: number): void {
    this.ps.getItemsAllId(idWarehouse.toString()).subscribe(() => {
      this.products = this.ps.items;
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
