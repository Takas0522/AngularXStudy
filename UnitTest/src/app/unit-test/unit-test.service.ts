import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitTestService {

  constructor() { }

  private _getValue: Subject<number> = new Subject<number>();
  private numnum = 0;

  getValue$(): Observable<number> {
    return this._getValue.asObservable();
  }

  countUp(): void {
    this._getValue.next(++this.numnum);
  }
}
