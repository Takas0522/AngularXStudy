import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppSerivce } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  calendarList$!: Observable<{id: string, summary: string}[]>;
  calendarList: {id: string, summary: string}[] = [];
  radioControl = new FormControl();

  constructor(
    private appService: AppSerivce
  ) {}
  ngOnInit(): void {
    this.appService.clientLoad();
    this.calendarList$ = this.appService.calendarList$;
  }

  async signin(): Promise<void> {
    await this.appService.signIn();
  }

  registerEvents() {
    const val = this.radioControl.value;
    this.appService.registerEvents(val);
  }

  getCalendarList() {
    this.appService.getCalendarList();
  }
}
