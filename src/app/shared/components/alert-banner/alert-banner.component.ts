import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CartService } from '../../../cart/services/cart-service/cart.service';

@Component({
  selector: 'app-alert-banner',
  templateUrl: './alert-banner.component.html',
  styleUrls: ['./alert-banner.component.scss']
})
export class AlertBannerComponent {
  @Input() alertText!: string;
  @ViewChild('alertContainer') container!: ElementRef<HTMLDivElement>;

  constructor(private cartService: CartService) {}

  onClose() {
    this.container.nativeElement.outerHTML = '';
    this.cartService.isShowAlert = false;
  }

}
