import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserEditService {

  constructor(
    private httpClient: HttpClient
  ) {}
  fetch(id: string): void {}

  dummyTest(): Observable<string> {
    return this.httpClient.get<string>('data');
  }

}
