import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './directives/highlight/highlight.directive';
import { StylizeDirective } from './directives/stylize/stylize.directive';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { PathNotFoundComponent } from './components/path-not-found/path-not-found.component';
import { GoBackComponent } from './components/go-back/go-back.component';
import { GoToCartComponent } from './components/go-to-cart/go-to-cart.component';
import { CartService } from '../cart/services/cart-service/cart.service';
import { RouterLink } from '@angular/router';
import { AlertBannerComponent } from './components/alert-banner/alert-banner.component';

@NgModule({
  declarations: [
    HighlightDirective,
    StylizeDirective,
    OrderByPipe,
    LoaderComponent,
    GoBackComponent,
    GoToCartComponent,
    PathNotFoundComponent,
    AlertBannerComponent,
  ],
  providers: [
    CartService,
  ],
  exports: [
    HighlightDirective,
    StylizeDirective,
    OrderByPipe,
    LoaderComponent,
    GoToCartComponent,
    GoBackComponent,
    AlertBannerComponent,
    CommonModule,
    FormsModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ]
})
export class SharedModule { }
