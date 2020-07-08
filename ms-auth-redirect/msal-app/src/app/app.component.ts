import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'msal';

  constructor(
    private msalService: MsalService
  ) {
    this.msalService.handleRedirectCallback((err, res) => {
      if (err) {
        console.log(err);
      }
    });
    const ac = this.msalService.getAccount();
    console.log(ac);
    if (!ac) {
      this.msalService.loginRedirect({ scopes: ['api://26a0b8a6-5a21-43a9-a5ee-f37149972cd4/read'] });
    }
  }

  async getToken(): Promise<void> {
    const res = await this.msalService.acquireTokenSilent({ scopes: [ 'api://26a0b8a6-5a21-43a9-a5ee-f37149972cd4/read' ], redirectUri: 'https://takas-auth-test.azurewebsites.net/redirect-page.html' });
    console.log(res);
  }
}
