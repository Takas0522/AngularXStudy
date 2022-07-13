import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AComponent } from '../components/a/a.component';

@Injectable({
  providedIn: 'root'
})
export class EditingGuardService implements CanDeactivate<AComponent> {

  constructor() { }
  canDeactivate(
    component: AComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log('can deactivated guard')
    return component.canDeactivate() ? true : confirm('移動していい？');
  }
}
