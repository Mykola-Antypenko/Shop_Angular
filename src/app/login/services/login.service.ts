import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  logIn(): boolean {
    this.isLoggedIn = true;
    return this.isAdmin;
  }

  logOut(): void {
    this.isLoggedIn = false;
    this.isAdmin = false;
  }
}
