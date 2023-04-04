import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement} from '@angular/core';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProductViewComponent } from './product-view.component';
import { GoToCartComponent } from '../../../shared/components/go-to-cart/go-to-cart.component';
import {GoBackComponent} from '../../../shared/components/go-back/go-back.component';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

describe('ProductViewComponent', () => {
  let component: ProductViewComponent;
  let fixture: ComponentFixture<ProductViewComponent>;
  let addToCartButton: DebugElement;

  const storeMock = {
    select() {
      return of( {
            id: '1',
            img: '../../../../assets/product-images/default.jpg',
            name: 'Iphone 13',
            description: 'IPhone 13 description',
            price: 769,
            operationSystem: 'IOS',
            isAvailable: true,
            availableCount: 34,
            itemsInCart: 0,
          });
    },
    dispatch: jasmine.createSpy('dispatch')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProductViewComponent,
        GoToCartComponent,
        GoBackComponent,
        LoaderComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: storeMock
        }
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check product name value', async () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    await fixture.whenStable();

    const name: HTMLElement = fixture.nativeElement.querySelector('.product__name').textContent;

    expect(name).toContain(component.product.name.toUpperCase());
  });

  it('should check onAddToCart method', () => {
    // Arrange
    addToCartButton = fixture.debugElement.query(By.css('.btn-primary'));

    //Act
    component.onAddToCart();
    fixture.detectChanges();

    //Assert
    expect(addToCartButton.nativeElement.innerHTML).toBe('In cart');
    expect(component.product.availableCount).toEqual(33);
    expect(component.product.itemsInCart).toEqual(1);
    expect(storeMock.dispatch).toHaveBeenCalled();
  });
});
