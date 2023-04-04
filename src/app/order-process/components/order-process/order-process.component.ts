import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { CustomValidators } from '../../../core/validators/custom.validators';

@Component({
  selector: 'app-order-process',
  templateUrl: './order-process.component.html',
  styleUrls: ['./order-process.component.scss']
})
export class OrderProcessComponent implements OnInit {
  validationMessages = new Map([
    ['firstName', {
      message: '',
      required: 'Please enter your first name.',
      minlength: 'The first name must be longer than 3 characters.',
      capitalFirstLetter: 'The first letter must be uppercase.'
    }],
    ['lastName', {
      message: '',
      required: 'Please enter your last name.',
    }],
    ['email', {
      message: '',
      required: 'Please enter your email.',
      emailValidator: 'Please enter a valid email.',
    }],
    ['phone', {
      message: '',
      required: 'Please enter your phone.',

    }],
    ['selfPickup', {
      message: ''
    }],
    ['delivery', {
      message: ''
    }],
    ['country', {
      message: '',
      required: 'Please enter your country.',
    }],
    ['city', {
      message: '',
      required: 'Please enter your city.',
    }],
    ['street', {
      message: '',
      required: 'Please enter your street.',
    }],
  ])
  isShowAddress: boolean = false;
  orderForm = this.formBuilder.nonNullable.group({
    firstName: ['', [
      Validators.required,
      Validators.minLength(3),
      CustomValidators.capitalFirstLetter
      ]
    ],
    lastName: ['', Validators.required],
    email: ['', [Validators.required]],
    phones: this.formBuilder.array([this.buildPhones()]),
    selfPickup: false,
    delivery: true,
    country: ['', [Validators.required]],
    city: ['', [Validators.required]],
    street: ['', [Validators.required]],
  });
  controls: AbstractControl[] = [];
  placeHolder = {
    country: 'Country *',
    city: 'City *',
    street: 'Street *'
  }

  get firstName(): AbstractControl {
    return this.orderForm.get('firstName')!;
  }

  get lastName(): AbstractControl {
    return this.orderForm.get('lastName')!;
  }

  get email(): AbstractControl {
    return this.orderForm.get('email')!;
  }

  get phone(): AbstractControl {
    let phones = this.orderForm.get('phones') as FormArray;
    return phones.at(0).get('phone')!;
  }

  get phones(): FormArray {
    return this.orderForm.get('phones') as unknown as FormArray;
  }

  get selfPickup(): AbstractControl {
    return this.orderForm.get('selfPickup')!;
  }

  get delivery(): AbstractControl {
    return this.orderForm.get('delivery')!;
  }

  get country(): AbstractControl {
    return this.orderForm.get('country')!;
  }

  get city(): AbstractControl {
    return this.orderForm.get('city')!;
  }

  get street(): AbstractControl {
    return this.orderForm.get('street')!;
  }

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.orderForm.valueChanges.subscribe(ignorValue =>
      this.setValidationMessages()
    );

    this.setValidationMessages();

    this.controls.push(this.country);
    this.controls.push(this.city);
    this.controls.push(this.street);
  }

  onAddPhone(): void {
    this.phones.push(this.buildPhones());
  }

  onRemovePhone(index: number): void {
    this.phones.removeAt(index);
  }

  isShowValidationMessage(control: string): boolean {
    return this.validationMessages.get(control)!.message && (this as {[index: string]: any})[control].touched;
  }

  changePickUpStatus(element: HTMLInputElement) {
    this.isShowAddress = element.checked;
    this.isShowAddress ? this.delivery.disable() : this.delivery.enable();
    this.controls.forEach((control) => {
      control.reset();
      control.clearValidators();
      control.updateValueAndValidity();
    });
  }


  changeDeliveryStatus(element: HTMLInputElement) {
    if (element.checked) {
      this.controls.forEach((control) => {
        control.setValidators(Validators.required);
        control.updateValueAndValidity();
      });
      this.placeHolder = {
        country: 'Country *',
        city: 'City *',
        street: 'Street *'
      }
    } else {
      this.controls.forEach((control) => {
        control.clearValidators();
        control.updateValueAndValidity();
      });
      this.placeHolder = {
        country: 'Country',
        city: 'City',
        street: 'Street'
      };
    }
  }

  placeOrder() {
    window.alert('The order was confirmed');
  }

  private buildPhones() {
    return this.formBuilder.group({
      phone: ['', Validators.pattern('^\\+380\\d{3}\\d{2}\\d{2}\\d{2}$')],
    });
  }

  private buildValidationMessages(control: string): void {
    const c: AbstractControl = (this as {[index: string]: any})[control];
    this.validationMessages.get(control)!.message = '';

    if (c && c.errors) {
      this.validationMessages.get(control)!.message = Object.keys(c.errors)
        .map(key => {
          const value = this.validationMessages.get(control)!;
          return (value as {[index: string]: any})[key];
        })
        .join(' ');
    }
  }

  private setValidationMessages(): void {
    this.validationMessages.forEach((control, name) => {
      this.buildValidationMessages(name);
    })
  }
}
