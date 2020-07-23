import { Injectable } from '@angular/core';
import { PublicClientApplication, AccountInfo, AuthenticationResult } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root'
})
export class MsalService {

  private _accountInfo: AccountInfo | null = null;
  get accountInfo(): AccountInfo {
    return this._accountInfo;
  }

  private client = new PublicClientApplication({
    auth: {
      clientId: '53044c09-3a90-4342-9012-6044e5ab6dea',
      authority: 'https://login.microsoftonline.com/028db01b-7420-42ce-ba2e-6efb6ac11c10'
    }
  });
  constructor() {
    this.handleRedirectPromise();
  }

  private handleRedirectPromise(): void {
    this.client.handleRedirectPromise().then(res => {
      console.log(res);
      if (res) {
        this._accountInfo = res.account;
      } else {
        this.loginRedirect();
      }
    });
  }

  loginRedirect(): void {
    this.client.loginRedirect({ scopes: [ 'user.read', 'https://to19880522outlook.onmicrosoft.com/TrtMsalV2.Api/user_impersonation' ] });
  }

  async acquireTokenSilentPromise(): Promise<string> {
    const token = await this.client.acquireTokenSilent({ scopes: ['https://to19880522outlook.onmicrosoft.com/TrtMsalV2.Api/user_impersonation'], account: this.accountInfo }).catch(_ => {
      this.client.acquireTokenRedirect({ scopes: ['https://to19880522outlook.onmicrosoft.com/TrtMsalV2.Api/user_impersonation'] });
    });
    console.log({ token, name: 'acToken', instance: token instanceof AuthenticationResult });
    if (token === null) {
      return;
    }
    return ((token as AuthenticationResult).accessToken);
  }

  acquireTokenSilent(): void {
    console.log('actoken')
    this.client.acquireTokenSilent({ scopes: ['https://to19880522outlook.onmicrosoft.com/TrtMsalV2.Api/user_impersonation'], account: this.accountInfo }).then(res =>  {
      console.log(res);
    });
  }
}
