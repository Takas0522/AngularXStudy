import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ptt-line-item',
  templateUrl: './line-item.component.html',
  styleUrls: ['./line-item.component.scss']
})
export class LineItemComponent<T> implements OnInit {

  @Input() items: T[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
