import { Component } from '@angular/core';
import { MsalService } from './msal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'msal-plane';

  constructor(
    private msalService: MsalService
  ) {
    const account = this.msalService.getAccount();
    console.log(account);
    if (!account) {
      this.msalService.loginRedirect();
    }
  }

  async getToken(): Promise<void> {
    const res = await this.msalService.aquireToken();
    console.log(res);
  }
}
