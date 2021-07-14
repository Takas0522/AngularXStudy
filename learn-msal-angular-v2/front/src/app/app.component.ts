import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private authService: MsalService
  ) {}

  ngOnInit() {
    this.authSettingInit();
  }

  private async authSettingInit() {
    await this.authService.instance.handleRedirectPromise();
    // ↑がないとエラー吐く
    this.authService.handleRedirectObservable().subscribe(x => {
      if (x) {
        console.log({handleRedirectObservable: x})
      }
    });
    const ac = this.authService.instance.getAllAccounts();
    if (ac && ac.length > 0) {
      return;
    }
    this.authService.loginRedirect();
  }

  request(): void {
    this.httpClient.get('/base-api/WeatherForecast').subscribe(x => {
      console.log(x);
    });
  }
}
