import { Component, OnInit } from '@angular/core';
import { UserAgentApplication } from 'msal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private readonly msalClient: UserAgentApplication;
  constructor() {
    this.msalClient = new UserAgentApplication({
      auth: {
        clientId: '6b4f866c-85a8-4f72-a2a0-0ad0166205e5',
        authority: 'https://login.microsoftonline.com/028db01b-7420-42ce-ba2e-6efb6ac11c10',
        redirectUri: 'http://localhost:4200/token-redirect-dummy.html'
      }
    });
    this.msalClient.handleRedirectCallback((err, response) => {
      if (err !== null) {
        console.log('err');
        console.log(err);
        return;
      }
      if (response !== null) {
        console.log('success');
        console.log(response);
      }
    });
  }

  ngOnInit() {
    const account = this.msalClient.getAccount();
    if (typeof(account) === 'undefined' || account === null) {
      this.msalClient.loginRedirect({ scopes: ['urn:spn:ad-auth-api/ad-auth-api'] });
    }
  }

  async getAccessToken() {
    const token = await this.msalClient.acquireTokenSilent({ scopes: ['urn:spn:ad-auth-api/ad-auth-api'], redirectUri: 'http://localhost:4200/token-redirect-dummy.html' });
    console.log(token);
  }
}
