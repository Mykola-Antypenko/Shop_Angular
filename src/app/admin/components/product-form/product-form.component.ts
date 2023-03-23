import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { IProduct } from '../../../products/models/product.interface';
import { CanComponentDeactivate } from '../../../core/guards/can-deactivate.guard';
import { ModalService } from '../../../shared/services/modal/modal.service';
import { ProductsPromiseService } from '../../../products/services/products-promise/products-promise.service';
import { AppState, ProductsFeatureKey } from '../../../core/@ngrx';
import * as ProductsActions from '../../../core/@ngrx/products/products.actions';
import { Store } from '@ngrx/store';
import * as RouterActions from '../../../core/@ngrx/router/router.actions';

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
    private productsPromiseService: ProductsPromiseService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private store: Store<AppState>,
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
    if (this.isEditPage) {
      this.store.select(ProductsFeatureKey).subscribe((productsState) => {
        this.product = { ...productsState.productItem!};
        this.originalProduct = { ...productsState.productItem!};
      });
    }
  }

  onEditProduct() {
    this.store.dispatch(ProductsActions.EditProduct({ productItem: this.product }));
    this.isSaved = true;
    this.store.dispatch(RouterActions.navigate({path: ['admin/products']}));
  }

  onAddProduct() {
    this.store.dispatch(ProductsActions.AddProduct({ productItem: this.product }));
    this.store.dispatch(RouterActions.navigate({path: ['admin/products']}));
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
        this.store.dispatch(ProductsActions.EditProduct({ productItem: this.product }));
        return true;
      } else {
        return false;
      }
    }
  }
}
