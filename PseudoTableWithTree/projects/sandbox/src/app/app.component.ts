import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService, SampleDataInterface } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  get datasource$(): Observable<SampleDataInterface[]> {
    return this.service.sampleData$;
  }
  columnNames = ['id', 'name'];
  constructor(
    private service: AppService
  ) {}

}
