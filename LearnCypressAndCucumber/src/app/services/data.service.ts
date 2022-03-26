import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data: BehaviorSubject<DataInterface[]> = new BehaviorSubject<DataInterface[]>([]);
  get data$() {
    return this.data.asObservable();
  }

  constructor() { }

  addData(data: DataInterface) {
    const cachedatas = this.data.value;
    cachedatas.push(data);
    this.data.next(cachedatas);
  }
}

export interface DataInterface {
  title: string;
  author: string;
  editDate: Date;
}