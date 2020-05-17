import { Injectable } from '@angular/core';
import { IModelBaseClass } from 'src/app/models/model-abstract';
import { Injector } from '@angular/core';
import { ModelAService, IModelAModel } from 'src/app/models/model-a.service';
import { ModelBService, IModelBModel } from 'src/app/models/model-b.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class MultiServiceControlService {

  private modelService: IModelBaseClass;

  constructor(
    private injector: Injector
  ) {
  }

  settingModelService(service: number) {
    switch (service) {
      case 0:
        this.modelService = this.injector.get(ModelAService);
        break;
      case 1:
        this.modelService = this.injector.get(ModelBService);
        break;
      default:
        break;
    }
    console.log({setting: this.modelService});
  }

  get(): Observable<IModelAModel | IModelBModel> {
    if (typeof this.modelService === 'undefined') {
      return of(null);
    }
    return this.modelService.get();
  }

  post(param: IModelAModel | IModelBModel) {
    this.modelService.post(param);
  }
}
