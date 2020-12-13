import { Component, OnInit } from '@angular/core';
import {Category} from "../../../../interfaces/category";
import {ComponentAbstract} from "../../../../api/component";
import {NotifierService} from "angular-notifier";
import {CategoryService} from "../../../../services/category.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent extends ComponentAbstract implements OnInit {

  case = 'Nueva';
  title = 'Categoria';
  item: Category;

  constructor(public cs: CategoryService, private nt: NotifierService) {
    super(cs, nt);
  }

  ngOnInit(): void {
  }

  edit(item: any) {
    this.case = 'Editar';
    this.idEdit = item._id;
    this.item = Object.assign({}, item);
  }

  sendForm() {
    this.addItem(this.item);
  }

  resetItem() {
    this.item = {
      name: '',
    };
  }

}
