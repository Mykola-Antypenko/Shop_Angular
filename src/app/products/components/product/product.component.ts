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

  onAddToCart(product: IProduct, productName: string):void {
    product.availableCount--;
    product.itemsInCart++;
    console.log(`The product ${productName} was added to cart`);
    this.addToCartEvent.emit(product);
  }
}
