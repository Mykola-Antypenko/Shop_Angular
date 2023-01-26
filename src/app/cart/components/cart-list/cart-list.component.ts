import {Component, DoCheck, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { CartService } from '../../services/cart-service/cart.service';
import { IProduct } from '../../../products/models/product.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit, OnDestroy, DoCheck {
  cartElements: IProduct[] = [];
  private subscription!: Subscription;
  totalCost: number = 0;
  totalQuantity: number = 0;
  sortOption: string = 'name';
  isAscChecked!: boolean;

  constructor(public cartService: CartService) {
  }

  ngDoCheck() {
    this.totalCost = this.cartService.getTotalCost(this.cartElements);
    this.totalQuantity = this.cartService.getTotalQuantity(this.cartElements);
  }

  ngOnInit(): void {
    this.subscription = this.cartService.cartItemsObservable.subscribe(
        (data) => {
          this.cartElements = data;
        }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onQuantityIncrease(product: IProduct): void {
    this.cartService.increaseQuantity(product);
  }

  onQuantityDecrease(product: IProduct): void {
    this.cartService.decreaseQuantity(product);
  }

  onDeleteItem(product: IProduct): void {
    this.cartService.removeProduct(product);
  }

  trackByElements(index: number, item: any): number {
    return item.id;
  }

  handleSortOrder(sortOrder: HTMLInputElement) {
    this.isAscChecked = sortOrder.checked;
  }
}
