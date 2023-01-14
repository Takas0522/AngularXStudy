import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserRoleService } from '../services/user-role.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {

  constructor(
    private service: UserRoleService
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    // Observable<boolean|UrlTree>でもできなくはないけど書き味がちょっと複雑になる・・・
    // return this.service.getWaitUserRole$().pipe(
    //   mergeMap(() => of(this.service.canUsingUserRole('can-access-guard-page')))
    // );

    // なのでasync/awaitなこっちのが好み
    await this.service.getWaitUserRoleAsync();
    return this.service.canUsingUserRole('can-access-guard-page');
  }
}
