import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/product.interface';
import { ProductsService } from '../../services/product-service/products.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CartService } from '../../../cart/services/cart-service/cart.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  product!: IProduct;
  isLoaded: boolean = false;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productsService.getProduct(params.get('productID')!)
        .then((product) => {
          this.product = product;
          this.isLoaded = this.productsService.isLoaded;
        });
    });
  }

  onAddToCart():void {
    this.cartService.updateProducts();
    this.cartService.addProduct(this.product);
  }
}
