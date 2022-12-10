import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppInputInterface } from './models/app-input.interface';

let mockData: AppInputInterface = {
  personalInfo: {
    userName: 'aaa',
    userAddress: 'aaa@exampl.com',
    userPhoneNumber: 'xxxx'
  },
  deliveryInfo: {
    zipCode: 'xxx-xxxx',
    address: 'hoge',
    address2:''
  }
};

@Injectable()
export class BackendMockService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url;
    if (url.includes('data') && req.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: mockData }));
    }
    if(url.includes('data') && req.method === 'POST') {
      mockData = req.body;
      return of(new HttpResponse({ status: 204 }));
    }
    return next.handle(req);
  }
}
