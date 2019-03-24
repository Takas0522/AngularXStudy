import { Component, OnInit, forwardRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AddressModel } from '../models/my-form-group-model';

@Component({
  selector: 'app-address-input-dialog',
  templateUrl: './address-input-dialog.component.html',
  styleUrls: ['./address-input-dialog.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressInputDialogComponent),
      multi: true
    }
  ]
})
export class AddressInputDialogComponent implements ControlValueAccessor {

  private addressData: AddressModel;
  private isDisabled = false;
  private onChange: any = () => {};
  private onTouched: any =  () => {};

  constructor(
    private dialog: MatDialog
  ) { }

  openDiaog() {
    const dialog =  this.dialog.open(DialogComponent, {
      data: this.addressData
    });
    dialog.afterClosed().subscribe(data => {
      this.addressData = data;
      this.onChange(data);
      this.onTouched();
    });
  }

  // ↓ControlValueAccessorのInterface群
  writeValue(obj: any): void {
    this.addressData = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

}
