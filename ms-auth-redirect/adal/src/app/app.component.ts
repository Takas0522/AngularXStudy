import { Component } from '@angular/core';
import { AdalService } from 'adal-angular4';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'adal';
  constructor(
    private adalService: AdalService
  ) {
    this.adalService.init(environment.config);
    this.adalService.handleWindowCallback();
    if (!this.adalService.userInfo.authenticated) {
      this.adalService.login();
    }
  }

  getToken(): void {
    this.adalService.acquireToken(environment.config.clientId).subscribe(res => {
      console.log(res);
    });
  }
}
