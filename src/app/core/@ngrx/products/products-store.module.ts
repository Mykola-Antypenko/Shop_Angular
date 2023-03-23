import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule} from '@ngrx/store';
import { reducer } from './products.reducer';
import { ProductsFeatureKey } from '../app.state';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './products.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(ProductsFeatureKey, reducer),
    EffectsModule.forFeature([ProductsEffects]),
  ]
})
export class ProductsStoreModule { }
