import { Component, Inject, Injector } from '@angular/core';
import { FormControl, FormGroup, NG_VALIDATORS, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private saveValidator: ValidatorFn | null = null;

  constructor(
    @Inject(Injector)
    private inject: Injector
  ) {}

  protected formGroup = new FormGroup({
    userName: new FormControl('', [ Validators.required, Validators.maxLength(10), Validators.minLength(5) ]),
    address: new FormControl('', [ Validators.required ]),
    tel: new FormControl('', [ Validators.required ])
  });

  protected removeValidator() {
    this.saveValidator = this.formGroup.controls['userName'].validator;
    this.formGroup.controls['userName'].clearValidators();
    this.formGroup.markAllAsTouched();
  }

  protected reuseValidator() {
    this.formGroup.controls['userName'].setValidators(this.saveValidator);
    this.formGroup.controls['userName'].updateValueAndValidity();
  }

  protected hasUserNameError() {
    return this.formGroup.controls['userName'].invalid;
  }

}
