import { Component, OnInit } from '@angular/core';
import { AdalService } from 'adal-angular4';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private adalService: AdalService
  ) {}

  ngOnInit() {
    this.adalService.init(environment.adal_property);
    this.adalService.handleWindowCallback();
    if (!this.adalService.userInfo.authenticated) {
      this.adalService.login();
    }
  }

  getApiAccessToken() {
    this.adalService.acquireToken('<WebAPI ApplicationId>').subscribe(token => console.log(token));
  }

}
