import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanActivateRoleService implements CanActivate {

  constructor(
    private userService: UserService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const roles = route.data.roles as Array<string>;
    const found = roles.some(s => this.userService.userRoles.includes(s));
    if (!found) {
      alert('Not Arrow');
    }
    return found;
  }
}
