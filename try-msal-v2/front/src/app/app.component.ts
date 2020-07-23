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
    if (this.msalService.accountInfo === null) {
      console.log(this.msalService.accountInfo)
    }
  }

  async getToken(): Promise<void> {
    const token = await this.msalService.acquireTokenSilentPromise();
    console.log({ name: 'getToken', token });
  }
}
