import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DetailComponentInterface } from '../models/detail-component.interface';

@Component({
  selector: 'app-detail2',
  templateUrl: './detail2.component.html',
  styleUrls: ['./detail2.component.scss']
})
export class Detail2Component implements OnInit, DetailComponentInterface {

  constructor() { }
  formGroup = new FormGroup({
    textInput: new FormControl(''),
    dateInput1: new FormControl(null),
    dateInput2: new FormControl(null),
  });

  detailSubmit$ = new EventEmitter();

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.detailSubmit$.next(this.formGroup.value);
  }

}
