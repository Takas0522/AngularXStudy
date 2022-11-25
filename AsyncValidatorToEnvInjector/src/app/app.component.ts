import { Component, createEnvironmentInjector, EnvironmentInjector, inject, InjectionToken, Injector } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { filter, map, Observable } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private envInjector = inject(EnvironmentInjector);
  private fn = runInContext<AsyncValidatorFn>(this.envInjector, userExistsValidatorAsync);
  formGroup = new FormGroup({
    userId: new FormControl('', null, this.fn)
  });
  onclick() {
    const service = this.envInjector.runInContext(() => inject(UserService));
    service.getUsers$().subscribe(x => console.log(x))
  }
}


function runInContext<T>(injector: EnvironmentInjector, fn: (inj: EnvironmentInjector) => T): T {
  const token = new InjectionToken<T>('TOKEN');
  const tmpInjector = createEnvironmentInjector([
    {provide: token, useFactory: () => fn(injector)},
  ], injector);

  return tmpInjector.get(token);
}

const userExistsValidatorAsync = (injector: EnvironmentInjector): AsyncValidatorFn => {
  return (ctrl: AbstractControl): Observable<ValidationErrors | null> => {
    const userId = Number(ctrl.value);
    const service = injector.runInContext(() => inject(UserService));
    return service.getUsers$().pipe(
        map(m => {
          const ids = m.map(item => item.id);
          if (ids.includes(userId)) {
            return null;
          }
          return { notExists: true };
        })
    );
  }
}
