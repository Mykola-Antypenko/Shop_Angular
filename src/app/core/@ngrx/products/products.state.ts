import { IProduct } from '../../../products/models/product.interface';
import { createEntityAdapter, type EntityState, type EntityAdapter } from '@ngrx/entity';

export interface ProductsState extends EntityState<IProduct> {
  productItem: IProduct | null;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | null;
}

function selectProductID(product: IProduct): string {
  return product.id!;
}

function sortProductsByAction(product1: IProduct, product2: IProduct): number {
  return product1.name.localeCompare(product2.name);
}

export const adapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>({
  selectId: selectProductID,
  sortComparer: sortProductsByAction
})

export const initialProductsState: ProductsState = adapter.getInitialState({
  productItem: null,
  loading: false,
  loaded: false,
  error: null,
});
