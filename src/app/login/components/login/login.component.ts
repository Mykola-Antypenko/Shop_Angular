import {Component, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('roleInput') roleInput!: ElementRef<HTMLInputElement>;

  constructor(
    public loginService: LoginService,
    private router: Router
  ) {}

  onLogin(): void {
    this.loginService.logIn();
    if (this.loginService.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  handleRole(): void {
    this.loginService.isAdmin = this.roleInput.nativeElement.checked;
  }
}
