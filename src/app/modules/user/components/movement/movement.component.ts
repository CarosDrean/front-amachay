import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Utils} from "../../../../shared/utils";
import {ComponentAbstract} from "../../../../api/component";
import {MovementService} from "../../../../services/movement.service";
import {NotifierService} from "angular-notifier";
import {Movement} from "../../../../interfaces/movement";
import {ProductService} from "../../../../services/product.service";
import {ClientService} from "../../../../services/client.service";
import {Product} from "../../../../interfaces/product";
import {Client} from "../../../../interfaces/client";
import {User} from "../../../../interfaces/user";
import {UserService} from "../../../../services/user.service";
import {Filter} from "../../../../interfaces/filter";

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent extends ComponentAbstract implements OnInit {

  type: string = '';
  from: string;
  to: string;

  case = 'Nueva';
  item: Movement;
  user: User;
  products: Product[] = [];
  clients: Client[] = [];
  movements: Movement[] = [];

  constructor(private route: ActivatedRoute, private router: Router, public ms: MovementService,
              private nt: NotifierService, private ps: ProductService, private cs: ClientService,
              private us: UserService) {
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

  getItems() {
    if (this.user) {
      this.getItemsFilter();
    }
  }

  private getItemsFilter() {
    const filter: Filter = {
      _id: this.user.idWarehouse.toString(),
      type: this.type,
      dateFrom: this.from,
      dateTo: this.to
    };
    this.subscription.add(this.ms.getItemsFilter(filter).subscribe(() => {
      this.movements = this.ms.items;
      console.log(this.movements);
    }));
  }

  private init(): void {
    this.type = this.route.snapshot.paramMap.get('type');
    this.getUser();
    this.getDateToday();
    this.getProducts();
    this.getClients();
  }

  edit(item: any) {
    this.case = 'Editar';
    this.idEdit = item._id;
    this.item = Object.assign({}, item);
  }

  sendForm() {
    const n = this.item.idProduct.toString();
    this.item.idProduct = +n;
    const c = this.item.idClient.toString();
    this.item.idClient = +c;
    this.item.idUser = this.user._id;
    this.item.idWarehouse = this.user.idWarehouse;
    if (this.type === 'output') {
      this.item.quantity = -this.item.quantity;
    }
    this.addItem(this.item);
  }

  resetItem() {
    this.item = {
      date: Utils.dateString(),
      idProduct: 1,
      idUser: this.user === undefined ? 1 : this.user._id,
      idWarehouse: this.user === undefined ? 1 : this.user.idWarehouse,
      quantity: 1,
      type: this.type
    };
  }

  private getDateToday(): void {
    this.from = Utils.dateString();
    this.to = Utils.dateString();
  }

  private getUser(): void {
    const id = sessionStorage.getItem('_id');
    this.subscription.add(this.us.getItem(id).subscribe(() => {
      this.user = this.us.item;
      this.getItemsFilter();
    }));
  }

  private getProducts(): void {
    this.subscription.add(this.ps.getItems().subscribe(() => {
      this.products = this.ps.items;
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
