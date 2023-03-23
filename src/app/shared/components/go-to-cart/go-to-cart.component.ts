import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as RouterActions from '../../../core/@ngrx/router/router.actions';

@Component({
  selector: 'app-go-to-cart',
  templateUrl: './go-to-cart.component.html',
  styleUrls: ['./go-to-cart.component.scss']
})
export class GoToCartComponent {
  constructor(
    private router: Router,
    private store: Store
  ) {}

  goToCart() {
    this.store.dispatch(RouterActions.navigate({path: ['/cart']}));
  }
}
