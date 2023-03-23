import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../../../products/models/product.interface';
import { ProductsPromiseService } from '../../../products/services/products-promise/products-promise.service';
import { Store } from '@ngrx/store';
import { AppState, ProductsFeatureKey, ProductsState, selectProductsData } from '../../../core/@ngrx';
import * as ProductsActions from '../../../core/@ngrx/products/products.actions';
import { Observable } from 'rxjs';
import * as RouterActions from '../../../core/@ngrx/router/router.actions';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit, DoCheck {
  products!: Promise<IProduct[]>;
  isLoaded!: boolean;
  productsState$!: Observable<ProductsState>;
  products$!: Observable<ReadonlyArray<IProduct>>;

  constructor(
    private productsPromiseService :ProductsPromiseService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.productsState$ = this.store.select(ProductsFeatureKey);
    this.products$ = this.store.select(selectProductsData);
    this.store.dispatch(ProductsActions.GetProducts());
  }

  ngDoCheck() {
    this.isLoaded = this.productsPromiseService.isLoaded;
  }

  onAddProduct(): void {
    this.store.dispatch(RouterActions.navigate({path: ['/admin/product/add']}));
  }

  onEditProduct(id: string): void {
    this.store.dispatch(RouterActions.navigate({path: ['/admin/product/edit', id]}));
    this.store.dispatch(ProductsActions.GetProduct({ productID: id}));
  }

  onDeleteProduct(productItem: IProduct): void {
    this.store.dispatch(ProductsActions.DeleteProduct({productItem}));
    this.store.dispatch(ProductsActions.GetProducts());
  }
}
