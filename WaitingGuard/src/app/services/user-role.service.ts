import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { UserRole } from '../models/user-role.interface';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  // null:未通信
  private _userRole: string[] | null = null;

  get userRole() {
    return this._userRole;
  }

  constructor(
    private httpClient: HttpClient
  ) {}

  // UserRoleの取得を待つ(Promise<Role>にして受け取ってもいいが)
  async getWaitUserRoleAsync(): Promise<void> {
    if (this._userRole == null) {
      // WebAPIを介してRoleデータ取得(duplicateだけどあえてtoPromise)
      return await this.httpClient.get<UserRole>('/api/role').pipe(
        tap(data => {
          this._userRole = data.affRoles;
          return;
        }),
        map(m => { return; })
      ).toPromise();
    }
    // 取得済みなのでreturn
    return;
  }

  getWaitUserRole$(): Observable<void> {
    if (this._userRole == null) {
      // WebAPIを介してRoleデータ取得
      return this.httpClient.get<UserRole>('/api/role').pipe(
        tap(data => {
          this._userRole = data.affRoles;
          return;
        }),
        map(m => { return; })
      );
    }
    return of();
  }

  canUsingUserRole(targetRole: string): boolean {
    if (this._userRole) {
      return this._userRole.includes(targetRole);
    }
    return false;
  }
}
