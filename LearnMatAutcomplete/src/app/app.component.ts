import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  get optionDatas$(): Observable<string[]> {
    return this.service.optionDatas$;
  }
  constructor(
    private service: AppService
  ) {}

  arrayUpdate(): void {
    this.service.updateOptionDatas();
  }
}
