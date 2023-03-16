import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductsFeatureKey } from '../app.state';
import { adapter, type ProductsState } from './products.state';
import { selectRouterState } from '../router';
import { IProduct } from '../../../products/models/product.interface';

export const selectProductsState = createFeatureSelector<ProductsState>(ProductsFeatureKey);

export const {
  selectEntities: selectProductsEntities,
  selectAll: selectProductsData
} = adapter.getSelectors(selectProductsState);
export const selectProductsLoaded = createSelector(selectProductsState, (state: ProductsState) => state.loaded);
export const selectProductItemByUrl = createSelector(
  selectProductsEntities,
  selectRouterState,
  (products, router): IProduct => {
    const productID = router.state.params['productID'];
    if (productID && products) {
      return products[productID] as IProduct;
    } else {
      return {} as IProduct;
    }
  }
);

