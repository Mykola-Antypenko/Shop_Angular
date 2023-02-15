import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductsService } from '../../services/product-service/products.service';
import { IProduct } from '../../models/product.interface';
import { CartService } from '../../../cart/services/cart-service/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, DoCheck {
  products!: Promise<IProduct[]>;
  isLoaded!: boolean;
  constructor(
      private productsService: ProductsService,
      public cartService: CartService,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  ngDoCheck() {
    this.isLoaded = this.productsService.isLoaded;
  }

  addToCart(product: IProduct): void {
    this.cartService.updateProducts();
    this.cartService.addProduct(product);
  }

  showMore(product: IProduct): void {
    const link = ['/product', product.id];
    this.router.navigate(link);
  }
}
