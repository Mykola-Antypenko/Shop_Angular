import { OperationSystem } from './operation-system.enum';

export interface IProduct {
  id: string | null;
  img: string;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  operationSystem?: OperationSystem;
  availableCount: number;
  itemsInCart: number;
}
