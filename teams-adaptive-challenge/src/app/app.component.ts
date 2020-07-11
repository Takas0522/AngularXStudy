import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'teams-adaptive-challenge';

  constructor(
    private msalService: MsalService,
    private httpClient: HttpClient
  ) {
    this.msalService.handleRedirectCallback((err, res) => {
      console.log(err);
      console.log(res);
    });
    const account = this.msalService.getAccount();
    console.log(account)
    if (!account) {
      this.msalService.loginRedirect();
    }
  }

  async sendMessage(): Promise<void> {
    const res = await this.msalService.acquireTokenSilent({ scopes: [ 'ChannelMessage.Edit', 'ChannelMessage.Read.All', 'ChannelMessage.Send', 'Presence.Read' ] });
    const header = new HttpHeaders().append('Authorization', `Bearer ${res.accessToken}`);
    const presence = await this.httpClient.get('https://graph.microsoft.com/beta/me/presence', { headers: header }).toPromise();
    console.log(presence);
    const setExpDate = new Date();
    setExpDate.setHours(setExpDate.getHours() + 9);
    setExpDate.setMinutes(setExpDate.getMinutes() + 5);
    const setExpDateJson = setExpDate.toJSON();
    const sendData = new SubscriptionBody();
    sendData.expirationDateTime = setExpDateJson;
    const res2 = await this.httpClient.post('https://graph.microsoft.com/beta/subscriptions', sendData, { headers: header }).toPromise();
    console.log(res2)
  }
}

class SubscriptionBody {
  changeType = 'updated';
  notificationUrl =  'https://okawa-sample-subscription.azurewebsites.net/api/GraphSubscription?code=0NN8Rhg1cRAwzp2iXYb1tuwoSQzmatYMZ8PZTozGE1mao5jHGqzmzg==';
  resource =  "users('df8e94ea-d7dc-4b7c-a20b-a6cb263b65cb')/presence";
  expirationDateTime = '';
}
