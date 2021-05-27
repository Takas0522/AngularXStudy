import { Component, DoCheck, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-multi-input-control',
  templateUrl: './multi-input-control.component.html',
  styleUrls: ['./multi-input-control.component.scss']
})
export class MultiInputControlComponent implements OnInit, ControlValueAccessor, DoCheck {
  inputCtrl1 = new FormControl('');
  inputCtrl2 = new FormControl('');
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

  private controlInit(): void {
    this.inputCtrl1.valueChanges.subscribe(x => {
      const val = { val1: x, val2: this.inputCtrl2.value };
      this.onChange(val);
      this.onTouched();
      this.setErrors();
    });
    this.inputCtrl2.valueChanges.subscribe(x => {
      const val = { val1: this.inputCtrl1.value, val2: x };
      this.onChange(val);
      this.onTouched();
      this.setErrors();
    });
  }

  private setErrors(): void {
    if (this.ngControl && this.ngControl.errors) {
      this.inputCtrl1.setErrors(this.ngControl.errors);
      return;
    }
    this.inputCtrl1.setErrors(null);
  }

  ngDoCheck(): void {
    if (this.inputCtrl1.touched) {
      return;
    }
    if (this.inputCtrl2.touched) {
      return;
    }
    if (this.ngControl.touched) {
      this.setErrors();
    }
  }
  writeValue(obj: any): void {
    if (obj == null) {
      return;
    }
    this.inputCtrl1.patchValue(obj.val1);
    this.inputCtrl2.patchValue(obj.val2);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.inputCtrl1.disable();
      this.inputCtrl2.disable();
    } else {
      this.inputCtrl1.enable();
      this.inputCtrl2.enable();
    }
  }
  hasSomeErrros(): boolean {
    return this.inputCtrl1.invalid || this.inputCtrl2.invalid;
  }
}
