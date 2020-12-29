import { Component, OnInit } from '@angular/core';
import {ComponentAbstract} from "../../../../api/component";
import {User} from "../../../../interfaces/user";
import {NotifierService} from "angular-notifier";
import {UserService} from "../../../../services/user.service";
import {WarehouseService} from "../../../../services/warehouse.service";
import {Warehouse} from "../../../../interfaces/warehouse";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends ComponentAbstract implements OnInit {

  case = 'Nuevo';
  title = 'Usuario';
  item: User;
  warehouses: Warehouse[] = [];

  constructor(public us: UserService, private nt: NotifierService, private ws: WarehouseService) {
    super(us, nt);
  }

  ngOnInit(): void {
    this.getWarehouse();
  }

  private getWarehouse(): void {
    this.subscription.add(this.ws.getItems().subscribe(() => {
      this.warehouses = this.ws.items;
    }));
  }

  edit(item: any) {
    this.case = 'Editar';
    this.idEdit = item._id;
    this.item = Object.assign({}, item);
  }

  sendForm() {
    if (this.item.idWarehouse !== -1 && this.item.idWarehouse !== 0) {
      const n = this.item.idWarehouse.toString();
      this.item.idWarehouse = +n;
    } else if (this.item.idWarehouse === 0) {
      this.item.idWarehouse = -1;
    }

    this.addItem(this.item);
  }

  resetItem() {
    this.item = {
      username: '',
      role: 'Admin',
      password: '',
      address: '',
      cel: '',
      dni: '',
      lastName: '',
      mail: '',
      name: '',
      phone: '',
      idWarehouse: -1
    };
  }

}
