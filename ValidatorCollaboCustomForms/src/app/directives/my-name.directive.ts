import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { ErrorsInfo, ERRORS_INFO_TOKEN } from '../services/errors-info.service';

const errorId = 'nameError';

export const myNameValidator = (name: string): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    return (control.value !== name) ? { nameError: '' } : null;
  }
}

export const myNameErrosInfo: ErrorsInfo = {
  errors: [
    { errorId, errorMessage: '名前が違います。' }
  ]
}

@Directive({
  selector: '[appMyNameError]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MyNameErrorDirective , multi: true}
  ]
})
export class MyNameErrorDirective implements Validator {

  @Input('appMyNameError')
  myName = '';

  validate(control: AbstractControl): ValidationErrors | null {
    return this.myName ? myNameValidator(this.myName)(control) : null;
  }
}
