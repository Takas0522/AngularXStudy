import { Component } from '@angular/core';
import { MsalService } from './msal/msal.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private msalService: MsalService,
    private httpClient: HttpClient
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
    const token = await this.msalService.acquireTokenSilentWithoutScopes();
    console.log(token);
  }

  accessWebApi(): void {
    this.httpClient.get('/api/WeatherForecast').subscribe(data => {
      console.log(data);
    });
  }
}
