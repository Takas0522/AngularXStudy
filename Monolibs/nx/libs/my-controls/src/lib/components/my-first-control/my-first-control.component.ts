import { Component, Input } from '@angular/core';
import { add } from '@devtakas/utility';

/**
 * あれやこれや
 */
@Component({
  selector: 'devtakas-my-first-control',
  templateUrl: './my-first-control.component.html',
  styleUrls: ['./my-first-control.component.css'],
})
export class MyFirstControlComponent {
  protected a = 0;
  protected b = 0;
  protected output = '';

  /**
   * JSDOC
  */
  myControls = 0;

  /**aaaaaaaaaaaaaaaaaaaaaaaaaaaaa */
  @Input()
  hoge = '';

  protected valueChange() {
    const val = add(this.a, this.b);
    this.output = val.toString();
  }


}
