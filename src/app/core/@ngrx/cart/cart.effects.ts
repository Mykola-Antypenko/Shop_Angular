import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartObservableService } from '../../../cart/services/cart-observable/cart-observable.service';
import { concatMap, map, Observable, switchMap, of, catchError } from 'rxjs';
import { Action } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { IProduct } from '../../../products/models/product.interface';


@Injectable()
export class CartEffects {

  constructor(private actions$: Actions,
              private cartObservableService: CartObservableService) {
    console.log('[CART EFFECTS]');
  }

  getProductsFromCart$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.GetProductsFromCart),
      switchMap((action) =>
        this.cartObservableService.getProductsFromCart().pipe(
          map(cartProducts => {
            return CartActions.GetProductsFromCartSuccess( { cartProducts });
          }),
          catchError(error => of(CartActions.GetProductsFromCartError({error})))
        )
      )
    )
  );

  addProductToCart$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
      ofType(CartActions.AddProductToCart),
      map(action => action.productItem),
      concatMap((productItem: IProduct) =>
        this.cartObservableService.addProduct(productItem).pipe(
          map(productItem => {
            return CartActions.AddProductToCartSuccess({ productItem });
          }),
          catchError(error => of(CartActions.AddProductToCartError({ error })))
        )
      )
    )
  );

  deleteProductFromCart$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.DeleteProductFromCart),
      map(action => action.cartItem),
      concatMap((cartItem: IProduct) =>
        this.cartObservableService.removeProductFromCart(cartItem).pipe(
          map(() => {
            return CartActions.DeleteProductFromCartSuccess({ cartItem });
          }),
          catchError(error => of(CartActions.DeleteProductFromCartError({ error })))
        )
      )
    )
  );
}
