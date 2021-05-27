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
    inputThree: new FormControl({val1: 'ddd', val2: 'eeee'}, [multiInputValidator()])
  });

  controlValue = 'ddddddddddddd';
  multiInputValue = { val1: 'hoge', val2: 'fuga' };

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
