import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { IProduct } from '../../../products/models/product.interface';
import { ProductsService } from '../../../products/services/product-service/products.service';
import { CanComponentDeactivate } from '../../../core/guards/can-deactivate.guard';
import { ModalService } from '../../../shared/services/modal/modal.service';

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
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    this.product = {
      id: null,
      img: '../../../../assets/product-images/default.jpg',
      name: '',
      description: '',
      price: 0,
      isAvailable: false,
      availableCount: 0,
      itemsInCart: 0
    }
    this.isSaved = false;
    this.route.data.subscribe(({product}) => {
      if (product) {
        this.product = product;
        this.originalProduct = Object.assign({}, product);
      }
    });
  }

  onSaveProduct() {
    this.productsService.saveProductInfo(this.product);
    this.isSaved = true;
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
        this.productsService.saveProductInfo(this.product);
        return true;
      } else {
        return false;
      }
    }
  }
}
