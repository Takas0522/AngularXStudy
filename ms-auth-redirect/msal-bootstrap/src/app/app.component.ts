import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private msalService: MsalService
  ) {}
  ngOnInit(): void {
    console.log('MAIN COMPONENT');
    this.msalService.handleRedirectCallback((err, res) => {
      console.log(err);
      console.log(res);
    });
    const account = this.msalService.getAccount();
    if (!account) {
      this.msalService.loginRedirect();
    }
  }

  async getToken(): Promise<void> {
    const res = await this.msalService.acquireTokenSilent({ scopes: [ 'user.read' ] });
    console.log(res);
  }
}
