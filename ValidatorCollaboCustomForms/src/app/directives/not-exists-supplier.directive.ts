import { Directive, inject, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, AsyncValidator, AsyncValidatorFn, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { ErrorsInfo, ERRORS_INFO_TOKEN } from '../services/errors-info.service';
import { SupplierService } from '../services/supplier.service';
import { WebApiInterface } from '../services/webapi.interface';

export const errorIdNotExists = 'notExists';
export const errorIdNotProvide = 'notProvideService';

export const existsDataValidator = (service: WebApiInterface<any>): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const val = control.value;
    if (val == null || val === '') {
      return of({ errorIdNotExists: true });
    }
    return service.getData(val).pipe(
      map(m => {
        if (m != null) {
          return null;
        }
        return { errorIdNotExists: true }
      })
    );
  }
    // return (control.value !== name) ? { nameError: '' } : null;
}

export const existsErrosInfo: ErrorsInfo = {
  errors: [
    { errorId: errorIdNotExists, errorMessage: 'コードに対応するデータが存在しません。' },
    { errorId: errorIdNotProvide, errorMessage: '指定されたサービスClassは使用できません。' }
  ]
}

@Directive({
  selector: '[exists-data]',
  providers: [
    { provide: NG_ASYNC_VALIDATORS, useExisting: NotExistsDirective , multi: true}
  ]
})
export class NotExistsDirective implements AsyncValidator {

  @Input('exists-data')
  serviceName = '';

  private service = inject(SupplierService);

  validate(control: AbstractControl): Observable<ValidationErrors | null> | Promise<ValidationErrors | null> {
    return existsDataValidator(this.service)(control);
  }
}
