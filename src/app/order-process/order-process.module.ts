import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderProcessRoutingModule } from './order-process-routing.module';
import { OrderProcessComponent } from "./components/order-process/order-process.component";
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [OrderProcessRoutingModule.components],
  imports: [
    CommonModule,
    SharedModule,
    OrderProcessRoutingModule,
  ],
  exports: [
    OrderProcessComponent
  ]
})
export class OrderProcessModule { }
