import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RangeValidator } from './validators/range-validator/range-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  formGroup1: FormGroup;
  formGroup2: FormGroup;

  ngOnInit(): void {
    // Set Cross-Field Validator
    this.formGroup1 = new FormGroup({
      from: new FormControl(),
      to: new FormControl()
    }, {validators: RangeValidator.rangeValidatorByFormGroup('from', 'to') });

    // Set FormControl Validator
    this.formGroup2 = new FormGroup({
      from: new FormControl(),
      to: new FormControl()
    });
    const fromCtrl = this.formGroup2.get('from');
    const toCtrl = this.formGroup2.get('to');
    this.formGroup2.setValidators(RangeValidator.rangeValidatorByFormControl(fromCtrl, toCtrl));
  }

}
