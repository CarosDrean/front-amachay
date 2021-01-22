import {Component, OnInit} from '@angular/core';
import {Client} from '../../../../interfaces/client';
import {ComponentAbstract} from '../../../../api/component';
import {NotifierService} from 'angular-notifier';
import {ClientService} from '../../../../services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent extends ComponentAbstract implements OnInit {

  case = 'Nuevo';
  title = 'Cliente';
  item: Client;

  constructor(public cs: ClientService, private nt: NotifierService) {
    super(cs, nt);
  }

  ngOnInit(): void {
  }

  edit(item: any): void {
    this.case = 'Editar';
    this.idEdit = item._id;
    this.item = Object.assign({}, item);
  }

  sendForm(): void {
    this.item.dni = this.item.dni.toString();
    this.addItem(this.item);
  }

  resetItem(): void {
    this.item = {
      address: '',
      cel: '',
      dni: '',
      lastName: '',
      mail: '',
      name: '',
      phone: '',
      type: 'Recurrente'
    };
  }

}
