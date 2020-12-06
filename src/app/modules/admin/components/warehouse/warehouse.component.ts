import { Component, OnInit } from '@angular/core';
import {ComponentAbstract} from "../../../../api/component";
import {WarehouseService} from "../../../../services/warehouse.service";
import {Warehouse} from "../../../../interfaces/warehouse";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent extends ComponentAbstract implements OnInit {

  case = 'Nuevo';
  title = 'Almacen';
  item: Warehouse;

  constructor(public ws: WarehouseService, private nt: NotifierService) {
    super(ws, nt);
  }

  ngOnInit(): void {
  }

  edit(item: any) {
    this.case = 'Editar';
    this.idEdit = item._id;
    this.item = Object.assign({}, item);
  }

  resetItem() {
    this.item = {
      name: '',
      address: '',
      state: ''
    };
  }

}
