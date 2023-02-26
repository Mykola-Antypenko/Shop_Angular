import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CartService } from '../../services/cart-service/cart.service';
import { IProduct } from '../../../products/models/product.interface';
import { CartObservableService } from '../../services/cart-observable/cart-observable.service';
import { ProductsPromiseService } from '../../../products/services/products-promise/products-promise.service';
import { AppSettingsService } from "../../../core/services/app-settings/app-settings.service";
import { IAppSettings } from '../../../core/services/app-settings/app-settings.interface';
import { LocalStorageService } from '../../../core/services/local-storage/local-storage.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit, OnDestroy, DoCheck {
  cartElements: IProduct[] = [];
  totalCost: number = 0;
  totalQuantity: number = 0;
  sortOption!: keyof IProduct;
  isAscChecked!: boolean;
  private subGetProducts!: Subscription;
  private subRemoveProduct!: Subscription;

  constructor(
    public cartService: CartService,
    private cartObservableService: CartObservableService,
    private productPromiseService: ProductsPromiseService,
    private appSettingsService: AppSettingsService,
    private localStorageService: LocalStorageService
  ) {
  }

  ngDoCheck() {
    this.totalCost = this.cartService.getTotalCost(this.cartElements);
    this.totalQuantity = this.cartService.getTotalQuantity(this.cartElements);
  }

  ngOnInit(): void {
    this.subGetProducts = this.cartObservableService.getProductsFromCart().subscribe(
        (data) => {
          this.cartElements = data;
        }
    );
    this.appSettingsService.getSettings().subscribe((sortSettings: IAppSettings) => {
      this.sortOption = sortSettings.sortKey;
      this.isAscChecked = sortSettings.isAsc;
      this.localStorageService.setItem('sortSettings', JSON.stringify(sortSettings));
    });
  }

  ngOnDestroy(): void {
    this.subGetProducts && this.subGetProducts.unsubscribe();
    this.subRemoveProduct && this.subRemoveProduct.unsubscribe();
    console.log('cancel cart');
    this.cartElements.forEach((element) => {
      console.log('element', element);
      this.productPromiseService.updateProduct(element);
    })
  }

  onQuantityIncrease(product: IProduct): void {
    this.cartService.increaseQuantity(product);
  }

  onQuantityDecrease(product: IProduct): void {
    this.cartService.decreaseQuantity(product);
  }

  onDeleteItem(product: IProduct): void {
    this.subRemoveProduct = this.cartObservableService.removeProductFromCart(product).subscribe((data) => {
      this.cartElements = data;
    });
    this.productPromiseService.updateProduct(product);
  }
  onRemoveAllItems(): void {
    this.cartObservableService.removeAllProducts();
    this.cartElements = [];
  }

  trackByElements(index: number, item: any): number {
    return item.id;
  }

  handleSortOrder(sortOrder: HTMLInputElement) {
    this.isAscChecked = sortOrder.checked;
  }
}
