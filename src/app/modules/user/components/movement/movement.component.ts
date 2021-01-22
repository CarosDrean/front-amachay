import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Utils} from '../../../../shared/utils';
import {ComponentAbstract} from '../../../../api/component';
import {MovementService} from '../../../../services/movement.service';
import {NotifierService} from 'angular-notifier';
import {Movement} from '../../../../interfaces/movement';
import {ProductService} from '../../../../services/product.service';
import {ClientService} from '../../../../services/client.service';
import {Product} from '../../../../interfaces/product';
import {Client} from '../../../../interfaces/client';
import {User} from '../../../../interfaces/user';
import {UserService} from '../../../../services/user.service';
import {Filter} from '../../../../interfaces/filter';
import {ProviderService} from '../../../../services/provider.service';
import {Provider} from '../../../../interfaces/provider';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent extends ComponentAbstract implements OnInit {

  type = '';
  from: string;
  to: string;

  measure = 'Unidad de Medida'
  stock = 0

  case = 'Nueva';
  item: Movement;
  user: User;
  products: Product[] = [];
  clients: Client[] = [];
  providers: Provider[] = [];
  movements: Movement[] = [];

  constructor(private route: ActivatedRoute, private router: Router, public ms: MovementService,
              private nt: NotifierService, private ps: ProductService, private cs: ClientService,
              private us: UserService, private pds: ProviderService) {
    super(ms, nt);
  }

  ngOnInit(): void {
    this.init();
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.init();
      }
    });
  }

  getItems(): void {
    if (this.user) {
      this.getItemsFilter();
    }
  }

  changeProduct(): void {
    const product = this.products.find(e => e._id.toString() === this.item.idProduct.toString())
    this.measure = product.measure
    this.stock = product.stock
    console.log(product)
  }

  private getItemsFilter(): void {
    const filter: Filter = {
      _id: this.user.idWarehouse.toString(),
      type: this.type,
      dateFrom: this.from,
      dateTo: this.to
    };
    this.subscription.add(this.ms.getItemsFilter(filter).subscribe(() => {
      this.movements = this.ms.items;
    }));
  }

  private init(): void {
    this.type = this.route.snapshot.paramMap.get('type');
    this.getUser();
    this.getDateToday();
    this.getClients();
    this.getProviders()
  }

  edit(item: any): void {
    this.case = 'Editar';
    this.idEdit = item._id;
    this.item = Object.assign({}, item);
    this.item.date = Utils.dateToString(new Date(this.item.date))
  }

  sendForm(): void {
    const n = this.item.idProduct.toString();
    this.item.idProduct = +n;
    const c = this.item.idClient.toString();
    this.item.idClient = +c;
    const p = this.item.idProvider.toString();
    this.item.idProvider = +p;
    this.item.idUser = this.user._id;
    this.item.idWarehouse = this.user.idWarehouse;
    if (this.type !== 'input' && this.stock === 0 && this.item.quantity > this.stock) {
      this.nt.notify('error', '¡No Cuenta con Stock Disponible!')
      return
    }
    if (this.type === 'output') {
      if (this.item.quantity > 0) {
        this.item.quantity = -this.item.quantity;
      }
    }

    this.addItem(this.item).then(e => {
      this.getProducts(this.user.idWarehouse.toString())
    });
  }

  resetItem(): void {
    this.item = {
      date: Utils.dateString(),
      idProduct: 1,
      idUser: this.user === undefined ? 1 : this.user._id,
      idWarehouse: this.user === undefined ? 1 : this.user.idWarehouse,
      quantity: 1,
      type: this.type,
      idClient: 0,
      idProvider: 0
    };
  }

  private getDateToday(): void {
    this.from = Utils.dateString(1);
    this.to = Utils.dateString();
  }

  private getUser(): void {
    const id = sessionStorage.getItem('_id');
    this.subscription.add(this.us.getItem(id).subscribe(() => {
      this.user = this.us.item;
      this.getItemsFilter();
      this.getProducts(this.user.idWarehouse.toString())
    }));
  }

  private getProducts(idWarehouse: string): void {
    this.subscription.add(this.ps.getItemsAllId(idWarehouse).subscribe(() => {
      this.products = this.ps.items;
    }));
  }

  private getProviders(): void {
    this.subscription.add(this.pds.getItems().subscribe(() => {
      this.providers = this.pds.items;
    }));
  }

  private getClients(): void {
    this.subscription.add(this.cs.getItems().subscribe(() => {
      this.clients = this.cs.items;
    }));
  }

  updateDate(): void {
    this.getItemsFilter();
  }

}
