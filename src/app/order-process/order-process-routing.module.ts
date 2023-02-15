import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderProcessComponent } from './components/order-process/order-process.component';
import { IsCartEmptyGuard } from '../cart/guards/is-cart-empty.guard';

const routes: Routes = [
  {
    path: '',
    component: OrderProcessComponent,
    canActivate: [IsCartEmptyGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderProcessRoutingModule {
  static components = [
    OrderProcessComponent
  ];
}
