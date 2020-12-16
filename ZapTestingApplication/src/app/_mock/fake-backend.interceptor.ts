import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize, find } from 'rxjs/operators';
import { mockData } from './datas';
import { DataInterface } from '../models/data.interface';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const { url, method, headers, body } = request;

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(100))
      .pipe(dematerialize<any>());

    function handleRoute(): any {
      switch (true) {
        case url.endsWith('datas') && method === 'GET':
          return getDatas();
        case matchDataGetUrl(url) && method === 'GET':
            return getData(url);
        case url.endsWith('data') && method === 'POST':
          return updateDatas(request);
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }

      // tslint:disable-next-line:no-shadowed-variable
      function matchDataGetUrl(url: string): boolean {
        const reg = new RegExp('^data/[0-9]*$');
        const m = url.match(reg);
        return (m != null);
      }

      // tslint:disable-next-line:no-shadowed-variable
      function updateDatas(request: HttpRequest<any>): Observable<HttpResponse<any>> {
        const postData = (request.body as DataInterface);
        const findData = mockData.find(f => f.id === postData.id);
        if (findData) {
          findData.name = postData.name;
          findData.addDate = new Date();
        } else {
          mockData.push(postData);
        }
        return ok();
      }

      // tslint:disable-next-line:no-shadowed-variable
      function getData(url: string): Observable<HttpResponse<any>> {
        const urlSplits = url.split('/');
        const idSt = urlSplits[urlSplits.length - 1];
        const id = Number(idSt);
        if (isNaN(id)) {
          return ok();
        }
        const findData = mockData.find(f => f.id === id);
        return ok(findData);
      }

      function getDatas(): Observable<HttpResponse<any>> {
        return ok(mockData);
      }

      // tslint:disable-next-line:no-shadowed-variable
      function ok(body?: any): Observable<HttpResponse<any>> {
        return of(new HttpResponse({ status: 200, body }));
      }
    }
  }

}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
