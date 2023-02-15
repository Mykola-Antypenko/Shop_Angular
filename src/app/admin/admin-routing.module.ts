import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CanDeactivateGuard } from '../core/guards/can-deactivate.guard';
import { ProductResolver } from '../core/guards/product-resolve.resolver';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'products',
        component: ManageProductsComponent,
      },
      { path: 'product/add', component: ProductFormComponent },
      {
        path: 'product/edit/:productID',
        component: ProductFormComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          product: ProductResolver,
        }
      },
      { path: 'orders', component: OrdersComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
