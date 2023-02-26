import { Injectable } from '@angular/core';
import { IProduct } from '../../../products/models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  totalCost!: number;
  totalQuantity!: number;
  countOfProduct: number = 0;
  isShowAlert: boolean = false;
  cartMessage: string = 'The cart is empty, please, choose product from the product list page';

  constructor() {}

  getTotalCost(productList: IProduct[]): number {
    this.totalCost = 0;
    productList.forEach((cartItem: IProduct) => {
      this.totalCost += cartItem.price * cartItem.itemsInCart;
    });

    return this.totalCost;
  }

  getTotalQuantity(productList: IProduct[]): number {
    this.totalQuantity = productList.reduce((quantity:number, product: IProduct): number => {
      return quantity + product.itemsInCart;
    }, 0);

    return this.totalQuantity;
  }

  increaseQuantity(product: IProduct): void {
    product.itemsInCart++;
    product.availableCount -= 1;
  }

  decreaseQuantity(product: IProduct): void {
    product.itemsInCart--;
    product.availableCount += 1;
  }
}
