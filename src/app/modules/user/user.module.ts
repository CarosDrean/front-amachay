import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {MainComponent} from './components/main/main.component';
import {MovementComponent} from './components/movement/movement.component';
import {ClientComponent} from './components/client/client.component';
import {ProductComponent} from './components/product/product.component';
import {NotifierModule, NotifierOptions} from 'angular-notifier';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {CategoryComponent} from './components/category/category.component';
import {FormsModule} from '@angular/forms';
import {MeasureComponent} from './components/measure/measure.component';
import {ProviderComponent} from './components/provider/provider.component';
import {InvoiceComponent} from './components/invoice/invoice.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import { BrandComponent } from './components/brand/brand.component';

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
  declarations: [
    DashboardComponent,
    MainComponent,
    MovementComponent,
    ClientComponent,
    ProductComponent,
    CategoryComponent, MeasureComponent, ProviderComponent, InvoiceComponent, BrandComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SweetAlert2Module,
    NotifierModule.withConfig(customNotifierOptions),
    FormsModule,
    PdfViewerModule,
  ]
})
export class UserModule {
}
