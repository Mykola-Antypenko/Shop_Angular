import { Injectable } from '@angular/core';
import {IProduct} from "../../models/product.interface";
import {OperationSystem} from "../../models/operation-system.enum";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: IProduct[] = [
    { name: 'Samsung Galaxy S21',
      description: 'Samsung Galaxy S21 description',
      price: 476,
      isAvailable: true,
      operationSystem: OperationSystem.Android,
    },
    { name: 'Xiaomi Redmi Note 8 Pro',
      description: 'Xiaomi Redmi Note 8 Pro description',
      price: 310,
      isAvailable: true,
      operationSystem: OperationSystem.Android,
    },
  ];

  constructor() { }

  showCartItems(): IProduct[] {
    return this.cartItems;
  }
}
