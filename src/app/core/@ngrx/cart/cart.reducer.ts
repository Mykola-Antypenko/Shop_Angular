import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { initialCartState } from "./cart.state";


export const cartFeatureKey = 'cart';

export const cartReducer = createReducer(
  initialCartState,
  on(CartActions.GetProductsFromCart, state => {
    console.log('GET_PRODUCT_FROM_CART action being handled');
    return {
      ...state
    };
  }),
  on(CartActions.GetProductsFromCartSuccess, (state, { cartProducts }) => {
    console.log('GET_PRODUCT_FROM_CART_SUCCESS action being handled');
    const cartList = [ ...cartProducts ];
    return {
      ...state,
      cartList
    };
  }),
  on(CartActions.GetProductsFromCartError, (state, { error }) => {
    console.log('GET_PRODUCT_FROM_CART_ERROR action being handled');
    return {
      ...state,
      error
    };
  }),
  on(CartActions.AddProductToCart, state => {
    console.log('ADD_PRODUCT_TO_CART action being handled');
    return {
      ...state
    };
  }),
  on(CartActions.AddProductToCartSuccess, (state, { productItem }) => {
    console.log('ADD_PRODUCT_TO_CART_SUCCESS action being handled');
    const cartList = [ ...state.cartList, {...productItem}];
    return {
      ...state,
      cartList
    }
  }),
  on(CartActions.AddProductToCartError, (state, { error }) => {
    console.log('ADD_PRODUCT_TO_CART_ERROR action being handled');
    return {
      ...state,
      error
    }
  }),
  on(CartActions.DeleteProductFromCart, (state) => {
    console.log('DELETE_PRODUCT_FROM_CART action being handled');
    return {
      ...state,
    }
  }),
  on(CartActions.DeleteProductFromCartSuccess, (state, { cartItem }) => {
    console.log('DELETE_PRODUCT_FROM_CART_SUCCESS action being handled');
    return {
      ...state,
      cartItem
    }
  }),
  on(CartActions.DeleteProductFromCartError, (state, { error }) => {
    console.log('DELETE_PRODUCT_FROM_CART_ERROR action being handled');
    return {
      ...state,
      error
    }
  }),
)
