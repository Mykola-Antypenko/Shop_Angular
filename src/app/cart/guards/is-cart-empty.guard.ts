import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart-service/cart.service';

@Injectable({
  providedIn: 'root'
})
export class IsCartEmptyGuard implements CanActivate, CanLoad {
  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('CanActivate guard worked');
    return this.checkCart();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('CanLoad guard was worked');
    return this.checkCart();
  }

  private checkCart(): boolean {
    if (this.cartService.countOfProduct === 0) {
      this.cartService.isShowAlert = true;
      this.router.navigate(['/product-list']);
      return false;
    } else {
      this.cartService.isShowAlert = false;
      return true;
    }
  }
}
