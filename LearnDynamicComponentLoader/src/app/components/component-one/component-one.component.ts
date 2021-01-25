import { Component, OnInit } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-component-one',
  templateUrl: './component-one.component.html',
  styleUrls: ['./component-one.component.scss']
})
export class ComponentOneComponent implements OnInit {

  private _data: Subject<any> = new Subject<any>();
  constructor() { }
  get data(): Observable<any> {
    return this._data.asObservable();
  }

  ngOnInit(): void {
    interval(1 * 60 * 1000).subscribe(x => {
      this._data.next(`Component One ${x}`);
    });
  }

}
