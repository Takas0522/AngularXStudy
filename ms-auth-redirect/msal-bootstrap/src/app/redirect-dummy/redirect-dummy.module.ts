import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAgentApplication } from 'msal';
import { AppComponent } from './app/app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class RedirectDummyModule {

  private client: UserAgentApplication;
  constructor() {
    this.client = new UserAgentApplication({
      auth: {
        clientId: '26a0b8a6-5a21-43a9-a5ee-f37149972cd4',
        redirectUri: 'http://localhost:4200',
        authority: 'https://login.microsoftonline.com/to19880522outlook.onmicrosoft.com/'
      }
    });
  }
}
