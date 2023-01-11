import {OperationSystem} from "./operation-system.enum";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  operationSystem: OperationSystem;
}
