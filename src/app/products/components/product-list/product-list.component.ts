import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CartService } from '../../../cart/services/cart-service/cart.service';
import { IProduct } from '../../models/product.interface';
import {
  AppState,
  ProductsState, selectProductsData, selectProductsState,
} from "../../../core/@ngrx";
import * as ProductsActions from '../../../core/@ngrx/products/products.actions';
import * as CartActions from '../../../core/@ngrx/cart/cart.actions';
import * as RouterActions from '../../../core/@ngrx/router/router.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productsState$!: Observable<ProductsState>;
  products$!: Observable<ReadonlyArray<IProduct>>;

  constructor(
      public cartService: CartService,
      private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.productsState$ = this.store.select(selectProductsState);
    this.products$ = this.store.select(selectProductsData);
    this.store.dispatch(ProductsActions.GetProducts());
  }

  addToCart(product: IProduct): void {
    this.store.dispatch(CartActions.AddProductToCart({productItem: product}));
    this.store.dispatch(ProductsActions.EditProduct({productItem: product }));
  }

  showMore(product: IProduct): void {
    this.store.dispatch(RouterActions.navigate({ path: ['/product', product.id] }))
  }
}
