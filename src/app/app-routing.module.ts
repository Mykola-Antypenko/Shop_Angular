import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PathNotFoundComponent } from './shared/components/path-not-found/path-not-found.component';
import { IsCartEmptyGuard } from './cart/guards/is-cart-empty.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'order',
    canLoad: [IsCartEmptyGuard],
    loadChildren: () => import('./order-process/order-process.module').then(m => m.OrderProcessModule)
  },
  {
    path: 'admin',
    canLoad: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '',
    redirectTo: 'product-list',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PathNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
