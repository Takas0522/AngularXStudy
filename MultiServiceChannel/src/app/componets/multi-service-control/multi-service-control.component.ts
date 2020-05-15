import { Component, OnInit, Input } from '@angular/core';
import { MultiServiceControlService } from './multi-service-control.service';
import { isModelAModel, isModelBModel } from 'src/app/models/type-guards';
import { IModelAModel } from 'src/app/models/model-a.service';
import { IModelBModel } from 'src/app/models/model-b.service';

@Component({
  selector: 'app-multi-service-control',
  templateUrl: './multi-service-control.component.html',
  styleUrls: ['./multi-service-control.component.scss'],
  providers: [ MultiServiceControlService ]
})
export class MultiServiceControlComponent implements OnInit {

  @Input() serviceNumber!: number;
  returnText = '';
  private data: IModelAModel | IModelBModel | null = null;

  constructor(
    private service: MultiServiceControlService
  ) { }

  ngOnInit(): void {
    this.service.settingModelService(this.serviceNumber);
    this.getData();
  }

  getData() {
    this.service.get().subscribe(x => {
      console.log({return: x});
      this.data = x;
      if (isModelAModel(x)) {
        const d1: IModelAModel = x;
        this.returnText = `hoge: ${d1.hoge}`;
        return;
      }
      if (isModelBModel(x)) {
        const d2: IModelBModel = x;
        this.returnText = `fuga: ${d2.fuga}`;
        return;
      }
      this.returnText = `empty`;
      return;
    });
  }

  post() {
    this.service.post(this.data);
  }

}
