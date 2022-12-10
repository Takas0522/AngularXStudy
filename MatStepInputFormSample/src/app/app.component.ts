import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { initData } from './models/app-input.interface';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  protected formGroup = new FormGroup({
    personalInfo: new FormControl(initData.personalInfo),
    deliveryInfo: new FormControl(initData.deliveryInfo)
  });

  get hasError() {
    return this.formGroup.invalid;
  }


  constructor(
    private dataService: DataService
  ) {

    // LOGGING
    this.formGroup.valueChanges.subscribe(x => console.log(x))
    this.formGroup.statusChanges.subscribe(x => {
      const personalInfoCtrl = this.formGroup.get('personalInfo');
      const deliveryInfoCtrl = this.formGroup.get('deliveryInfo');
      console.log({ status: x, personalInfoErrors: personalInfoCtrl?.errors, deliveryInfoCtrlErrors: deliveryInfoCtrl?.errors });
    })
  }

  fetchData() {
    this.dataService.getData().subscribe(x => {
      this.formGroup.patchValue(x);
    });
  }

}
