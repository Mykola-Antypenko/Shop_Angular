import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, concatMap, Observable, retry, share, Subject } from 'rxjs';
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
    item.availableCount--;
    item.itemsInCart++;
    this.localStorageService.setItem(`prodInCartId-${item.id}`, JSON.stringify(item));
    const url = this.cartUrl;
    this.getProductsFromCart().subscribe();
    return this.httpClient.post<IProduct>(url, item)
      .pipe(
        catchError(this.handleError)
      );
  }

  removeProductFromCart(product: IProduct): Observable<IProduct[]> {
    const url = `${this.cartUrl}/${product.id}`;
    product.availableCount += product.itemsInCart;
    product.itemsInCart = 0;
    this.localStorageService.removeItem(`prodInCartId-${product.id}`);
    this.productsPromiseService.updateProduct(product);
    this.getProductsFromCart().subscribe();
    return this.httpClient.delete<IProduct>(url)
      .pipe(
        concatMap(() => this.getProductsFromCart()),
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
