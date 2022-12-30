import { Component, Input } from '@angular/core';
import { add, minus } from '@devtakasmono/utility';


@Component({
  selector: 'libb-calc',
  template: `
    <p>
      <button (click)="add()")>+</button>
      <button (click)="minus()")>-</button>
      <input readonly [ngModel]="value" />
    </p>
  `,
  styles: [
  ]
})
export class LibraryBComponent {

  @Input()
  a: number = 0;
  @Input()
  b: number = 0;

  value = 0;

  add() {
    this.value = add(this.a, this.b);
  }

  minus() {
    this.value = minus(this.a, this.b);
  }
}
