import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct } from '../../products/models/product.interface';
import {ProductsPromiseService} from "../../products/services/products-promise/products-promise.service";

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<IProduct> {
  constructor(private productsPromiseService :ProductsPromiseService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct>|Promise<IProduct>|IProduct {
    console.log('ProductResolve Guard is called');
    return this.productsPromiseService.getProduct(route.paramMap.get('productID')!);
  }
}
