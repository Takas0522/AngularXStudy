import { NgModule } from '@angular/core';
import { LibraryCModule } from '@devtakasmono/input-component';
import { LibraryBModule } from '@devtakasmono/calc-component';
import { LibraryAComponent } from './library-a.component';

@NgModule({
  declarations: [
    LibraryAComponent
  ],
  imports: [
    LibraryBModule,
    LibraryCModule
  ],
  exports: [
    LibraryAComponent
  ]
})
export class LibraryAModule { }
