import { Component, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { PersonalInfoInterface } from '../../models/app-input.interface';

// 中身でFormControlのみを使うタイプ

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.scss'],
})
export class PersonalFormComponent implements ControlValueAccessor, OnInit {

  protected userNameControl = new FormControl('', Validators.required);
  protected userAddressControl = new FormControl('', Validators.required);
  protected userPhoneNumberControl = new FormControl('');

  private onChange = (obj: any) => {};
  private onTouched = (obj: any) => {};

  get hasErrorInComponent() {
    return `userNameControl: ${this.userNameControl.invalid}` +
      `/userAddressControl: ${this.userAddressControl.invalid}`
  };

  private value: PersonalInfoInterface = {
    userName: '',
    userAddress: '',
    userPhoneNumber: ''
  };

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
    this.userNameControlInit();
    this.userAddressControlInit();
    this.userPhoneNumberControlInit();
  }

  private userNameControlInit() {

    // Component内の変更を利用Componentに伝播させる
    this.userNameControl.valueChanges.subscribe(x => {
      if (!x) {
        return;
      }
      this.value.userName = x;
      this.onChange(this.value);
    });

    // Component内のエラーを利用Componentに伝播させる
    this.userNameControl.statusChanges.subscribe(x => {
      if (x === 'INVALID') {
        // エラーの詳細は中身で補足しているからこのFormでエラー出てるよ！って情報だけ渡せばいいかな…？
        this.control.control?.setErrors({ personalInfoFormError: true });
      }
      if (x === 'VALID') {
        this.control.control?.setErrors(null);
      }
    });
  }

  private userAddressControlInit() {

    // Component内の変更を利用Componentに伝播させる
    this.userAddressControl.valueChanges.subscribe(x => {
      if (!x) {
        return;
      }
      this.value.userAddress = x;
      this.onChange(this.value);
    });

    // Component内のエラーを利用Componentに伝播させる
    this.userAddressControl.statusChanges.subscribe(x => {
      if (x === 'INVALID') {
        this.control.control?.setErrors({ personalInfoFormError: true });
      }
      if (x === 'VALID') {
        this.control.control?.setErrors(null);
      }
    });
  }

  private userPhoneNumberControlInit() {

    // Component内の変更を利用Componentに伝播させる
    this.userPhoneNumberControl.valueChanges.subscribe(x => {
      if (!x) {
        return;
      }
      this.value.userPhoneNumber = x;
      this.onChange(this.value);
    });

    // Component内のエラーを利用Componentに伝播させる
    this.userPhoneNumberControl.statusChanges.subscribe(x => {
      if (x === 'INVALID') {
        this.control.control?.setErrors({ personalInfoFormError: true });
      }
      if (x === 'VALID') {
        this.control.control?.setErrors(null);
      }
    });
  }

  writeValue(obj: any): void {
    this.value = obj;
    this.userNameControl.patchValue((obj as PersonalInfoInterface).userName);
    this.userAddressControl.patchValue((obj as PersonalInfoInterface).userAddress);
    this.userPhoneNumberControl.patchValue((obj as PersonalInfoInterface).userPhoneNumber);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.userNameControl.disable();
      this.userAddressControl.disable();
      this.userPhoneNumberControl.disable();
    } else {
      this.userNameControl.enable();
      this.userAddressControl.enable();
      this.userPhoneNumberControl.enable();
    }
  }

}
