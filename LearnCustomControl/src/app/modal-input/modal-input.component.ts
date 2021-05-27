import { Component, DoCheck, ElementRef, Input, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NgControl } from '@angular/forms';

@Component({
  selector: 'app-modal-input',
  templateUrl: './modal-input.component.html',
  styleUrls: ['./modal-input.component.scss']
})
export class ModalInputComponent implements OnInit, ControlValueAccessor, DoCheck {

  @ViewChild('dialog')
  private dialog!: ElementRef;
  private onChange: any = (obj: any) => {};
  private onTouched: any = (obj: any) => {};
  @Input()
  errorCollection: { sig: string, errors: { sig: string, message: string }[] }[] = [];

  formGroup = new FormGroup({
    zip: new FormControl(''),
    address1: new FormControl(''),
    address2: new FormControl('')
  });
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
    if (this.ngControl != null && this,this.ngControl.control != null) {
      const control = this.ngControl.control;
      this.formGroup.setValidators(control.validator)
    }
  }

  opedDialog(): void {
    this.dialog.nativeElement.showModal();
  }

  onSubmit(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) { return; }
    this.dialog.nativeElement.close();
    this.onChange(this.formGroup.value);
  }

  ngDoCheck(): void {
    if (!this.ngControl) {
      return;
    }
    if (this.ngControl.touched) {
      this.setErrors();
    }
  }

  private setErrors(): void {
    if (this.ngControl && this.ngControl.errors) {
      this.formGroup.setErrors(this.ngControl.errors);
      return;
    }
    this.formGroup.setErrors(null);
  }

  writeValue(obj: { zip: string, address1: string, address2: string }): void {
    if (obj == null) { return; }
    this.formGroup.patchValue(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }

  hasZipError(): boolean {
    return this.formGroup.hasError('zip')
  }
  hasAddress1Error(): boolean {
    return this.formGroup.hasError('address1')
  }

}
