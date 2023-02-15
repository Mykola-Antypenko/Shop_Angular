import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AdminComponent } from './components/admin/admin.component';
import { SharedModule } from '../shared/shared.module';
import { ProductModule } from '../products/product.module';
import { ProductFormComponent } from './components/product-form/product-form.component';


@NgModule({
  declarations: [
    ManageProductsComponent,
    OrdersComponent,
    AdminComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ProductModule,
    FormsModule,
    SharedModule
  ]
})
export class AdminModule { }
