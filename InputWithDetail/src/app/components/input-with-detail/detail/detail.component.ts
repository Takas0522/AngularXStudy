import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  @Output() detailSubmit = new EventEmitter();

  formGroup = new FormGroup({
    search1: new FormControl(null),
    search2: new FormControl(null),
    search3: new FormControl(null),
    search4: new FormControl(null),
    search5: new FormControl(null),
  });

  constructor() { }

  ngOnInit(): void {
  }

  submit(): void {
    this.detailSubmit.next(this.formGroup.value);
  }

}
