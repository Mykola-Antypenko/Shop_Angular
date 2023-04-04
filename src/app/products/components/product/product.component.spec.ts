import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement} from '@angular/core';
import { ProductComponent } from './product.component';

describe('ProductComponentComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productName: DebugElement;
  let productPrice: DebugElement;
  let productOperationSystem: DebugElement;
  let productAvailable: DebugElement;
  let showMoreButton: DebugElement;
  let addToCartButton: DebugElement;
  const expectedProduct = {
    id: '1',
    img: '../../../../assets/product-images/default.jpg',
    name: 'Iphone 13',
    description: 'IPhone 13 description',
    price: 769,
    operationSystem: 'IOS',
    isAvailable: true,
    availableCount: 34,
    itemsInCart: 0
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;

    productName = fixture.debugElement.query(By.css('.product-name'));
    productPrice = fixture.debugElement.query(By.css('.product-price'));
    productOperationSystem = fixture.debugElement.query(By.css('.product-os'));
    productAvailable = fixture.debugElement.query(By.css('.product-amount'));
    showMoreButton = fixture.debugElement.query(By.css('.product-controllers .btn-outline-info'));
    addToCartButton = fixture.debugElement.query(By.css('.product-controllers .btn-primary'));
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product data', () => {
    component.productItem = expectedProduct;
    const expectedPipedName = expectedProduct.name.toUpperCase();
    const expectedPipedPrice = expectedProduct.price;
    const expectedPipedOperationSystem = expectedProduct.operationSystem;
    const expectedPipedAvailableCount = expectedProduct.availableCount;

    fixture.detectChanges();

    expect(productName.nativeElement.textContent).toContain(`Phone name: ${expectedPipedName}`);
    expect(productPrice.nativeElement.textContent).toContain(`Phone price: $${expectedPipedPrice}.00`);
    expect(productOperationSystem.nativeElement.textContent).toContain(`Phone OS: ${expectedPipedOperationSystem}`);
    expect(productAvailable.nativeElement.textContent).toContain(`Amount: ${expectedPipedAvailableCount}`);
  });

  it('should check calling method after clicking show more button', () => {
    //Arrange
    spyOn(component.showMoreEvent, 'emit');

    //Act
    showMoreButton.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    //Assert
    expect(component.showMoreEvent.emit).toHaveBeenCalled();
  });

  it('should check calling method after clicking add to cart button', () => {
    //Arrange
    component.productItem = expectedProduct;
    spyOn(component.addToCartEvent, 'emit');

    //Act
    addToCartButton.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    //Assert
    expect(component.addToCartEvent.emit).toHaveBeenCalled();
    expect(component.productItem.availableCount).toEqual(33);
    expect(component.productItem.itemsInCart).toEqual(1);
  });
});
