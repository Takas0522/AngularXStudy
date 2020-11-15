import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DetailComponentInterface } from '../models/detail-component.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, DetailComponentInterface {

  @Output() detailSubmit$ = new EventEmitter();

  formGroup = new FormGroup({
    search1: new FormControl(null),
    search2: new FormControl(null),
    search3: new FormControl(null),
    search4: new FormControl(null),
    search5: new FormControl(null),
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.detailSubmit$.next(this.formGroup.value);
  }

}
