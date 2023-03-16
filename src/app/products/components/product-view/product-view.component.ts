import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/product.interface';
import {
  AppState,
  ProductsState,
  selectProductItemByUrl, selectProductsLoaded,
} from '../../../core/@ngrx';
import { Store } from "@ngrx/store";
import { Observable, Subject, takeUntil } from 'rxjs';
import * as CartActions from '../../../core/@ngrx/cart/cart.actions';
import * as ProductsActions from '../../../core/@ngrx/products/products.actions';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  product!: IProduct;
  isLoaded: boolean = false;
  private componentDestroyed$: Subject<void> = new Subject<void>();
  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    const observerProduct: any = {
      next: (product: IProduct) => {
        this.product = { ...product };
      },
      error(err: any) {
        console.log(err);
      }
    };

    this.store.select(selectProductItemByUrl)
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(observerProduct);

    const observerLoad: any = {
      next: (loaded: boolean) => {
        this.isLoaded = loaded;
      },
      error(err: any) {
        console.log(err);
      }
    };

    this.store.select(selectProductsLoaded)
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(observerLoad);
  }

  onAddToCart():void {
    this.product.availableCount--;
    this.product.itemsInCart++;
    this.store.dispatch(CartActions.AddProductToCart({productItem: this.product}));
    this.store.dispatch(ProductsActions.EditProduct({productItem: this.product}));
  }
}
