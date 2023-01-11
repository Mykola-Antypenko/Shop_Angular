import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart-service/cart.service";
import {IProduct} from "../../models/product.interface";

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  isAddedToCart!: boolean;
  cartElements!: IProduct[];

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cartElements = this.cartService.showCartItems();
    this.isAddedToCart = !!this.cartService.showCartItems();
  }

  trackByElements(index: number, item: any): number {
    return item.id;
  }
}
