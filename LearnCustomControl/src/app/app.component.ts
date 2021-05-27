import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formGroup = new FormGroup({
    inputOne: new FormControl('aa', [Validators.required]),
    inputTwo: new FormControl('', [Validators.required]),
    inputThree: new FormControl({val1: 'ddd', val2: 'eeee'}, [multiInputValidator()]),
    inputFour: new FormControl({ zip: '', address1: '', address2: '' }, [modalInputValidator()])
  });

  controlValue = 'ddddddddddddd';
  multiInputValue = { val1: 'hoge', val2: 'fuga' };
  modalInputValue= { zip: '111-1111', address1: 'HOGE City', address2: 'HOGE Town' };

  errorMessageCollection = [
    {
      sig: 'zip',
      errors: [
        { sig: 'reg', message: '正規表現' },
        { sig: 'req', message: '必須' },
      ]
    },
    {
      sig: 'address1',
      errors: [
        { sig: 'req', message: '必須' },
      ]
    },
  ];

  get modalInputString(): string {
    return JSON.stringify(this.modalInputValue);
  }
  constructor(
  ) {}

  ngOnInit(): void {
  }

  submitCheck(): void {
    this.formGroup.markAllAsTouched();
  }

  patch(): void {
    this.formGroup.patchValue({
      inputOne: 'zzz',
      inputTwo: 'zzzzzz'
    });
  }

  allTouch():void {
    this.formGroup.markAllAsTouched();
  }
}

export const multiInputValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value.val1 === '') {
      return {val1Required: true};
    }
    if (control.value.val2 === '') {
      return {val2Required: true};
    }
    return null;
  };
};

export const modalInputValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const zip: string = control.value.zip
    if (!zip.match(/^\d{3}-?\d{4}$/)) {
      return {zip: { error: 'reg' }};
    }
    if (zip === '') {
      return {zip: { error: 'req' }};
    }
    if (control.value.address1 === '') {
      return {address1: { error: 'req' }};
    }
    return null;
  };
};
