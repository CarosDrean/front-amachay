import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {UserComponent} from "./components/user/user.component";
import {WarehouseComponent} from "./components/warehouse/warehouse.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'users', component: UserComponent },
          { path: 'warehouses', component: WarehouseComponent },
          { path: '**', pathMatch: 'full', redirectTo: 'dashboard' },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
