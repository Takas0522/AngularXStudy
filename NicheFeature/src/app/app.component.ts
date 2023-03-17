import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ZipCodeComponent } from './components/zip-code/zip-code.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NicheFeature';
  zipCode = '123-4567';

  @ViewChild('zipCodeCtrl')
  private zipCodeCtrl!: ZipCodeComponent;

  protected formCtrl = new FormControl('765-4321');

  protected disb = false;
  toggleDisableState() {
    this.disb = !this.disb
  }

  toggleDisableStateFormControl() {
    if (this.formCtrl.disabled) {
      this.formCtrl.enable();
      return;
    }
    this.formCtrl.disable();
  }
}
