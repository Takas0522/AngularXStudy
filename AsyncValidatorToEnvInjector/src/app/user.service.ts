import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUsers$() {
    // HttpClient経由でユーザーの一覧が取得される感じ
    return of([
      { id: 1, name: 'hoge' },
      { id: 2, name: 'huga' },
      { id: 3, name: 'hege' },
      { id: 4, name: 'piyo' },
    ]);
  }
}
