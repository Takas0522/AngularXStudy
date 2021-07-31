/// <reference types="gapi"/>
/// <reference types="gapi.auth2"/>
/// <reference types="gapi.calendar"/>

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.use';

@Injectable({
  providedIn: 'root'
})
export class AppSerivce {

  private authClient!: gapi.auth2.GoogleAuth;
  private calendarList: Subject<{ id: string, summary: string }[]> = new Subject<{ id: string, summary: string }[]>();
  get calendarList$ () {
    return this.calendarList.asObservable();
  }
  constructor() {}

  clientLoad(): void {
    // gapi.authインスタンスを使用できるようにロードする(scopeはOAuthの同意画面で設定したScopeを指定)
    gapi.load('client:auth2', () => {
      this.authClient = gapi.auth2.init({
        client_id: environment.gapiClientId,
        fetch_basic_profile: true,
        scope: 'openid https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events ',
      });
      // gapi.client.calendarを使用できるようにロードする
      gapi.client.init({
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
      })
    });
  }

  async signIn(): Promise<void> {
    const res = await this.authClient.signIn();
  }

  getCalendarList() {
    const req = gapi.client.calendar.calendarList.list()
    req.execute((res) => {
      const datas = res.items.map(m => {
        return { id: m.id, summary: m.summary }
      });
      this.calendarList.next(datas);
    })
  }



  registerEvents(calendarId: string): void {
    const event: gapi.client.calendar.EventInput = {
      summary: 'Test',
      start: {
        dateTime: '2021-07-31T00:00:00.000Z'
      },
      end: {
        dateTime: '2021-07-31T00:00:00.000Z'
      }
    };
    const req = gapi.client.calendar.events.insert({
      calendarId,
      resource: event
    });
    req.execute((res) => {
      console.log(res)
    });
    // Calendarのインスタンス作らなくても↓でOKだったりする
    // const req = gapi.client.request({
    //   path: `/calendar/v3/calendars/${calendarId}/events`,
    //   method: 'POST',
    //   body: event
    // });
    // req.execute((res) => {
    //   console.log(res)
    // });
  }
}
