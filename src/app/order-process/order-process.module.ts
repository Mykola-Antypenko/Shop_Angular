import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderProcessRoutingModule } from './order-process-routing.module';
import { OrderProcessComponent } from "./components/order-process/order-process.component";
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [OrderProcessRoutingModule.components],
  imports: [
    CommonModule,
    SharedModule,
    OrderProcessRoutingModule,
    CoreModule,
    ReactiveFormsModule
  ],
  exports: [
    OrderProcessComponent
  ]
})
export class OrderProcessModule { }
