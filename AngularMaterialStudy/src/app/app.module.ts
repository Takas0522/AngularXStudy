import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialSumaryModule } from './material-sumary/material-sumary.module';
import { MaterialButtonComponent } from './material-button/material-button.component';
import { MaterialChipsComponent } from './material-chips/material-chips.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    MaterialButtonComponent,
    MaterialChipsComponent,
    ProgressSpinnerComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialSumaryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
