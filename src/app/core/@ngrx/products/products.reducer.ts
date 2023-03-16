import { createReducer, on } from '@ngrx/store';

import * as ProductsActions from './products.actions';
import { adapter, initialProductsState } from './products.state';

export const productsFeatureKey = 'products';

export const reducer = createReducer(
  initialProductsState,
  on(ProductsActions.GetProducts, state => {
    console.log('GET_PRODUCTS action being handled');
    return {
      ...state,
      loading: true,
    };
  }),

  on(ProductsActions.GetProductsSuccess, (state, {products}) => {
    console.log('GET_PRODUCTS_SUCCESS action being handled');

    return adapter.setAll(products, {...state, productItem: null, loading: false, loaded: true});
  }),

  on(ProductsActions.GetProductsError, (state, {error}) => {
    console.log('GET_PRODUCTS_ERROR action being handled');
    return {
      ...state,
      loading: false,
      loaded: false,
      error,
    }
  }),

  on(ProductsActions.GetProduct, state => {
    console.log('GET_PRODUCT action being handled');
    return {
      ...state,
      loading: true,
      loaded: false,
    }
  }),

  on(ProductsActions.GetProductItemSuccess, (state, {productItem}) => {
    console.log('GET_PRODUCT_SUCCESS action being handled');

    return adapter.setOne(productItem, {...state, productItem, loading: false, loaded: true});
  }),

  on(ProductsActions.GetProductItemError, (state, {error}) => {
    console.log('GET_PRODUCT_ERROR action being handled');
    return {
      ...state,
      loading: false,
      loaded: false,
      error,
    }
  }),

  on(ProductsActions.AddProduct, state => {
    console.log('ADD_PRODUCT action being handled!');
    return { ...state };
  }),

  on(ProductsActions.AddProductSuccess, (state, { productItem }) => {
    console.log('ADD_PRODUCT_SUCCESS action being handled');

    return adapter.addOne(productItem, state);
  }),

  on(ProductsActions.AddProductError, (state, { error }) => {
    console.log('ADD_PRODUCT_ERROR action being handled');
    return {
      ...state,
      error
    }
  }),

  on(ProductsActions.EditProduct, state => {
    console.log('EDIT_PRODUCT action being handled!');
    return { ...state };
  }),

  on(ProductsActions.EditProductSuccess, (state, { productItem }) => {
    console.log('EDIT_PRODUCT_SUCCESS action being handled');

    return adapter.updateOne({id: productItem.id, changes: productItem}, state);
  }),

  on(ProductsActions.EditProductError, (state, { error }) => {
    console.log('EDIT_PRODUCT_ERROR action being handled');
    return {
      ...state,
      error
    }
  }),

  on(ProductsActions.DeleteProduct, (state) => {
    console.log('DELETE_PRODUCT action being handled');
    return {
      ...state
    }
  }),

  on(ProductsActions.DeleteProductSuccess, (state, {productItem}) => {
    console.log('DELETE_PRODUCT_SUCCESS action being handled');

    return adapter.removeOne(productItem.id, state);
  }),

  on(ProductsActions.DeleteProductError, (state, {error}) => {
    console.log('DELETE_PRODUCT_ERROR action being handled');
    return {
      ...state,
      error
    }
  }),
);
