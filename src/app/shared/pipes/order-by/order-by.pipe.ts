import { Pipe, PipeTransform } from '@angular/core';
import {IProduct} from "../../../products/models/product.interface";

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(sortArray: IProduct[], sortKey: keyof IProduct, isAsc?: boolean): IProduct[] {
    sortArray.sort((a: IProduct, b: IProduct): number => {
      if (isAsc) {
        return a[sortKey] > b[sortKey] ? 1 : -1;
      } else {
        return a[sortKey] < b[sortKey] ? 1 : -1;
      }
    });
    return sortArray;
  }
}
