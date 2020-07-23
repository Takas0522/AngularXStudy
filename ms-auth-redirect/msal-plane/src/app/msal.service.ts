import { Injectable } from '@angular/core';
import { UserAgentApplication, Account, AuthResponse } from 'msal';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MsalService {

  private client = new UserAgentApplication(environment.msalConfig);
  constructor() {
    this.client.handleRedirectCallback((err, res) => {
      console.log(err);
      console.log(res);
    });
  }

  getAccount(): Account {
    return this.client.getAccount();
  }

  loginRedirect(): void {
    this.client.loginRedirect();
  }

  aquireToken(): Promise<AuthResponse> {
    return this.client.acquireTokenPopup({ scopes: environment.msalScopes });
  }
}
