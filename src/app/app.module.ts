import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './products/product.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './orders/order.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { FirstComponent } from './first-component/first/first.component';

@NgModule({
    declarations: [
        AppComponent,
        FirstComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ProductModule,
        CartModule,
        OrderModule,
        SharedModule,
        CoreModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
