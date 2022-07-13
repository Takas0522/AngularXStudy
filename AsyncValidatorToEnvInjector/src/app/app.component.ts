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
  title = 'AsyncValidatorToEnvInjector';
  envInjector = inject(EnvironmentInjector);


  formGroup = new FormGroup({
    userId: new FormControl('', [], [this.envInjector.runInContext])
  })
}

const TOKEN = new InjectionToken('TOKEN', {
  providedIn: 'root',
  factory: () => userExistsValidatorAsync,
});

const userExistsValidatorAsync = () => {
  return (service: UserService) : AsyncValidatorFn  => {
    return (ctrl: AbstractControl): Observable<ValidationErrors | null> => {
      const userId = ctrl.value;
      return service.getUsers$().pipe(
        map(m => {
          if (m.map(item => item.id).includes(userId)) {
            return null;
          }
          return { notExists: true };
        })
      )
    }
  }
};