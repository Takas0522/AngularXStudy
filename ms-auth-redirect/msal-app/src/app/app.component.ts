import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'msal';
  private readonly scopes: string[] = ['api://26a0b8a6-5a21-43a9-a5ee-f37149972cd4/read'];

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
      this.msalService.loginRedirect({ scopes: this.scopes });
    }
  }

  async getToken(): Promise<void> {
    const res = await this.msalService.acquireTokenSilent({
      scopes: this.scopes,
      redirectUri: environment.redirectDummy
    }).catch(_ => {
      console.log({redrect: _});
    });
    console.log(res);
  }
}
