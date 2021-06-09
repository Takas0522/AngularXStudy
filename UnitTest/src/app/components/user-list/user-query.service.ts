import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInterface } from 'src/app/models/user.interface';
import { USER_TYPE } from '../../models/user.interface';

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
    const nowval = this.userList.value;
    const fil = nowval.filter(
      f => {
        return (data.isAdmin && f.userType === USER_TYPE.Admin) || (data.isCommonUser && f.userType === USER_TYPE.commonUser);
      }
    ).filter(f => {
      const txtinc = (f.userId !== '') ? f.userId.includes(data.searchInput) || f.userName.includes(data.searchInput) : true;
      return txtinc;
    });
    this.userList.next(fil);
  }

  update(datas: UserInterface[]): void {
    this.userList.next(datas);
  }
}
