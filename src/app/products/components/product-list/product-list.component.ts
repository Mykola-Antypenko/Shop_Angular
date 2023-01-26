import { Component, DoCheck, OnInit } from '@angular/core';
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
  isLoaded: boolean = false;
  constructor(
      private productsService: ProductsService,
      private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  ngDoCheck() {
    this.isLoaded = this.productsService.isLoaded;
  }

  addToCart(product: IProduct): void {
    this.cartService.updateProducts();
    const newCartProducts = this.cartService.cartProducts.concat(product);

    this.cartService.addProduct(newCartProducts);
  }
}
