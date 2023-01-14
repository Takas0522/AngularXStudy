import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, dematerialize, materialize, mergeMap, Observable, of } from 'rxjs';
import { UserRole } from '../models/user-role.interface';

@Injectable()
export class BackendMockService implements HttpInterceptor {

  constructor() { }

  private routeHandle(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    const { url, method } = req;
    switch(true) {
      case url.includes('role') && method === 'GET':
        const retData: UserRole = { affRoles: ['can-access-guard-page'] } ;
        return of(new HttpResponse({ status: 200, body: retData }));
    }
    return next.handle(req);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    return of(null)
      .pipe(delay(5000))
      .pipe(mergeMap(m =>{ return this.routeHandle(req, next)}))
  }
}
