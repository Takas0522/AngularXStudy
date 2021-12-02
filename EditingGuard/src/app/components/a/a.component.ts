import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.scss']
})
export class AComponent implements OnInit {

  constructor() { }

  isEditing = false;

  ngOnInit(): void {
  }

  @HostListener('window:beforeunload', ['$event'])
  windowBeforeunload(event: BeforeUnloadEvent) {
    console.log('window:beforeunload')
    return this.canDeactivate();
  }
  canDeactivate(): Observable<boolean> | boolean {
    return !this.isEditing;
  }
}
