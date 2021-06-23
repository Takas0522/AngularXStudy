import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CHECK_STATE, CHECK_STATE_VALUE } from 'src/app/constants/check-state';
import { UserInterface } from 'src/app/models/user.interface';
import { USER_TYPE_VALUE } from '../../models/user.interface';
import { UserWithCheckedInterface } from './models/user-with-cheked.interface';

@Injectable({
  providedIn: 'root'
})
export class UserQueryService {

  private userList: BehaviorSubject<UserWithCheckedInterface[]> = new BehaviorSubject<UserWithCheckedInterface[]>([]);
  private baseData: UserWithCheckedInterface[];
  private filter: {searchInput: string, isAdmin: boolean, isCommonUser: boolean} | null = null;

  get userList$(): Observable<UserWithCheckedInterface[]> {
    return this.userList.asObservable();
  }

  constructor() { }

  filterUserList(data: {searchInput: string, isAdmin: boolean, isCommonUser: boolean} | null): void {
    if (data == null) {
      this.userList.next(this.baseData);
      return;
    }
    const baseData = this.baseData;
    this.filter = data;
    const fil = baseData.filter(
      f => {
        return (data.isAdmin && f.userType === USER_TYPE_VALUE.Admin) || (data.isCommonUser && f.userType === USER_TYPE_VALUE.commonUser);
      }
    ).filter(f => {
      const txtinc = (f.userId !== '') ? f.userId.includes(data.searchInput) || f.userName.includes(data.searchInput) : true;
      return txtinc;
    });
    this.userList.next(fil);
  }

  update(datas: UserInterface[]): void {
    this.baseData = datas.map<UserWithCheckedInterface>(m => {
      return {
        checked: false,
        registerDate: m.registerDate,
        userId: m.userId,
        userName: m.userName,
        userType: m.userType
      };
    });
    this.userList.next(this.baseData);
  }

  changeChekedState(id: string): void {
    const idx = this.baseData.findIndex(f => f.userId === id);
    this.baseData[idx].checked = !this.baseData[idx].checked;
    this.filterUserList(this.filter);
  }

  get selectedState$(): Observable<CHECK_STATE> {
    return this.userList$.pipe(
      map(m => {
        if (!m.some(s => s.checked)) {
          return CHECK_STATE_VALUE.nothing;
        }
        if (!m.some(s => !s.checked)) {
          return CHECK_STATE_VALUE.all;
        }
        return CHECK_STATE_VALUE.indeterminate;
      })
    );
  }

  allCheckStateChange(): void {
    if (!this.baseData.some(s => s.checked)) {
      this.baseData.forEach(f => f.checked = true);
      this.filterUserList(this.filter);
      return;
    }
    if (!this.baseData.some(s => !s.checked)) {
      this.baseData.forEach(f => f.checked = false);
      this.filterUserList(this.filter);
      return;
    }
    this.baseData.forEach(f => f.checked = true);
    this.filterUserList(this.filter);
  }
}
