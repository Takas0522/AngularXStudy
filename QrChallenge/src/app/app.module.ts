import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QrCodeScannerComponent } from './qr-code-scanner/qr-code-scanner.component';
import { QrCodeGeneratorComponent } from './qr-code-generator/qr-code-generator.component';
import { BlankComponent } from './blank/blank.component';
import { MaterialSummaryModule } from './material-summary/material-summary.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [
    AppComponent,
    QrCodeScannerComponent,
    QrCodeGeneratorComponent,
    BlankComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialSummaryModule,
    ZXingScannerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
