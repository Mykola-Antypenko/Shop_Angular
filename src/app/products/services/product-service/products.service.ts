import { Injectable } from '@angular/core';
import { IProduct } from '../../models/product.interface';
import { localProducts } from './products-array';

const productsList = localProducts;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products!: Promise<IProduct[]>;
  isLoaded: boolean = false;

  constructor() { }

  getProducts(): Promise<IProduct[]> {
    this.products = new Promise((resolve) => {
      this.isLoaded = false;
      setTimeout(() => {
        resolve(productsList);
        this.isLoaded = true;
      }, 1000)
    })
      .catch(error => error) as Promise<IProduct[]>;

    return this.products;
  }

  getProduct(id: IProduct['id']): Promise<IProduct> {
    return this.getProducts()
      .then(products => {
        return products.find(product => product.id === id!)!
      })
      .catch(() => Promise.reject('Error while getting product'));
  }

  saveProductInfo(product: IProduct): void {
    this.getProducts()
      .then(products => {
        const index = products.findIndex(p => p.id === product.id!);

        if (index > -1) {
          products.splice(index, 1, product);
        } else {
          products.splice(products.length, 0, product);
        }
        return products;
      })
      .catch(() => Promise.reject('Error while getting product'));
  }
}
