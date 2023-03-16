import { ProductsState } from './products';
import { CartState } from './cart';

export const ProductsFeatureKey = 'productsState';
export const CartFeatureKey = 'cartState';

export interface AppState {
  [ProductsFeatureKey]: ProductsState;
  [CartFeatureKey]: CartState;
}
