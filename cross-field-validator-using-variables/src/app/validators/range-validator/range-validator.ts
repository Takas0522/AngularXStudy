import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';

export class RangeValidator {

  public static rangeValidatorByFormGroup(fromControlName: string, toControlName: string): ValidatorFn {
    return (formGroup: any) => {
      const fromCtrl = (formGroup as FormGroup).get(fromControlName);
      const toCtrl = (formGroup as FormGroup).get(toControlName);
      return validatorFromAndConrolRange(fromCtrl, toCtrl);
    };
  }

  static rangeValidatorByFormControl = (fromControl: AbstractControl | null, toControl: AbstractControl | null): ValidatorFn => {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return validatorFromAndConrolRange(fromControl, toControl);
    };
  }
}

const isRangeError = (fromValue: number | string | Date, toValue: number | string | Date) => {
  return (fromValue > toValue);
};

const validatorFromAndConrolRange = (
  fromControl: AbstractControl | null,
  toControl: AbstractControl | null
): {[key: string]: any} | null => {
  if (!fromControl && !toControl) {
    return { range: 'control instance not gen' };
  }
  if (!fromControl && toControl) {
    return { range: 'control instance not gen' };
  }
  if (fromControl && !toControl) {
    return null;
  }
  const fv = fromControl?.value;
  const tv = toControl?.value;
  if (isRangeError(fv, tv)) {
    return { range: 'range err' };
  }
  return null;
};


