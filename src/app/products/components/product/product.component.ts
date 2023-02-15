import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../models/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() productItem!: IProduct;
  @Output() addToCartEvent: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() showMoreEvent: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  constructor() {}

  onAddToCart():void {
      this.addToCartEvent.emit(this.productItem);
  }

  onShowMore() {
    this.showMoreEvent.emit(this.productItem);
  }
}
