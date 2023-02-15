import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from '../../products/services/product-service/products.service';
import { IProduct } from '../../products/models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<IProduct> {
  constructor(private productsService: ProductsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct>|Promise<IProduct>|IProduct {
    console.log('ProductResolve Guard is called');
    return this.productsService.getProduct(route.paramMap.get('productID'));
  }
}
