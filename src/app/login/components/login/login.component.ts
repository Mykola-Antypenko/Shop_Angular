import {Component, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import * as RouterActions from '../../../core/@ngrx/router/router.actions';
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('roleInput') roleInput!: ElementRef<HTMLInputElement>;

  constructor(
    public loginService: LoginService,
    private router: Router,
    private store: Store
  ) {}

  onLogin(): void {
    this.loginService.logIn();
    if (this.loginService.isLoggedIn) {
      this.store.dispatch(RouterActions.goHome());
    }
  }

  handleRole(): void {
    this.loginService.isAdmin = this.roleInput.nativeElement.checked;
  }
}
