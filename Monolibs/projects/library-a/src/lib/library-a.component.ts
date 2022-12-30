import { Component, Input } from '@angular/core';
import { LibraryCComponent } from '@devtakasmono/input-component';

@Component({
  selector: 'lib-LibraryA',
  template: `
    <p>
      <libc-input #inputa (value)="aVal"></libc-input>
      <libc-input #inputb (value)="bVal"></libc-input>
      <libb-calc [a]="aVal" [b]="bVal"></libb-calc>
    </p>
  `,
  styles: [
  ]
})
export class LibraryAComponent {

  protected aVal = 0;
  protected bVal = 0;

  @Input('inputa')
  private inputA!: LibraryCComponent;
  @Input('inputb')
  private inputB!: LibraryCComponent;
}
