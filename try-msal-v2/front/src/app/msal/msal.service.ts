import { Injectable } from '@angular/core';
import { PublicClientApplication, AccountInfo, AuthenticationResult } from '@azure/msal-browser';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MsalService {

    private clientApp: PublicClientApplication;
    account: AccountInfo | null = null;
    private scopes: string[] = [];

    constructor() {
        this.clientApp = new PublicClientApplication(environment.msalSettings);
        this.scopes = environment.scopes;
    }

    async handleRedirectAsync(): Promise<void> {
        const res = await this.clientApp.handleRedirectPromise().catch(err => {
            console.log({err});
        });
        if (res == null) {
            return;
        }
        this.account = (res as AuthenticationResult).account;
    }

    async loginRedirect(): Promise<void> {
        await this.handleRedirectAsync();
        if (!this.account) {
            this.clientApp.loginRedirect({ scopes: this.scopes });
        }
    }

    async acquireTokenSilent(): Promise<string> {
        const res = await this.clientApp.acquireTokenSilent({ scopes: this.scopes, account: this.account }).catch(err => {
            this.clientApp.acquireTokenPopup({ scopes: this.scopes });
        });
        return (res as AuthenticationResult).accessToken;
    }
}
