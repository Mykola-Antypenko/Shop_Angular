import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry, share } from 'rxjs';
import { Store } from "@ngrx/store";

import { IProduct } from '../../../products/models/product.interface';
import { LocalStorageService } from '../../../core/services/local-storage/local-storage.service';
import { ProductsPromiseService } from '../../../products/services/products-promise/products-promise.service';

@Injectable({
  providedIn: 'root'
})
export class CartObservableService {
  private cartUrl = 'http://localhost:3002/cart';
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private productsPromiseService: ProductsPromiseService
  ) { }

  getProductsFromCart(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(this.cartUrl).pipe(
      retry(5),
      share(),
      catchError(this.handleError)
    );
  }

  addProduct(item: IProduct): Observable<IProduct> {
    const product = { ...item };
    this.localStorageService.setItem(`prodInCartId-${product.id}`, JSON.stringify(product));
    const url = this.cartUrl;
    this.getProductsFromCart().subscribe();
    return this.httpClient.post<IProduct>(url, product)
      .pipe(
        catchError(this.handleError)
      );
  }

  removeProductFromCart(product: IProduct): Observable<IProduct[]> {
    const url = `${this.cartUrl}/${product.id}`;
    const updatedProduct = { ...product };
    updatedProduct.availableCount += updatedProduct.itemsInCart;
    updatedProduct.itemsInCart = 0;
    this.localStorageService.removeItem(`prodInCartId-${updatedProduct.id}`);
    this.productsPromiseService.updateProduct(updatedProduct);
    this.getProductsFromCart().subscribe();
    return this.httpClient.delete<IProduct>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  removeAllProducts(): void {
    this.getProductsFromCart().subscribe((products) => {
      products.forEach((product) => {
        this.productsPromiseService.updateProduct(product);
        this.removeProductFromCart(product).subscribe();
      });
      this.getProductsFromCart().subscribe();
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
