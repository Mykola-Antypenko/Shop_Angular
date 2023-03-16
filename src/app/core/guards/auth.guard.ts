import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { LoginService } from '../../login/services/login.service';
import * as RouterActions from '../@ngrx/router/router.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private store: Store
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('CanActivate Guard is called');
    return this.checkLogin();
  }

  canLoad(route: Route, segments: UrlSegment[] ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('CanLoad Guard is called');
    return this.checkIsAdmin();
  }

  private checkLogin(): boolean | UrlTree {
    if (this.loginService.isLoggedIn && this.loginService.isAdmin) {
      return true;
    }
    return this.router.parseUrl('/login');
  }

  private checkIsAdmin() {
    if (this.loginService.isAdmin) {
      return true;
    } else {
      this.store.dispatch(RouterActions.navigate({path: ['/login']}));
      return false;
    }
  }
}
