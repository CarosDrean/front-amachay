import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './components/main/main.component';
import { MovementComponent } from './components/movement/movement.component';
import { ClientComponent } from './components/client/client.component';
import { ProductComponent } from './components/product/product.component';


@NgModule({
  declarations: [DashboardComponent, MainComponent, MovementComponent, ClientComponent, ProductComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
