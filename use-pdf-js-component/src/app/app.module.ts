import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PdfViewereComponent } from './components/pdf-viewere/pdf-viewere.component';

@NgModule({
  declarations: [
    AppComponent,
    PdfViewereComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
