import { Component } from '@angular/core';
import { MsalService } from './msal/msal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private msalService: MsalService
  ) {
    this.msalInit();
  }

  async msalInit(): Promise<void> {
    await this.msalService.handleRedirectAsync();
    if (!this.msalService.account) {
      this.msalService.loginRedirect();
    }
  }

  async getAccessToken(): Promise<void> {
    const token = await this.msalService.acquireTokenSilent();
    console.log(token);
  }
}
