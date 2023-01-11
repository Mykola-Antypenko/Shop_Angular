import {Component, OnInit} from '@angular/core';
import {OperationSystem} from '../../models/operation-system.enum';
import {IProduct} from "../../models/product.interface";

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.scss']
})

export class FirstComponentComponent implements OnInit {
  name: string = 'Xiaomi Redmi Note 11';
  description: string = 'The Redmi Note 11 screen is a 6.43in AMOLED';
  price: number = 243;
  isAvailable: boolean = true;
  operationSystem: OperationSystem = OperationSystem.Android;
  products!: IProduct[];

  ngOnInit() {
    this.products = [
      { name: 'Huawei P40',
        description: ' HUAWEI P40 description',
        price: 435,
        isAvailable: true,
        operationSystem: OperationSystem.Android,
      },
      { name: 'Iphone 13',
        description: 'Iphone description',
        price: 890,
        isAvailable: true,
        operationSystem: OperationSystem.IOS,
      },
      { name: 'Samsung M32',
        description: ' Samsung M32 description',
        price: 560,
        isAvailable: false,
        operationSystem: OperationSystem.Android,
      },
    ];
  }
}
