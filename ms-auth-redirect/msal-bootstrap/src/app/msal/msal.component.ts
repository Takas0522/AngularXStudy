import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './msal.component.html',
  styleUrls: ['./msal.component.scss']
})
export class MsalComponent implements OnInit {

  constructor(
    private msalService: MsalService
  ) { }

  ngOnInit(): void {
    console.log('MSAL COMPONENT');
  }

}
