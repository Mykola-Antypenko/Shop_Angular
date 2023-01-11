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

  // объекты передаются по ссылке,
  // поэтому тут первый параметр будет тот же что и инпут
  // и тот же что в родительском компоненте
  // вы тут сделали мутацию этого объекта
  // и передали его родителю, хотя у родителя и так будет этот мутированный объект
  onAddToCart(product: IProduct, productName: string):void {
    product.availableCount--;
    product.itemsInCart++;
    console.log(`The product ${productName} was added to cart`);
    this.addToCartEvent.emit(product);
  }
}
