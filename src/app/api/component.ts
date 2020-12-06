import { Service } from './service';
import {NotifierService} from "angular-notifier";

declare var $: any;

export abstract class ComponentAbstract {

  idEdit: string;
  idDelete: string;

  protected constructor(public service: Service, private nts: NotifierService) {
    this.getItems();
    this.clean();
  }

  getItems(): void {
    this.service.getItems().subscribe();
  }

  addItem(item: any): void {
    $('#form-user').modal('hide');
    if (this.idEdit !== '') {
      this.service.updateItem(item).subscribe((res) => {
        const response = JSON.stringify(res);
        this.nts.notify('success', 'Actualizando...' );
        this.getItems();
      });
    } else {
      this.service.createItem(item).subscribe((res) => {
        const response = JSON.stringify(res);
        this.nts.notify('success', 'Creando...' );
        this.getItems();
      });
    }
    this.clean();
  }

  deleteItem(): void {
    this.service.deleteItem(this.idDelete).subscribe((res) => {
      const response = JSON.stringify(res);
      this.nts.notify('error', 'Eliminando...' );
      this.getItems();
      this.clean();
    });
  }

  abstract edit(item: any): void;

  clean(): void {
    this.idEdit = '';
    this.idDelete = '';
    this.resetItem();
  }

  abstract resetItem(): void;

  getKeyForDelete(key: number): void {
    this.idDelete = key.toString();
  }

}
