import { Component, Type } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DetailComponent } from './components/input-with-detail/detail/detail.component';
import { Detail2Component } from './components/input-with-detail/detail2/detail2.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  d1 = new DetailSettingComponent(DetailComponent);
  d2 = new DetailSettingComponent(Detail2Component);

  d1Text = '';
  d2Text = '';

  formGroup1: FormGroup = new FormGroup({
    detail1: new FormControl({ inputText: '', detail: { search1: 'HOGEHOGE' } }),
    detail2: new FormControl({
      inputText: 'init val',
      detail: {
        dateInput1: new Date(),
        dateInput2: new Date(new Date().setMonth(new Date().getMonth() + 1))
      }})
  });

  constructor() {
    this.formGroup1.valueChanges.subscribe(d => {
      this.d1Text = JSON.stringify(d.detail1);
      this.d2Text = JSON.stringify(d.detail2);
    });
  }
}

class DetailSettingComponent {

  constructor(public component: Type<any>) {}
}
