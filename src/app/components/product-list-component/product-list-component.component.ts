import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/product-service/products.service";
import {IProduct} from "../../models/product.interface";

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.scss']
})
export class ProductListComponentComponent implements OnInit {
  products!: IProduct[];
  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

}
