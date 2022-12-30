import { NgModule } from '@angular/core';
import { LibraryBComponent } from './library-b.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LibraryBComponent
  ],
  imports: [
    FormsModule
  ],
  exports: [
    LibraryBComponent
  ]
})
export class LibraryBModule { }
