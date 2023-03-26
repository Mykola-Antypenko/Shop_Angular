import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EmailValidatorDirective } from './validators/email-validator.directive';



@NgModule({
  declarations: [
    EmailValidatorDirective
  ],
  imports: [
    SharedModule
  ],
  exports: [
    EmailValidatorDirective
  ]
})
export class CoreModule { }
