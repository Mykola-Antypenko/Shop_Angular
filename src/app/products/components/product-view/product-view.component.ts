import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/product.interface';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductsPromiseService } from '../../services/products-promise/products-promise.service';
import { CartObservableService } from '../../../cart/services/cart-observable/cart-observable.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  product!: IProduct;
  isLoaded: boolean = false;

  constructor(
    private productsPromiseService :ProductsPromiseService,
    private router: Router,
    private route: ActivatedRoute,
    public cartObservableService: CartObservableService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productsPromiseService.getProduct(params.get('productID')!)
        .then((product) => {
          this.product = product;
          this.isLoaded = this.productsPromiseService.isLoaded;
        });
    });
  }

  onAddToCart():void {
    this.cartObservableService.addProduct(this.product).subscribe();
  }
}
