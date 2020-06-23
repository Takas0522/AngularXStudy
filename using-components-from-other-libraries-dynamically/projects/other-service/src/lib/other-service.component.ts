import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-other-service',
  template: `
    <p>
      other-service works!
    </p>
  `,
  styles: [
  ]
})
export class OtherServiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
