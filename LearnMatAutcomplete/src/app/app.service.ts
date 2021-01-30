import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseData: string[] = [];
  private _optionDatas: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  get optionDatas$(): Observable<string[]> {
    return this._optionDatas.asObservable();
  }

  constructor() {
    this.initValue();
  }

  private initValue(): void {
    const listDatas = [...Array(50000).keys()].map(x => `${x}さん`);
    this.baseData = listDatas;
    this.updateOptionDatas();
  }

  updateOptionDatas(): void {
    const nowLength = this._optionDatas.value.length;
    this._optionDatas.next(this.baseData.slice(0, nowLength + 10));
  }

}
