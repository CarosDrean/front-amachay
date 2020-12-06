import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminGuard} from "./guards/admin.guard";
import {LoginComponent} from "./modules/login/login.component";
import {UserGuard} from "./guards/user.guard";

const routes: Routes = [{ path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard], data: {preload: true}},
  { path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    canActivate: [UserGuard], data: {preload: true}},
  { path: '**', redirectTo: '/login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      useHash: true,
      enableTracing: true,
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
