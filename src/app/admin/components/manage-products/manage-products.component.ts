import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../../../products/models/product.interface';
import { ProductsPromiseService } from '../../../products/services/products-promise/products-promise.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit, DoCheck {
  products!: Promise<IProduct[]>;
  isLoaded!: boolean;

  constructor(
    private productsPromiseService :ProductsPromiseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.products = this.productsPromiseService.getProducts();
  }

  ngDoCheck() {
    this.isLoaded = this.productsPromiseService.isLoaded;
  }

  onAddProduct(): void {
    this.router.navigateByUrl('/admin/product/add');
  }

  onEditProduct(id: string): void {
    const link = ['/admin/product/edit', id];
    this.router.navigate(link);
  }

  onDeleteProduct(id: string): void {
    this.productsPromiseService.deleteProduct(id)
      .then(() => {
        this.products = this.productsPromiseService.getProducts();
      })
      .catch((error) => console.log(error));
  }
}
