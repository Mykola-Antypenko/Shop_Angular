import { BehaviorSubject } from 'rxjs';
import { Component, Directive, Injectable, Input, HostListener } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Injectable()
export class ActivatedRouteStub {
  private subject = new BehaviorSubject(this.testParams);
  private _testParams!: {};

  paramMap = this.subject.asObservable();

  get testParams(): {} { return this._testParams; }
  set testParams(paramMap: {}) {
    this._testParams = paramMap;
    this.subject.next(paramMap);
  }

  get snapshot(): {} {
    return { paramMap: this.testParams };
  }
}

@Injectable()
export class RouterStub {
  navigate(commands: any[], extras?: NavigationExtras): any { }
  navigateByUrl(url: string): string { return url; }
}

@Directive({
  selector: '[routerLink]',
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick(): void {
    this.navigatedTo = this.linkParams;
  }
}

@Component({ selector: 'router-outlet', template: '' })
export class RouterOutletStubComponent { }
