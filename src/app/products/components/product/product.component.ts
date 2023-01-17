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

  constructor() {}

  onAddToCart(productName: string):void {
    this.productItem.availableCount--;
    this.productItem.itemsInCart++;
    console.log(`The product ${productName} was added to cart`);
    this.addToCartEvent.emit(this.productItem);
  }
}
