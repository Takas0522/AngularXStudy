import { Component, OnInit } from '@angular/core';
import { AuthenticationResult, PublicClientApplication } from '@azure/msal-browser';
import { AdalService } from 'adal-angular4';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private msalClient: PublicClientApplication = new PublicClientApplication(environment.msalConfig);
  constructor(
    private adalSevice: AdalService
  ) {

  }

  ngOnInit(): void {
    console.log('initinit')
    this.actionFlow();
  }

  private async actionFlow(): Promise<void> {
    /*
      Flow:
      - MSAL HandleRedirect
        - (NotAuth)MSAL LoginRedirect
      - ADAL HandleRedirect
        - (NotAuth)ADAL LoginRedirect
      - MSAL AqureTokenRdirect(API RESOURCE)
      - ADAL AquireTokeRedirect
      - MSAL AqureTokenRdirect(GRAPH RESOURCE)
        - HandleRedirect Error!
    */
    /*
    // Hack server-telemetry<CLIENT ID> Remove
    const serverTelemetry = sessionStorage.getItem(`server-telemetry-${environment.msalConfig.auth.clientId}`);
    if (serverTelemetry) {
      sessionStorage.removeItem(`server-telemetry-${environment.msalConfig.auth.clientId}`);
    }
    */
    await this.handleRedirectCallbackPromise();
    this.adalInitAndHandleRedirect();
    await this.msalAqureTokenApi();
    this.adalAqureToken();
    await this.msalAqureTokenGraph();
  }

  private async handleRedirectCallbackPromise(): Promise<void> {
    const res = await this.msalClient.handleRedirectPromise();
    console.log(res?.account);
    if (typeof res === 'undefined') {
      alert('undefined!!!');
    }
    if (!res) {
      console.log('login');
      this.msalClient.loginRedirect({ scopes: [ 'api://b467f2f1-a6b7-4656-88fe-5f334d95d656/api' ] });
      return;
    }
    this.saveMsalToken(res);
  }

  private adalIdTokenBackUp(): void {
    const idTokenBU = sessionStorage.getItem('adal.idtoken');
    if (idTokenBU) {
      localStorage.setItem('adal.idtoken', idTokenBU);
    }
    const idTokenRe = localStorage.getItem('adal.idtoken');
    if (idTokenRe) {
      sessionStorage.setItem('adal.idtoken', idTokenRe);
    }
  }

  private saveMsalToken(res: AuthenticationResult): void {
    const includeUserRead = res.scopes.map(m => m.toLowerCase()).includes('user.read');
    if (includeUserRead) {
      sessionStorage.setItem(`msal.accessToken.user.read`, res.accessToken);
      return;
    }
    sessionStorage.setItem(`msal.accessToken.${res.scopes[0].toLowerCase()}`, res.accessToken);
  }

  private loadMsalToken(scopes: string): string {
    const res = sessionStorage.getItem(`msal.accessToken.${scopes}`);
    if (res) {
      return res;
    }
    return '';
  }

  private adalInitAndHandleRedirect(): void {
    this.adalSevice.init(environment.adalConfig);
    this.adalSevice.handleWindowCallback();
    this.adalIdTokenBackUp();
    if (!this.adalSevice.userInfo.authenticated) {
      this.adalSevice.login();
    }
  }

  private adalAqureToken(): void {
    console.log('adalAqureToken');
    (this.adalSevice as any).context.callback = (err: string, token: string, msg: string) => {
      console.log({err: { err, token, msg}});
    };
    const accessToken = sessionStorage.getItem(`adal.access.token.keyhttps://graph.microsoft.com`);
    if (!accessToken) {
      (this.adalSevice as any).context.acquireTokenRedirect('https://graph.microsoft.com');
      return;
    }
    console.log({adalAqureToken: accessToken});
  }

  private async msalAqureTokenApi(): Promise<null | string> {
    console.log('msalAqureTokenApi');
    this.msalClient.setActiveAccount(this.msalClient.getAllAccounts()[0]);
    const res = await this.msalClient.acquireTokenSilent({ scopes: ['api://04ae08a5-78b2-4e43-af59-c8f932f93cd4/access'] });
    console.log({msalAqureTokenSilentApi: res});
    return res.accessToken;
  }

  private async msalAqureTokenGraph(): Promise<null | string> {
    console.log('msalAqureTokenGraph');
    const res = await this.msalClient.acquireTokenSilent({ scopes: ['api://04ae08a5-78b2-4e43-af59-c8f932f93cd4/access'] });
    console.log({msalAqureTokenSilentGraph: res});
    return res.accessToken;
  }


}
