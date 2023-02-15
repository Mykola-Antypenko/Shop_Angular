import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../../cart/services/cart-service/cart.service';

@Component({
  selector: 'app-go-to-cart',
  templateUrl: './go-to-cart.component.html',
  styleUrls: ['./go-to-cart.component.scss']
})
export class GoToCartComponent {
  constructor(
    public cartService: CartService,
    private router: Router
  ) {}

  goToCart() {
    this.router.navigate(['/cart']);
  }
}
