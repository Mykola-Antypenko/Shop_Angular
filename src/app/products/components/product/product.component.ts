import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../../models/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() productFromState!: IProduct;
  @Output() addToCartEvent: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() showMoreEvent: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  productItem!: IProduct;

  constructor() {}

  ngOnInit(): void {
    this.productItem = { ...this.productFromState };
  }

  onAddToCart(): void {
    this.productItem.availableCount--;
    this.productItem.itemsInCart++;
    this.addToCartEvent.emit(this.productItem);
  }

  onShowMore(): void {
    this.showMoreEvent.emit(this.productItem);
  }
}
