import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { IProduct } from '../../../products/models/product.interface';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent {
  @Input() cartItem!: IProduct;
  @Output() quantityIncrease: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() quantityDecrease: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() deleteItem: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  constructor() {}

  onQuantityIncrease(product: IProduct): void {
    this.quantityIncrease.emit(product);
  }

  onQuantityDecrease(product: IProduct): void {
    this.quantityDecrease.emit(product);
  }

  onDeleteItem(product: IProduct): void {
    this.deleteItem.emit(product);
  }
}
