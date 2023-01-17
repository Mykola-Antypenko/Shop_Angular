import { Injectable } from '@angular/core';
import { IProduct } from '../../models/product.interface';
import { OperationSystem } from '../../models/operation-system.enum';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  localProducts: IProduct[] = [
    { name: 'Samsung Galaxy S21',
      description: 'Samsung Galaxy S21 description',
      price: 476,
      isAvailable: true,
      operationSystem: OperationSystem.Android,
      availableCount: 24,
      itemsInCart: 0,
    },
    { name: 'Doogee Icore',
      description: 'Doogee Icore description',
      price: 290,
      isAvailable: false,
      operationSystem: OperationSystem.Android,
      availableCount: 0,
      itemsInCart: 0,
    },
    { name: 'Xiaomi Redmi Note 8 Pro',
      description: 'Xiaomi Redmi Note 8 Pro description',
      price: 310,
      isAvailable: true,
      operationSystem: OperationSystem.Android,
      availableCount: 51,
      itemsInCart: 0,
    },
    { name: 'Iphone XS',
      description: 'Iphone XS description',
      price: 710,
      isAvailable: false,
      operationSystem: OperationSystem.IOS,
      availableCount: 0,
      itemsInCart: 0,
    },
    { name: 'Nokia 5230',
      description: 'Nokia 5230 description',
      price: 110,
      isAvailable: true,
      operationSystem: OperationSystem.Symbian,
      availableCount: 4,
      itemsInCart: 0,
    },
    { name: 'Huawei P40',
      description: ' HUAWEI P40 description',
      price: 435,
      isAvailable: true,
      operationSystem: OperationSystem.Android,
      availableCount: 33,
      itemsInCart: 0,
    },
    { name: 'Iphone 13',
      description: 'Iphone description',
      price: 890,
      isAvailable: true,
      operationSystem: OperationSystem.IOS,
      availableCount: 28,
      itemsInCart: 0,
    },
    { name: 'Samsung M32',
      description: ' Samsung M32 description',
      price: 560,
      isAvailable: false,
      operationSystem: OperationSystem.Android,
      availableCount: 0,
      itemsInCart: 0,
    },
  ];
  constructor() { }

  getProducts(): IProduct[] {
    return this.localProducts;
  }
}
