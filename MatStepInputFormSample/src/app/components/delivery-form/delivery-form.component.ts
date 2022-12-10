import { Component, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { DeliveryInfoInterface, initData } from 'src/app/models/app-input.interface';

// 中身でFormGroupを使うタイプ

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.scss']
})
export class DeliveryFormComponent implements ControlValueAccessor, OnInit {

  private value: DeliveryInfoInterface = initData.deliveryInfo;
  private onChange = (obj: any) => {};
  private onTouched = (obj: any) => {};

  protected formGroup = new FormGroup({
    zipCode: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    address2: new FormControl('')
  })

  constructor(
    @Self()
    private control: NgControl
  ) {
    control.valueAccessor = this;
  }

  ngOnInit(): void {
    this.controlInit();
  }

  private controlInit() {

    // 値が変更された時
    this.formGroup.valueChanges.subscribe(x => {
      this.value = {
        address: x.address ? x.address : '',
        address2: x.address2 ? x.address2 : '',
        zipCode: x.zipCode ? x.zipCode : ''
      };
      this.onChange(x);
    });

    this.formGroup.statusChanges.subscribe(x => {
      if (x === 'INVALID') {
        this.control.control?.setErrors({ deliveryInfoFormError: true });
      } else {
        this.control.control?.setErrors(null);
      }
    })

  }

  writeValue(obj: any): void {
    this.value = obj;
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
}
