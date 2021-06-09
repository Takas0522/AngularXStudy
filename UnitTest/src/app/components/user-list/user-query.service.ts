import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInterface } from 'src/app/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserQueryService {

  private userList: BehaviorSubject<UserInterface[]> = new BehaviorSubject<UserInterface[]>([]);

  get userList$(): Observable<UserInterface[]> {
    return this.userList.asObservable();
  }

  constructor() { }

  filterUserList(data: {searchInput: string, isAdmin: boolean, isCommonUser: boolean}): void {
  }

  fetch(): void {
  }
}
