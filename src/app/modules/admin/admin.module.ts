import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './components/user/user.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {NotifierModule, NotifierOptions} from "angular-notifier";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {FormsModule} from "@angular/forms";

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [UserComponent, WarehouseComponent, MainComponent, DashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SweetAlert2Module,
    NotifierModule.withConfig(customNotifierOptions),
    FormsModule,
  ]
})
export class AdminModule { }
