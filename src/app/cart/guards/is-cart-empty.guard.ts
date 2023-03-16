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
import { Store } from "@ngrx/store";
import * as RouterActions from '../../core/@ngrx/router/router.actions';
import { AppState, CartFeatureKey } from "../../core/@ngrx";

@Injectable({
  providedIn: 'root'
})
export class IsCartEmptyGuard implements CanActivate, CanLoad {
  constructor(
    private cartService: CartService,
    private router: Router,
    private store: Store<AppState>,
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
    let isEmptyCart;
    this.store.select(CartFeatureKey).subscribe((CartState) => {
      isEmptyCart = CartState.cartList.length;
    });

    if (isEmptyCart === 0) {
      this.cartService.isShowAlert = true;
      this.store.dispatch(RouterActions.navigate({ path: ['/product-list'] }));
      return false;
    } else {
      this.cartService.isShowAlert = false;
      return true;
    }
  }
}
