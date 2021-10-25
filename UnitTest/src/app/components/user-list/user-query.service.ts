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

  get userList$(): Observable<UserWithCheckedInterface[]> {
    return this.userList.asObservable();
  }

  constructor() { }

  update(datas: UserWithCheckedInterface[]): void {
    this.userList.next(datas);
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
}
