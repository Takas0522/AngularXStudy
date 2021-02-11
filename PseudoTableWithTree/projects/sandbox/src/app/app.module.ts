import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PresudoTableWithTreeModule } from '../../../presudo-table-with-tree/src/lib/presudo-table-with-tree.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PresudoTableWithTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
