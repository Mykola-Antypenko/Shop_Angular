# Changelog

All notable changes to this project will be documented in this file.

## Shop

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

### Added
Task 1 Introduction
- Added component FirstComponent with several properties (simple properties and array) and used it in AppComponent.
- Added interface Product and enum.
- Added ProductComponent with method onAddToCart and @Input property for product name.
- Added ProductService with array of products and method getProducts that returns all products. Added component ProductList and used ngFor for this component.
- Added component CartList and added CartService (used ngIf and ngFor-trackBy for CartList component).

Task 2 Components
- Divided into modules CartModule, ProductsModule, OrdersModule, SharedModule
- Modified ProductComponent and ProductListComponent in order to display products
- Added ability to add product to cart in components for Product
- Modified CartService: added totalCost and totalQuantity, added ability to decrease/increase/remove product in cart
- Used @Input/@Output
- Used lifecycle hooks: OnInit, OnDestroy, DoCheck, AfterViewChecked, AfterViewInit
- Used DOM events: click, mouseenter, mouseleave
- Used @ViewChild and ElementRef in order to get access of template variable in AppComponent
- Added HighlightDirective
- Used NgClass

Task 4 Pipes
Pipes were used in components:
- CartItemComponent (uppercase, currency)
- CartListComponent (currency, custom orderBy)
- ProductComponent (uppercase, currency)
- ProductListComponent (async)

Task 5 Routing
- A list of products was implemented on the route /product-list
- From the product we can go to the Product View page (path - /product/:productID) by pressing the button Show more
- All functionality of cart is available on path /cart (we can go to the cart by pressing the cart button at the top of the page)
- Process order component will be loaded and displayed if we have no empty cart. (If the cart is empty, the redirect to the product-list will be triggered).
Process order component have CanLoad and CanActivate guards.
- The admin page will be available after login with the admin role - have CanLoad and CanActivate guards.
- On the admin page we can add and edit products. The edit page have resolve guard + CanDeactivate Guard 



