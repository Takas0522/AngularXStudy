import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInterface } from 'src/app/models/user.interface';
import { UserQueryService } from './user-query.service';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(
    private query: UserQueryService,
    private httpClient: HttpClient
  ) { }

  fetch(): void {
    this.httpClient.get<UserInterface[]>('api/users').subscribe(x => {
      this.query.update(x);
    });
  }
}
