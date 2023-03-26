import { Directive } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';
import { CustomValidators } from './custom.validators';

@Directive({
  selector: '[appEmailValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EmailValidatorDirective,
    multi: true
  }]
})
export class EmailValidatorDirective implements Validator{

  constructor() { }

  validate(element: AbstractControl): ValidationErrors | null {
    return CustomValidators.emailValidator(element);
  }
}
