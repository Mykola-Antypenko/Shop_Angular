import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { selectQueryParams, selectRouteData, selectRouteParams, selectUrl } from './core/@ngrx';
import { merge, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { LoginService } from './login/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, AfterViewChecked, OnInit {
  @ViewChild('appTitle')
  title!: ElementRef<HTMLTitleElement>;

  constructor(
    public loginService: LoginService,
    private store: Store
  ) {}

  ngOnInit() :void {
    const url$ = this.store.select(selectUrl);
    const queryParams$ = this.store.select(selectQueryParams);
    const routeParams$ = this.store.select(selectRouteParams);
    const routeData$ = this.store.select(selectRouteData);
    const source$ = merge(url$, queryParams$, routeParams$, routeData$);
    source$.pipe(tap(val => console.log(val))).subscribe();
  }

  ngAfterViewInit(): void {
    this.title.nativeElement.innerHTML = 'Buy new phones';
  }

  ngAfterViewChecked(): void {
    console.log(this.title.nativeElement.innerHTML);
  }

  onLogOut(): void {
    this.loginService.logOut();
  }
}

