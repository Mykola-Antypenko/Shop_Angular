import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.scss']
})
export class ProductComponentComponent {
  @Input() productName!: string;
  onAddToCart():void {
    console.log(`The product ${this.productName} was added to cart`);
  }
}
