import { Injectable } from '@angular/core';
import {IProduct} from "../../models/product.interface";
import {OperationSystem} from "../../models/operation-system.enum";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  localProducts = [
    { name: 'Samsung Galaxy S21',
      description: 'Samsung Galaxy S21 description',
      price: 476,
      isAvailable: true,
      operationSystem: OperationSystem.Android,
    },
    { name: 'Doogee Icore',
      description: 'Doogee Icore description',
      price: 290,
      isAvailable: true,
      operationSystem: OperationSystem.Android,
    },
    { name: 'Xiaomi Redmi Note 8 Pro',
      description: 'Xiaomi Redmi Note 8 Pro description',
      price: 310,
      isAvailable: true,
      operationSystem: OperationSystem.Android,
    },
    { name: 'Iphone XS',
      description: 'Iphone XS description',
      price: 710,
      isAvailable: true,
      operationSystem: OperationSystem.IOS,
    },
    { name: 'Nokia 5230',
      description: 'Nokia 5230 description',
      price: 110,
      isAvailable: true,
      operationSystem: OperationSystem.Symbian,
    },
  ];
  constructor() { }

  getProducts(): IProduct[] {
    return this.localProducts;
  }
}
