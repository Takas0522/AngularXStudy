import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ZXingScannerModule } from '@innotec/ngx-scanner';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialSummaryModule } from './material-summary/material-summary.module';
import { QrInputComponent } from './qr-input/qr-input.component';
import { SheetBodyComponent } from './sheet-body/sheet-body.component';

@NgModule({
  declarations: [
    AppComponent,
    QrInputComponent,
    SheetBodyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialSummaryModule,
    ZXingScannerModule
  ],
  entryComponents: [
    SheetBodyComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
