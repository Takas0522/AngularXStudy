import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MsalModule } from '@azure/msal-angular';
import { RouterModule, Route } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

const route: Route[] = [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MsalModule.forRoot({
      auth: {
        clientId: 'e2e6a50b-ab91-4566-9aac-b17e9e12480b',
        authority: 'https://login.microsoftonline.com/to19880522outlookcom.onmicrosoft.com/'
      }
    }),
    RouterModule.forRoot(route),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
