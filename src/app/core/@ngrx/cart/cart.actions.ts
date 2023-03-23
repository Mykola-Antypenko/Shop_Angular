import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../../products/models/product.interface';


export const GetProductsFromCart = createAction(
  '[Cart List Page (App)] GET_PRODUCTS_FROM_CART'
);

export const GetProductsFromCartSuccess = createAction(
  '[Get Cart Items Effect] GET_PRODUCTS_FROM_CART_SUCCESS',
  props<{ cartProducts: IProduct[] }>()
);

export const GetProductsFromCartError = createAction(
  '[Get Cart Items Effect] GET_PRODUCTS_FROM_CART_ERROR',
  props<{ error: Error }>()
);

export const AddProductToCart = createAction(
  '[Products List Page / Product Page (App)] ADD_PRODUCT_TO_CART',
  props<{ productItem: IProduct }>()
);

export const AddProductToCartSuccess = createAction(
  '[Add Product To Cart Effect] ADD_PRODUCT_TO_CART_SUCCESS',
  props<{ productItem: IProduct }>()
);

export const AddProductToCartError = createAction(
  '[Add Product To Cart Effect] ADD_PRODUCT_TO_CART_ERROR',
  props<{ error: Error }>()
);

export const DeleteProductFromCart = createAction(
  '[Cart List Page (App)] DELETE_PRODUCT_FROM_CART',
  props<{ cartItem: IProduct }>()
);

export const DeleteProductFromCartSuccess = createAction(
  '[Delete Product From Cart Effect] DELETE_PRODUCT_FROM_CART_SUCCESS',
  props<{ cartItem: IProduct }>()
);

export const DeleteProductFromCartError = createAction(
  '[Delete Product From Cart Effect] DELETE_PRODUCT_FROM_CART_ERROR',
  props<{ error: Error }>()
);




