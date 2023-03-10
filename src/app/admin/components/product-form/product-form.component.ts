import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { IProduct } from '../../../products/models/product.interface';
import { CanComponentDeactivate } from '../../../core/guards/can-deactivate.guard';
import { ModalService } from '../../../shared/services/modal/modal.service';
import { ProductsPromiseService } from '../../../products/services/products-promise/products-promise.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, CanComponentDeactivate {
  @ViewChild('productForm') productForm!: ElementRef<HTMLFormElement>;
  product!: IProduct;
  originalProduct!: IProduct;
  isSaved!: boolean;
  isEditPage!: boolean;

  constructor(
    private productsPromiseService :ProductsPromiseService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    this.product = {
      id: '',
      img: '../../../../assets/product-images/default.jpg',
      name: '',
      description: '',
      price: 0,
      isAvailable: false,
      availableCount: 0,
      itemsInCart: 0
    }
    this.isEditPage = this.router.url.includes('edit');
    this.isSaved = false;
    this.route.data.subscribe(({product}) => {
      if (product) {
        this.product = product;
        this.originalProduct = Object.assign({}, product);
      }
    });
  }

  onEditProduct() {
    this.productsPromiseService.editProductInfo(this.product);
    this.isSaved = true;
    this.router.navigate(['admin/products']);
  }

  onAddProduct() {
    this.productsPromiseService.addProduct(this.product);
    this.router.navigate(['admin/products']);
  }

  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.productForm.nativeElement.classList.contains('ng-dirty') || this.isSaved) {
      return true;
    } else {
      if (this.modalService.confirm('Discard?')) {
        this.product = this.originalProduct;
        this.productsPromiseService.editProductInfo(this.product);
        return true;
      } else {
        return false;
      }
    }
  }
}
