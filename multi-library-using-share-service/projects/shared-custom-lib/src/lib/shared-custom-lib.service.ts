import { Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ISharedCustomLibService {
  getValue$: Observable<string>;
  setValue(val: string): void;
}

@Injectable({
  providedIn: 'root'
})
export class SharedCustomLibService implements ISharedCustomLibService {

  constructor() { }

  private getValue: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get getValue$() {
    return this.getValue.asObservable();
  }

  setValue(val: string) {
    this.getValue.next(val);
  }
}
