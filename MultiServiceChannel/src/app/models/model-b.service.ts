import { Injectable } from '@angular/core';
import { ModelBaseClass } from './model-abstract';
import { Observable, of } from 'rxjs';

export interface IModelBModel {
  id: string;
  fuga: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModelBService extends ModelBaseClass<IModelBModel> {

  get(): Observable<IModelBModel> {
    return of({ id: '1', fuga: 'This is FUGA' });
  }

  post(param: IModelBModel): void{
    console.log(param);
  }

}
