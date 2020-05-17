import { Component, OnInit, Optional, Inject } from '@angular/core';
import { CustomLibConfig } from '../../custom-lib.config';
import { ISharedCustomLibService } from 'shared-custom-lib';

@Component({
  selector: 'lib1-custom-control',
  templateUrl: './custom-control.component.html',
  styleUrls: ['./custom-control.component.scss']
})
export class CustomControlComponent implements OnInit {

  applicationId = '';
  endPointUrl = '';
  shreadServiceValue = '';

  constructor(
    @Inject('SHARED_SERVICE') private sharedService: ISharedCustomLibService,
    @Optional() private config?: CustomLibConfig
  ) {
    if (config !== null) {
      this.applicationId = config.applicationId;
      this.endPointUrl = config.endPointUrl;
    }
  }

  ngOnInit(): void {
    this.sharedService.getValue$.subscribe(data => {
      this.shreadServiceValue = data;
    });
  }

  setValue() {
    this.sharedService.setValue('this is lib1 action');
  }

}
