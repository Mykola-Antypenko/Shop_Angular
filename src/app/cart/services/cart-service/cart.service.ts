import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IProduct } from '../../../products/models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject: Subject<IProduct[]> = new Subject<IProduct[]>();
  cartItemsObservable: Observable<IProduct[]> = this.cartItemsSubject.asObservable();
  cartItems: IProduct[] = [];

  constructor() {}

  addCartItem(items: IProduct[]): void {
    this.cartItems = items;
    this.cartItemsSubject.next(this.cartItems);
  }

  getTotalCost(productList: IProduct[]): number {
    let totalCost: number = 0;
    productList.forEach((cartItem: IProduct) => {
      totalCost += cartItem.price * cartItem.itemsInCart;
    });

    return totalCost;
  }

  getTotalQuantity(productList: IProduct[]): number {
    let totalQuantity = productList.reduce((quantity:number, product: IProduct): number => {
      return quantity + product.itemsInCart;
    }, 0);

    return totalQuantity;
  }

  increaseQuantity(product: IProduct): void {
    product.itemsInCart++;
    product.availableCount -= 1;
  }

  decreaseQuantity(product: IProduct): void {
    product.itemsInCart--;
    product.availableCount += 1;
    if (product.itemsInCart === 0) {
      this.deleteItem(product);
    }
  }

  deleteItem(product: IProduct) {
    this.cartItems = this.cartItems.filter((item) => {
      return item.name !== product.name;
    });
    product.availableCount += product.itemsInCart;
    product.itemsInCart = 0;
    this.cartItemsSubject.next(this.cartItems);
  }
}
