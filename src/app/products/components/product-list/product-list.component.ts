import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductsPromiseService } from '../../services/products-promise/products-promise.service';
import { IProduct } from '../../models/product.interface';
import { CartService } from '../../../cart/services/cart-service/cart.service';
import { CartObservableService } from "../../../cart/services/cart-observable/cart-observable.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, DoCheck, OnDestroy {
  products!: Promise<IProduct[]>;
  isLoaded!: boolean;
  private sub!: Subscription;

  constructor(
      private productsPromiseService :ProductsPromiseService,
      public cartObservableService: CartObservableService,
      public cartService: CartService,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.products = this.productsPromiseService.getProducts();
  }

  ngDoCheck() {
    this.isLoaded = this.productsPromiseService.isLoaded;
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }

  addToCart(product: IProduct): void {
    this.sub = this.cartObservableService.addProduct(product).subscribe();
  }

  showMore(product: IProduct): void {
    const link = ['/product', product.id];
    this.router.navigate(link);
  }
}
