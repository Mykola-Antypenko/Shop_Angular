import { NgModule } from '@angular/core';
import { RouterModule, type Routes } from '@angular/router';
import { CartListComponent } from './components/cart-list/cart-list.component';

const routes: Routes = [
  {
    path: 'cart',
    component: CartListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
