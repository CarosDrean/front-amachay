import { Service } from './service';
import {NotifierService} from 'angular-notifier';
import {Subscription} from 'rxjs';

declare var $: any;

export abstract class ComponentAbstract{

  idEdit: string;
  idDelete: string;
  subscription = new Subscription();

  protected constructor(public service: Service, private nts: NotifierService) {
    this.getItems();
    this.clean();
  }

  getItems(): void {
    this.subscription.add(this.service.getItems().subscribe());
  }

  hideModal(): void {
    $('#form-user').modal('hide');
  }

  addItem(item: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this.idEdit !== '') {
        this.service.updateItem(item).subscribe((res) => {
          this.hideModal()
          this.nts.notify('success', 'Actualizando...' );
          this.getItems()
          resolve('Creado con exito');
        }, error => {
          this.nts.notify('error', '¡Hubo un error al actualizar!' );
          reject(error);
        })
      } else {
        this.service.createItem(item).subscribe((res) => {
          this.hideModal()
          const response = JSON.stringify(res);
          this.nts.notify('success', 'Creando...' );
          this.getItems()
          resolve('Actualizado con exito');
        }, error => {
          this.nts.notify('error', '¡Hubo un error al actualizar!' );
          reject(error);
        })
      }
      this.clean();
    })
  }

  deleteItem(): void {
    this.subscription.add(this.service.deleteItem(this.idDelete).subscribe((res) => {
      const response = JSON.stringify(res);
      this.nts.notify('error', 'Eliminando...' );
      this.getItems();
      this.clean();
    }, error => {
      this.nts.notify('error', '¡Hubo un error al eliminar!' );
    }));
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

  abstract sendForm(): void;

}
