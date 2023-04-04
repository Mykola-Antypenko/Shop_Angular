import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterLinkStubDirective } from './testing-helpers';
import { LoginService } from "./login/services/login.service";

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let links: RouterLinkStubDirective[];
let linkDes: DebugElement[];
let loginService: LoginService;

describe('AppComponent (Shallow)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterLinkStubDirective
      ],
      providers: [
        LoginService,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    loginService = TestBed.get(LoginService);

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    linkDes = fixture.debugElement.queryAll(
      By.directive(RouterLinkStubDirective)
    );

    links = linkDes.map(
      d => d.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective
    );
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set title after view init', () => {
    component.ngAfterViewInit();
    expect(component.title.nativeElement.textContent).toEqual('Buy new phones');
  });

  it(`should have as title 'Buy new phones'`, () => {
    expect(component.title.nativeElement.innerHTML).toEqual('Buy new phones');
  });

  it('should check the routerLink value', () => {
    const anchor = fixture.debugElement.queryAll(By.css('.header-link'));

    expect(anchor.length).toEqual(1);
    expect(anchor[0].nativeElement.textContent).toEqual('Login');
    expect(anchor[0].nativeElement.getAttribute('routerLink')).toEqual('/login');
  });

  it('should click login link in the template', () => {
    const productLinkDe = linkDes[0];
    const productLink = links[0];

    expect(productLink.navigatedTo).toBeNull(
      'link should not have navigated yet'
    );

    productLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(productLink.navigatedTo).toBe('/login');
  });

  it('should check elements when isLoggedIn and isAdmin true', () => {
    component.loginService.isLoggedIn = true;
    component.loginService.isAdmin = true;
    fixture.detectChanges();

    const anchor = fixture.debugElement.queryAll(By.css('.header-link'));

    expect(anchor.length).toEqual(2);
    expect(anchor[0].nativeElement.textContent).toEqual('Admin');
    expect(anchor[1].nativeElement.textContent).toEqual('LogOut');
    expect(anchor[0].nativeElement.getAttribute('routerLink')).toEqual('/admin/products');
    expect(anchor[1].nativeElement.getAttribute('routerLink')).toEqual('/login');

    const logOutSpy = spyOn(loginService , 'logOut');

    anchor[1].triggerEventHandler('click', null);

    expect(logOutSpy).toHaveBeenCalledTimes(1);
  });
});
