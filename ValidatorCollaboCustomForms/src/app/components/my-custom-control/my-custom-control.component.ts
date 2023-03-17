import { Component, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { ErrorsInfoService } from 'src/app/services/errors-info.service';

@Component({
  selector: 'app-my-custom-control',
  templateUrl: './my-custom-control.component.html',
  styleUrls: ['./my-custom-control.component.scss']
})
export class MyCustomControlComponent implements OnInit,  ControlValueAccessor {

  protected inputForm = new FormControl('');

  constructor(
    @Self()
    @Optional()
    private ngControl: NgControl,
    private errorsInfoService: ErrorsInfoService
  ) {
    this.controlInit();
  }

  ngOnInit(): void {
    this.controlActionInit();
  }

  private controlInit() {
    if (this.ngControl == null) {
      return;
    }
    this.ngControl.valueAccessor = this;
  }

  private controlActionInit() {
    this.inputForm.valueChanges.subscribe(x => {
      this.onChange(x);
      this.onTouched();
      this.setErrors();
    });
  }

  private setErrors(): void {
    // console.log({ setErrors: this.ngControl.errors })
    if (this.ngControl && this.ngControl.errors) {
      this.inputForm.setErrors(this.ngControl.errors);
      return;
    }
    this.inputForm.setErrors(null);
  }

  writeValue(obj: any): void {
    this.inputForm.patchValue(obj);
  }

  private onChange = (obj: string | null) => undefined;
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  private onTouched = () => undefined;
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.inputForm.disable();
    } else {
      this.inputForm.enable();
    }
  }

  get errorMessage(): string {
    if (this.inputForm.errors) {
      console.log(this.inputForm.errors)
      for(var prop in this.inputForm.errors) {
        console.log(prop)
        return this.errorsInfoService.getErrorMessage(prop);
      }
    }
    return '';
  }
}
