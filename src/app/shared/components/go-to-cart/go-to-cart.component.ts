import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-go-to-cart',
  templateUrl: './go-to-cart.component.html',
  styleUrls: ['./go-to-cart.component.scss']
})
export class GoToCartComponent {
  constructor(
    private router: Router
  ) {}

  goToCart() {
    this.router.navigate(['/cart']);
  }
}
