import {Component, OnDestroy, OnInit} from '@angular/core';
import {ComponentAbstract} from '../../../../api/component';
import {Brand} from '../../../../interfaces/brand';
import {BrandService} from '../../../../services/brand.service';
import {NotifierService} from 'angular-notifier';

declare var $: any

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent extends ComponentAbstract implements OnInit, OnDestroy {

  case = 'Nueva';
  title = 'Marca';
  item: Brand;

  constructor(public bs: BrandService, private ns: NotifierService) {
    super(bs, ns)
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  getItems(): void {
    this.subscription.add(this.service.getItems().subscribe(() => {
      console.log(this.bs.items)
      setTimeout(() =>
        {
          $('#zero_config').DataTable();
        },
        10)
    }));
  }

  edit(item: any): void {
    this.case = 'Editar';
    this.idEdit = item._id;
    this.item = Object.assign({}, item);
  }

  sendForm(): void {
    this.addItem(this.item);
  }

  resetItem(): void {
    this.item = {
      name: '',
    };
  }

}
