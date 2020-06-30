import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { mockDatas } from './user.model';
import { UsersQueryService } from './users-query.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private query: UsersQueryService
  ) { }

  fetchUsers(): void {
    of(mockDatas).subscribe(x => {
      this.query.updateUserList(x);
    });
  }

  filterUsers(filter: {freeword: string, isAdmin: boolean}): void {
    const userList = this.query.allList;
    const fillist = userList.filter(f => {
      const retfreeword = f.id.includes(filter.freeword) || f.name.includes(filter.freeword);
      const isAdmin = filter.isAdmin ? (f.isAdministrator) : true;
      return retfreeword && isAdmin;
    });
    this.query.updatefilterList(fillist);
  }
}
