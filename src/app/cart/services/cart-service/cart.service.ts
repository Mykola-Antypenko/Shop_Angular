import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { IProduct } from '../../../products/models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  totalCost!: number;
  totalQuantity!: number;
  private cartItemsSubject: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);
  cartItemsObservable: Observable<IProduct[]> = this.cartItemsSubject.asObservable();
  cartProducts: IProduct[] = [];

  constructor() {}

  getProducts(): IProduct[] {
    return this.cartItemsSubject.getValue();
  }

  updateProducts(): void {
    this.cartProducts = this.cartItemsSubject.value;
  }

  addProduct(items: IProduct[]): void {
    this.cartItemsSubject.next(items);
    this.updateProducts();
  }

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
    if (product.itemsInCart === 0) {
      this.removeProduct(product);
    }
  }

  removeProduct(product: IProduct) {
    this.updateProducts();
    const updatedCartProducts = this.cartProducts.filter((item) => {
      return item.name !== product.name;
    });
    product.availableCount += product.itemsInCart;
    product.itemsInCart = 0;
    this.cartItemsSubject.next(updatedCartProducts);
  }

  removeAllProducts():void {
    this.cartItemsSubject.value.forEach((item: IProduct) => {
      item.availableCount += item.itemsInCart;
      item.itemsInCart = 0;
    });
    this.cartItemsSubject.next([]);
  }

  isEmptyCart(): boolean {
    return this.cartItemsSubject.value.length === 0;
  }
}
