import { Component, DoCheck, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-sample-control',
  templateUrl: './sample-control.component.html',
  styleUrls: ['./sample-control.component.scss']
})
export class SampleControlComponent implements OnInit, ControlValueAccessor, DoCheck {
  inputCtrl = new FormControl('');
  private onChange: any = (obj: any) => {};
  private onTouched: any = (obj: any) => {};

  constructor(
    @Optional()
    @Self()
    private ngControl: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.controlInit();
  }

  ngDoCheck(): void {
    if (this.inputCtrl.touched) {
      return;
    }
    if (this.ngControl.touched) {
      this.setErrors();
    }
  }

  private controlInit(): void {
    this.inputCtrl.valueChanges.subscribe(x => {
      this.onChange(x);
      this.onTouched();
      this.setErrors();
    });
  }

  private setErrors(): void {
    if (this.ngControl && this.ngControl.errors) {
      this.inputCtrl.setErrors(this.ngControl.errors);
      return;
    }
    this.inputCtrl.setErrors(null);
  }


  writeValue(obj: any): void {
    this.inputCtrl.patchValue(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.inputCtrl.disable();
    } else {
      this.inputCtrl.enable();
    }
  }

  hasSomeErrros(): boolean {
    return this.inputCtrl.invalid;
  }

}
