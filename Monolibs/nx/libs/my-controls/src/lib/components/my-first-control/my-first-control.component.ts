import { Component } from '@angular/core';
import { add } from '@devtakas/utility';

@Component({
  selector: 'devtakas-my-first-control',
  templateUrl: './my-first-control.component.html',
  styleUrls: ['./my-first-control.component.css'],
})
export class MyFirstControlComponent {
  protected a = 0;
  protected b = 0;
  protected output = '';

  protected valueChange() {
    const val = add(this.a, this.b);
    this.output = val.toString();
  }

}
