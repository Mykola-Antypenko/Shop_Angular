import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../../products/services/product-service/products.service';
import { IProduct } from '../../../products/models/product.interface';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit, DoCheck {
  products!: Promise<IProduct[]>;
  isLoaded!: boolean;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  ngDoCheck() {
    this.isLoaded = this.productsService.isLoaded;
  }

  onAddProduct(): void {
    this.router.navigateByUrl('/admin/product/add');
  }

  onEditProduct(id: any): void {
    const link = ['/admin/product/edit', id];
    this.router.navigate(link);
  }
}
