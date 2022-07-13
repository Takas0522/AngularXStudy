import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';
import { UserInterface } from '../models/user.interface';
import { userDatas } from './test-datas/users';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = req;

    return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(1000))
            .pipe(dematerialize<any>());

    function handleRoute(): any {
      switch (true) {
        case url.endsWith('users') && method === 'GET':
          return getUsers();
        case url.includes('user/') && method === 'GET':
          const urlsep = url.split('/');
          const userId = urlsep.slice(-1)[0];
          return getUser(userId);
        default:
          // pass through any requests not handled above
          return next.handle(req);
      }
    }

    function getUsers(): Observable<HttpResponse<UserInterface[]>> {
      return okResut(userDatas);
    }

    function getUser(userId: string): Observable<HttpResponse<UserInterface[]>> {
      return okResut(userDatas.find(f => f.userId));
    }

    function okResut(bodyContents?: any): Observable<HttpResponse<any>> {
      return of(new HttpResponse({ status: 200, body: bodyContents }));
    }
  }
}
