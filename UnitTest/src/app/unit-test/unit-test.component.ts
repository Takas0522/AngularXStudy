import { Component, OnInit } from '@angular/core';
import { UnitTestService } from './unit-test.service';

@Component({
  selector: 'app-unit-test',
  templateUrl: './unit-test.component.html',
  styleUrls: ['./unit-test.component.scss']
})
export class UnitTestComponent implements OnInit {

  value = 0;
  constructor(
    private unitTestService: UnitTestService
  ) { }

  ngOnInit(): void {
    this.unitTestService.getValue$().subscribe(x => {
      this.value = x;
    });
  }

  countUp(): void {
    this.unitTestService.countUp();
  }

}
