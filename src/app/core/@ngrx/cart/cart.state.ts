import { IProduct } from '../../../products/models/product.interface';

export interface CartState {
  cartList: IProduct[],
  cartItem: IProduct | null,
  error: Error | null
}

export const initialCartState: CartState = {
  cartList: [],
  cartItem: null,
  error: null
};
