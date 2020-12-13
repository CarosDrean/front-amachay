import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subscription} from "rxjs";
import {UserService} from "../../../../services/user.service";
import {WarehouseService} from "../../../../services/warehouse.service";
import {User} from "../../../../interfaces/user";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  user: Observable<string> = of('Usuario');
  nameWarehouse: Observable<string> = of('Almacen');
  userO: User;

  private subscription = new Subscription();

  constructor(private us: UserService, private ws: WarehouseService) { }

  ngOnInit(): void {
    this.getUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getUser(): void {
    const id = sessionStorage.getItem('_id');
    this.subscription.add(this.us.getItem(id).subscribe(() => {
      this.user = of(this.us.item.name);
      this.userO = this.us.item;
      this.getWarehouse(this.userO.idWarehouse);
    }));
  }

  private getWarehouse(id: number): void {
    this.subscription.add(this.ws.getItem(id.toString()).subscribe(() => {
      this.nameWarehouse = of(this.ws.item.name)
    }));
  }

}
