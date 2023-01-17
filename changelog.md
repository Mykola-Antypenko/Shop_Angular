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



