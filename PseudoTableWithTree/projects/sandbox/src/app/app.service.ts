import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface SampleDateChildInterface {
  id: string;
  name: string;
  value: number;
}

export interface SampleDataInterface {
  id: string;
  name: string;
  child: SampleDateChildInterface[];
}
@Injectable({
  providedIn: 'root'
})
export class AppService {

  private sampleData: BehaviorSubject<SampleDataInterface[]> = new BehaviorSubject<SampleDataInterface[]>([]);
  get sampleData$(): Observable<SampleDataInterface[]> {
    return this.sampleData.asObservable();
  }

  constructor() {
    this.initData();
  }

  private initData(): void {
    const datas = [...Array(100).keys()].map(m => {
      const childData = [...Array(m).keys()].map(cm => {
        const retChildData: SampleDateChildInterface = {
          id: `Child-${cm}`,
          name: `${cm}子`,
          value: cm
        };
        return retChildData;
      });
      const retData: SampleDataInterface = {
        id: `Parent-${m}`,
        name: `${m}さん`,
        child: childData
      };
      return retData;
    });
    this.sampleData.next(datas);
  }
}
