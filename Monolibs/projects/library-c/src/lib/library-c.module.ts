import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibraryCComponent } from './library-c.component';

@NgModule({
  declarations: [
    LibraryCComponent
  ],
  imports: [
    FormsModule
  ],
  exports: [
    LibraryCComponent
  ]
})
export class LibraryCModule { }
