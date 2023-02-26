import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { IProduct } from '../../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsPromiseService {
  private productsUrl = 'http://localhost:3002/products';
  isLoaded: boolean = false;

  constructor(private httpClient: HttpClient) { }

  getProducts(): Promise<IProduct[]> {
    const request$ = this.httpClient.get(this.productsUrl);
    return firstValueFrom(request$)
      .then((response) => {
        this.isLoaded = true;
        return response as IProduct[];
      })
      .catch(this.handleError);
  }

  getProduct(id: NonNullable<IProduct['id']> | string): Promise<IProduct> {
    const url = `${this.productsUrl}/${id}`;
    const request$ = this.httpClient.get(url);

    return firstValueFrom(request$)
      .then((response) => {
        this.isLoaded = true;
        return response as IProduct;
      })
      .catch(this.handleError);
  }

  editProductInfo(product: IProduct): Promise<IProduct> {
    const url = `${this.productsUrl}/${product.id}`;
    const request$ = this.httpClient.put(url, product);

    return firstValueFrom(request$)
      .then(response => {
        return response as IProduct;
      })
      .catch(this.handleError);
  }

  addProduct(product: IProduct): Promise<IProduct> {
    const url = this.productsUrl;

    const request$ = this.httpClient.post(url, product);

    return firstValueFrom(request$)
      .then(response => response as IProduct)
      .catch(this.handleError);
  }

  deleteProduct(id: string): Promise<IProduct> {
    const url = `${this.productsUrl}/${id}`;
    const request$ = this.httpClient.delete(url);

    return firstValueFrom(request$)
    .catch(this.handleError);
  }

  updateProduct(product: IProduct): Promise<IProduct> {
    const url = `${this.productsUrl}/${product.id}`;
    const request$ = this.httpClient.put(url, product);

    return firstValueFrom(request$)
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
