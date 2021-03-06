import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../../../interfaces/product';
import {ComponentAbstract} from '../../../../api/component';
import {NotifierService} from 'angular-notifier';
import {ProductService} from '../../../../services/product.service';
import {CategoryService} from '../../../../services/category.service';
import {Category} from '../../../../interfaces/category';
import {User} from '../../../../interfaces/user';
import {UserService} from '../../../../services/user.service';
import {SEARCH} from '../../../../store/search/search.reducer';
import {Store} from '@ngrx/store';
import {Measure} from '../../../../interfaces/measure';
import {MeasureService} from '../../../../services/measure.service';
import {MovementService} from '../../../../services/movement.service';
import {Filter} from '../../../../interfaces/filter';
import {Movement} from '../../../../interfaces/movement';
import {Utils} from '../../../../shared/utils';
import {filter} from "rxjs/operators";

declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent extends ComponentAbstract implements OnInit, OnDestroy {

  case = 'Nuevo';
  title = 'Producto';
  item: Product;
  idWarehouse: number
  products: Product[] = [];
  categories: Category[] = [];
  measures: Measure[] = []
  lots: Movement[] = []
  brands: Movement[] = []
  private user: User;
  filter = 'all';
  temp = [];
  aux = [];
  productName = ''
  searchTemp = ''

  constructor(public ps: ProductService, private nt: NotifierService, private cs: CategoryService,
              private us: UserService, private store: Store<any>, private ms: MeasureService,
              private mvs: MovementService) {
    super(ps, nt);
    this.subscription.add(store.select(SEARCH).subscribe(data => {
      let text = 'all';
      if (data !== ''){
        text = data;
        this.searchTemp = text
      }
      this.search(text);
    }));
  }

  ngOnInit(): void {
    this.getCategories();
    this.getUser();
    this.getMeasures()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
    this.subscription.unsubscribe()
  }

  search(val: string): void {
    this.products = this.temp;
    if (val !== 'all') {
      this.products = this.products.filter(data => data.name.toLowerCase().indexOf(val) !== -1 || !val);
    }
    if (this.filter !== 'all') {
      this.products = this.products.filter(data => data.idCategory === +this.filter)
    }
  }

  getItems(): void {
    if (this.user) {
      this.getProductsStock(this.user.idWarehouse);
    }
  }

  getProductsStock(idWarehouse: number): void {
    this.ps.getItemsAllId(idWarehouse.toString()).subscribe(() => {
      this.products = this.ps.items;
      this.products = this.products.sort((a, b) => a.stock > b.stock ? 1 : -1)
      this.temp = this.products;
      console.log(this.products)
      setTimeout(() =>
        {
          $('#zero_config').DataTable();
        },
        10)
    });
  }

  private getUser(): void {
    const id = sessionStorage.getItem('_id');
    this.subscription.add(this.us.getItem(id).subscribe(() => {
      this.user = this.us.item
      this.idWarehouse = this.user.idWarehouse
      this.getProductsStock(this.user.idWarehouse)
    }))
  }

  private getCategories(): void {
    this.subscription.add(this.cs.getItems().subscribe(() => {
      this.categories = this.cs.items;
    }));
  }

  private getMeasures(): void {
    this.subscription.add(this.ms.getItems().subscribe(() => {
      this.measures = this.ms.items
    }))
  }

  getLots(idProduct: number): void {
    const product = this.products.find(e => e._id === idProduct)
    this.productName = product.name
    const filter: Filter = {
      _id: idProduct.toString(),
      auxId: this.idWarehouse.toString()
    }
    this.mvs.getItemsAllLotsWarehouse(filter).subscribe(() => {
      this.lots = this.mvs.items
      this.lots.forEach((e, i) => {
        this.lots[i].dayDue = Utils.dueDateCompare(e.dueDate)
      })
      this.lots = this.lots.sort((a, b) => new Date(a.dueDate) > new Date(b.dueDate) ? 1 : -1)
    })
  }

  getBrands(idProduct: number): void {
    const filter: Filter = {
      _id: idProduct.toString(),
      auxId: this.idWarehouse.toString()
    }
    this.mvs.getItemsAllBrandsWarehouse(filter).subscribe(() => {
      this.brands = this.mvs.items
    })
  }

  closeLots(): void {
    $('#form-lot').modal('hide');
  }

  closeBrands(): void {
    $('#form-brand').modal('hide');
  }

  edit(item: any): void {
    this.case = 'Editar';
    this.idEdit = item._id;
    this.item = Object.assign({}, item);
  }

  sendForm(): void {
    const n = this.item.idCategory.toString();
    this.item.idCategory = +n;
    const n2 = this.item.idMeasure.toString();
    this.item.idMeasure = +n2;
    this.addItem(this.item);
  }

  resetItem(): void {
    this.item = {
      name: '',
      description: '',
      idCategory: 0,
      price: 0,
      stock: 0,
      perishable: false
    };
  }

}
