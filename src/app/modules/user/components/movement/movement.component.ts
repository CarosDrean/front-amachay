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
import {of} from "rxjs";
import {User} from "../../../../interfaces/user";
import {UserService} from "../../../../services/user.service";

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
    this.item.idClient = this.user._id;
    this.item.idWarehouse = this.user.idWarehouse;
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
  }

}
