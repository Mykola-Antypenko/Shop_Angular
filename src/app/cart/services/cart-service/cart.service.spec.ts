import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import {IProduct} from "../../../products/models/product.interface";

const initialData: IProduct[] = [
  {
    id: '1',
    img: '',
    name: 'Samsung Galaxy S21',
    description: 'Make every moment epic with Galaxy S21 5G’s next generation smartphone camera & video.',
    price: 476,
    isAvailable: true,
    operationSystem: 'Android',
    availableCount: 24,
    itemsInCart: 1
  },
  {
    id: '2',
    img: '',
    name: 'Doogee Icore',
    description: 'Strong 5G signal, powerful Global frequency band, bigger battery, faster charging speed.',
    price: 290,
    isAvailable: true,
    operationSystem: 'Android',
    availableCount: 78,
    itemsInCart: 1
  },
  {
    id: '3',
    img: '',
    name: 'Xiaomi Redmi Note 8 Pro',
    description: 'Xiaomi Redmi Note 8 Pro is powered by the Mediatek Helio G90T.',
    price: 310,
    isAvailable: true,
    operationSystem: 'Android',
    availableCount: 52,
    itemsInCart: 1
  },
];

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate total cost', () => {
    service.getTotalCost(initialData);

    expect(service.totalCost).toEqual(1076);
  });

  it('should calculate total quantity', () => {
    service.getTotalQuantity(initialData);

    expect(service.totalQuantity).toEqual(3);
  });
});
