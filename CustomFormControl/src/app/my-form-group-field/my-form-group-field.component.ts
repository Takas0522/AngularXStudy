import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddressModel, MyFormGroupModel } from '../models/my-form-group-model';

@Component({
  selector: 'app-my-form-group-field',
  templateUrl: './my-form-group-field.component.html',
  styleUrls: ['./my-form-group-field.component.scss']
})
export class MyFormGroupFieldComponent implements OnInit {

  public fg: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  get formResult() {
    if (typeof(this.fg) !== 'undefined') {
      return JSON.stringify(this.fg.value);
    } else {
      return '';
    }
  }

  ngOnInit() {
    const initAddressData: AddressModel = { city: '', prefecture: '', zipCode: ''};
    this.fg = this.fb.group({
      userId: ['', Validators.required],
      familyName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: [initAddressData]
    });
  }

  patchData() {
    const initAddressData: AddressModel = { city: '港区', prefecture: '東京都', zipCode: '000-0000'};
    const data: MyFormGroupModel = {
      userId: 'devtakas',
      familyName: 'familyname',
      lastName: 'lastname',
      address: initAddressData
    };
    this.fg.patchValue(data);
  }

}
