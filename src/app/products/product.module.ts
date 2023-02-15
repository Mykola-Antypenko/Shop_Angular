import { NgModule } from '@angular/core';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductViewComponent } from './components/product-view/product-view.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductViewComponent,
  ],
    imports: [
        SharedModule,
        ProductRoutingModule
    ],
  exports: [
    ProductListComponent,
    ProductViewComponent
  ],
})
export class ProductModule { }
