import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ProductsStoreModule } from './products/products-store.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../../environment/environment';
import { CartStoreModule } from './cart/cart-store.module';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { routerReducers, CustomSerializer, RouterEffects } from './router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(routerReducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: false,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true
      }
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal,
      serializer: CustomSerializer
    }),
    EffectsModule.forRoot([RouterEffects]),
    ProductsStoreModule,
    CartStoreModule,
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 25,
      autoPause: true
    }) : [],
  ]
})
export class RootStoreModule {
}
