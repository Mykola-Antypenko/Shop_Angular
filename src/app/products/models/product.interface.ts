export interface IProduct {
  id: string;
  img: string;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  operationSystem?: string;
  availableCount: number;
  itemsInCart: number;
}
