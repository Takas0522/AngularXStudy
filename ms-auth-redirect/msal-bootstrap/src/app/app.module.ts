import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';

import { AppComponent } from './app.component';
import { MsalComponent } from './msal/msal.component';
import { MsalModule, MsalService } from '@azure/msal-angular';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    MsalComponent
  ],
  imports: [
    BrowserModule,
    MsalModule.forRoot({
      auth: {
        clientId: '26a0b8a6-5a21-43a9-a5ee-f37149972cd4',
        redirectUri: 'http://localhost:4200',
        authority: 'https://login.microsoftonline.com/to19880522outlook.onmicrosoft.com/',
      }},
      {
        consentScopes: ['user.read']
      }
    ),
    RouterModule.forRoot([])
  ],
  providers: [
    MsalService
  ],
  bootstrap: []
})
export class AppModule {

  ngDoBootstrap(ref: ApplicationRef): void {
    if (window !== window.parent && !window.opener) {
      console.log('MSAL BOOTSTRAP');
      ref.bootstrap(MsalComponent);
    } else {
      console.log('APP BOOTSTRAP');
      ref.bootstrap(AppComponent);
    }
  }
}
