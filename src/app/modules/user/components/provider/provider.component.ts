import { Component, OnInit } from '@angular/core';
import {ComponentAbstract} from '../../../../api/component';
import {Provider} from '../../../../interfaces/provider';
import {ClientService} from '../../../../services/client.service';
import {NotifierService} from 'angular-notifier';
import {ProviderService} from '../../../../services/provider.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent extends ComponentAbstract implements OnInit {

  case = 'Nuevo';
  title = 'Proveedor';
  item: Provider;

  constructor(public ps: ProviderService, private nt: NotifierService) {
    super(ps, nt);
  }

  ngOnInit(): void {
  }

  edit(item: any): void {
    this.case = 'Editar';
    this.idEdit = item._id;
    this.item = Object.assign({}, item);
  }

  sendForm(): void {
    this.item.ruc = this.item.ruc.toString();
    this.addItem(this.item);
  }

  resetItem(): void {
    this.item = {
      address: '',
      cel: '',
      mail: '',
      name: '',
      phone: '',
      ruc: '',
      type: 'Recurrente'
    };
  }

}
