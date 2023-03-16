import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsPromiseService } from '../../../products/services/products-promise/products-promise.service';
import { map, type Observable, switchMap} from 'rxjs';
import { type Action } from '@ngrx/store';
import * as ProductsActions from './products.actions';

@Injectable()
export class ProductsEffects {

  constructor(
    private actions$: Actions,
    private productsPromiseService: ProductsPromiseService
  ) {
    console.log('[PRODUCTS EFFECTS]');
  }

  getProducts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.GetProducts),
      switchMap(action =>
        this.productsPromiseService.getProducts()
          .then((products) => ProductsActions.GetProductsSuccess({products}))
          .catch((error) => ProductsActions.GetProductsError({error}))
      )
    )
  );

  getProductItem$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.GetProduct),
      map(action => action.productID),
      switchMap(productID =>
        this.productsPromiseService.getProduct(productID)
          .then((productItem) => ProductsActions.GetProductItemSuccess({productItem}))
          .catch((error) => ProductsActions.GetProductItemError({error}))
      )
    )
  );

  addProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.AddProduct),
      map(action => action.productItem),
      switchMap(productItem =>
        this.productsPromiseService.addProduct(productItem)
          .then((productItem) => ProductsActions.AddProductSuccess({productItem}))
          .catch((error) => ProductsActions.AddProductError({error}))
      )
    )
  );

  editProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.EditProduct),
      map(action => action.productItem),
      switchMap(productItem =>
        this.productsPromiseService.editProductInfo(productItem)
          .then((productItem) => ProductsActions.EditProductSuccess({productItem}))
          .catch((error) => ProductsActions.EditProductError({error}))
      )
    )
  );

  deleteProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.DeleteProduct),
      map(action => action.productItem),
      switchMap(productItem =>
        this.productsPromiseService.deleteProduct(productItem)
          .then((productItem) =>
            ProductsActions.DeleteProductSuccess({productItem})
          )
          .catch((error) => ProductsActions.DeleteProductError({error}))
      )
    )
  );
}
