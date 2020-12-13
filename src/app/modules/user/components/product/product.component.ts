import { Component, OnInit } from '@angular/core';
import {Product} from "../../../../interfaces/product";
import {ComponentAbstract} from "../../../../api/component";
import {NotifierService} from "angular-notifier";
import {ProductService} from "../../../../services/product.service";
import {CategoryService} from "../../../../services/category.service";
import {Category} from "../../../../interfaces/category";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent extends ComponentAbstract implements OnInit {

  case = 'Nuevo';
  title = 'Producto';
  item: Product;
  categories: Category[] = [];

  constructor(public ps: ProductService, private nt: NotifierService, private cs: CategoryService) {
    super(ps, nt);
  }

  ngOnInit(): void {
    this.getCategories();
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
