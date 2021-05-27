import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SampleControlComponent } from './sample-control/sample-control.component';
import { MultiInputControlComponent } from './multi-input-control/multi-input-control.component';

@NgModule({
  declarations: [
    AppComponent,
    SampleControlComponent,
    MultiInputControlComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
