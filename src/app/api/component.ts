import { Service } from './service';

declare var $: any;

export abstract class ComponentAbstract {

  idEdit: string;
  idDelete: string;

  protected constructor(public service: Service) {
    this.getItems();
    this.clean();
  }

  getItems() {
    this.service.getItems().subscribe();
  }

  addItem(item: any) {
    if (this.idEdit !== '') {
      this.service.updateItem(item).subscribe((res) => {
        const response = JSON.stringify(res);
        this.getItems();
      });
    } else {
      this.service.createItem(item).subscribe((res) => {
        const response = JSON.stringify(res);
        this.getItems();
      });
    }
    this.clean();
  }

  deleteItem() {
    this.service.deleteItem(this.idDelete).subscribe((res) => {
      const response = JSON.stringify(res);
      this.getItems();
      this.clean();
    });
  }

  abstract edit(item: any);

  clean() {
    this.idEdit = '';
    this.idDelete = '';
    this.resetItem();
  }

  abstract resetItem();

  getKeyForDelete(key: string) {
    this.idDelete = key;
  }

}
