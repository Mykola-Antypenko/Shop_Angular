import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../../products/models/product.interface';

export const GetProducts = createAction(
  '[Products List Page (App)] GET_PRODUCTS'
);

export const GetProductsSuccess = createAction(
  '[Get Products Effect] GET_PRODUCTS_SUCCESS',
  props<{ products: IProduct[] }>()
);

export const GetProductsError = createAction(
  '[Get Products Effect] GET_PRODUCTS_ERROR',
  props<{ error: Error | null }>()
);

export const GetProduct = createAction(
  '[Add/Edit/View Product Page] GET_PRODUCT',
  props<{ productID: string }>()
);

export const GetProductItemSuccess = createAction(
  '[Get Product Effect] GET_PRODUCT_SUCCESS',
  props<{ productItem: IProduct }>()
);

export const GetProductItemError = createAction(
  '[Get Product Effect] GET_PRODUCT_ERROR',
  props<{ error: Error | null }>()
);

export const AddProduct = createAction(
  '[Product Form Page] ADD_PRODUCT',
  props<{ productItem: IProduct }>()
);

export const AddProductSuccess = createAction(
  '[Add Product Effect] ADD_PRODUCT_SUCCESS',
  props<{ productItem: IProduct }>()
);

export const AddProductError = createAction(
  '[Add Product Effect] ADD_PRODUCT_ERROR',
  props<{ error: Error | null }>()
);

export const EditProduct = createAction(
  '[Product Form Page] EDIT_PRODUCT',
  props<{ productItem: IProduct }>()
);

export const EditProductSuccess = createAction(
  '[Edit Product Effect] EDIT_PRODUCT_SUCCESS',
  props<{ productItem: IProduct }>()
);

export const EditProductError = createAction(
  '[Edit Product Effect] EDIT_PRODUCT_ERROR',
  props<{ error: Error | null }>()
);

export const DeleteProduct = createAction(
  '[Manage Product Page] DELETE_PRODUCT',
  props<{ productItem: IProduct }>()
)

export const DeleteProductSuccess = createAction(
  '[Delete Product Effect] DELETE_PRODUCT_SUCCESS',
  props<{ productItem: IProduct }>()
)

export const DeleteProductError = createAction(
  '[Delete Product Effect] DELETE_PRODUCT_ERROR',
  props<{ error: Error }>()
)




