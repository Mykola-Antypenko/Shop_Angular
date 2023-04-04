import { OrderByPipe } from './order-by.pipe';
import { IProduct } from '../../../products/models/product.interface';

describe('OrderByPipe', () => {
  const pipe = new OrderByPipe();
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
      itemsInCart: 0
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
      itemsInCart: 0
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
      itemsInCart: 0
    },
  ];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should order by price and by asc', () => {
    expect(pipe.transform(initialData, 'price', true)).toEqual([
      {
        id: '2',
        img: '',
        name: 'Doogee Icore',
        description: 'Strong 5G signal, powerful Global frequency band, bigger battery, faster charging speed.',
        price: 290,
        isAvailable: true,
        operationSystem: 'Android',
        availableCount: 78,
        itemsInCart: 0
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
        itemsInCart: 0
      },
      {
        id: '1',
        img: '',
        name: 'Samsung Galaxy S21',
        description: 'Make every moment epic with Galaxy S21 5G’s next generation smartphone camera & video.',
        price: 476,
        isAvailable: true,
        operationSystem: 'Android',
        availableCount: 24,
        itemsInCart: 0
      }
    ]);
  });

  it('should order by price and by desc', () => {
    expect(pipe.transform(initialData, 'price', false)).toEqual([
      {
        id: '1',
        img: '',
        name: 'Samsung Galaxy S21',
        description: 'Make every moment epic with Galaxy S21 5G’s next generation smartphone camera & video.',
        price: 476,
        isAvailable: true,
        operationSystem: 'Android',
        availableCount: 24,
        itemsInCart: 0
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
        itemsInCart: 0
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
        itemsInCart: 0
      }
    ]);
  });
});
