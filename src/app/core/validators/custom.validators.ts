import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static capitalFirstLetter({value}: AbstractControl): ValidationErrors | null {
    if (!value.match(/[A-Z]/)) {
      return {
        capitalFirstLetter: true
      };
    }
    return null;
  }

  static emailValidator({value}: AbstractControl): ValidationErrors | null {
    if (!value?.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)) {
      return {
        emailValidator: true
      };
    }
    return null;
  }
}
