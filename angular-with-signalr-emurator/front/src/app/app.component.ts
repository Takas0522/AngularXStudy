import { Component, OnInit } from '@angular/core';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.signalRInit();
  }

  message = '';

  signalRInit() {
    const connection = new HubConnectionBuilder()
      .withUrl('http://localhost:8888/client/?hub=Notifications', {
        accessTokenFactory: async () => {
          return await this.generateAccessToken()
        }
      }).build();
    connection.on('notifications', data => {
      console.log(data)
    });
    connection.start().then(_ => { console.log(_) })
  }

  private async generateAccessToken(): Promise<string> {
    const res = await lastValueFrom(this.httpClient.get<{ url: string, accessToken: string }>('http://localhost:7071/api/negotiate'));
    console.log(res)
    return res.accessToken;
  }

}
