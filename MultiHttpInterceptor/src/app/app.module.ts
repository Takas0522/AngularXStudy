import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorOneService } from './services/interceptor-one.service';
import { InterceptorTwoService } from './services/interceptor-two.service';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorOneService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorTwoService, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
