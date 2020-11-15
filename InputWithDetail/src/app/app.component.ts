import { Component, Type } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DetailComponent } from './components/input-with-detail/detail/detail.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'InputWithDetail';
  detailCompList: DetailSettingComponent[] = [];
  d1 = new DetailSettingComponent(DetailComponent);
  d1Text = '';

  formGroup1: FormGroup = new FormGroup({
    detail1: new FormControl({ inputText: '', detail: { search1: 'HOGEHOGE' } })
  });

  constructor() {
    this.formGroup1.valueChanges.subscribe(d => {
      this.d1Text = JSON.stringify(d.detail1);
    });
  }
}

class DetailSettingComponent {

  constructor(public component: Type<any>) {}
}
