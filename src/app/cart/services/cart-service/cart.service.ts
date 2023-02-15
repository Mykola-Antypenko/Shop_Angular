import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../../../products/models/product.interface';
import { LocalStorageService } from '../../../core/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  totalCost!: number;
  totalQuantity!: number;
  countOfProduct: number = 0;
  isShowAlert: boolean = false;
  cartMessage: string = 'The cart is empty, please, choose product from the product list page';
  private cartItemsSubject: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);
  cartItemsObservable: Observable<IProduct[]> = this.cartItemsSubject.asObservable();
  cartProducts: IProduct[] = [];

  constructor(private localStorageService: LocalStorageService) {}

  getProducts(): IProduct[] {
    return this.cartItemsSubject.getValue();
  }

  updateProducts(): void {
    this.cartProducts = this.cartItemsSubject.value;
  }

  addProduct(item: IProduct): void {
    item.availableCount--;
    item.itemsInCart++;
    this.localStorageService.setItem(`prodInCartId-${item.id}`, JSON.stringify(item));
    const productItems = this.cartProducts.concat(item);
    this.cartItemsSubject.next(productItems);
    this.countOfProduct++;
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
    this.countOfProduct--;
    this.localStorageService.removeItem(`prodInCartId-${product.id}`);
  }

  removeAllProducts():void {
    this.cartItemsSubject.value.forEach((item: IProduct) => {
      item.availableCount += item.itemsInCart;
      item.itemsInCart = 0;
      this.localStorageService.clear();
    });
    this.cartItemsSubject.next([]);
    this.countOfProduct = 0;
  }

  isEmptyCart(): boolean {
    return this.cartItemsSubject.value.length === 0;
  }
}
