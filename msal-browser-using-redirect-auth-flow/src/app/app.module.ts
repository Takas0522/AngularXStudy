import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdalService } from 'adal-angular4';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    AdalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
