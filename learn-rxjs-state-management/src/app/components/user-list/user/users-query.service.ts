import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersQueryService {

  private _allList: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private _filteerList: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  get allList$(): Observable<User[]> {
    return this._allList.asObservable();
  }
  get allList(): User[] {
    return this._allList.value;
  }
  get filterList$(): Observable<User[]> {
    return this._filteerList.asObservable();
  }

  constructor() { }

  updateUserList(lits: User[]): void {
    this._allList.next(lits);
  }
  updatefilterList(lists: User[]): void {
    this._filteerList.next(lists);
  }
}
