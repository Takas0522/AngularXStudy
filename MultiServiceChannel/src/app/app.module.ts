import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MultiServiceControlComponent } from './componets/multi-service-control/multi-service-control.component';

@NgModule({
  declarations: [
    AppComponent,
    MultiServiceControlComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
