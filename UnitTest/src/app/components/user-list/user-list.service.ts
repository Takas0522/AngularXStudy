import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInterface, USER_TYPE_VALUE } from 'src/app/models/user.interface';
import { UserWithCheckedInterface } from './models/user-with-cheked.interface';
import { UserQueryService } from './user-query.service';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  private baseData: UserWithCheckedInterface[];
  private filter: {searchInput: string, isAdmin: boolean, isCommonUser: boolean} | null = null;

  constructor(
    private query: UserQueryService,
    private httpClient: HttpClient
  ) { }

  fetch(): void {
    this.httpClient.get<UserInterface[]>('api/users').subscribe(x => {
      this.baseData = x.map<UserWithCheckedInterface>(m => {
        return {
          checked: false,
          registerDate: m.registerDate,
          userId: m.userId,
          userName: m.userName,
          userType: m.userType
        };
      });
      this.query.update(this.baseData);
    });
  }

  filterUserList(data: {searchInput: string, isAdmin: boolean, isCommonUser: boolean} | null): void {
    if (data == null) {
      this.query.update(this.baseData);
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
    this.query.update(fil);
  }

  changeChekedState(id: string): void {
    const idx = this.baseData.findIndex(f => f.userId === id);
    this.baseData[idx].checked = !this.baseData[idx].checked;
    this.filterUserList(this.filter);
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
