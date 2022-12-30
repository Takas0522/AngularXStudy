import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'libc-input',
  template: `
    <p>
      <input [(ngModel)]="value" (ngModelChange)="onChange()"/>
    </p>
  `,
  styles: [
  ]
})
export class LibraryCComponent {

  private _value = 0;
  @Input()
  set value(v : string) {
    if (!isNaN(Number(v))) {
      this._value = Number(v);
    }
  }
  get value() {
    return this.value;
  }

  @Output()
  valueChange: EventEmitter<number> = new EventEmitter();

  onChange() {
    this.valueChange.emit(this._value);
  }
}
