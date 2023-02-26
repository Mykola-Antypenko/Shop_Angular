import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './products/product.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './orders/order.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { FirstComponent } from './first-component/first/first.component';
import { LoginModule } from './login/login.module';
import { httpInterceptorProviders } from './core/interceptors';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
  ],
  imports: [
    BrowserModule,
    ProductModule,
    CartModule,
    OrderModule,
    SharedModule,
    CoreModule,
    LoginModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    const replacer = (key: string, value: any): string =>
      typeof value === 'function' ? value.name : value;

    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }

}
