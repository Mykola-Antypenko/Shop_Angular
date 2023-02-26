import { IProduct } from '../../../products/models/product.interface';

export interface IAppSettings {
  sortKey: keyof IProduct;
  isAsc: boolean;
}
