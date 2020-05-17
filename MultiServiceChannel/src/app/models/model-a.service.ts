import { Injectable } from '@angular/core';
import { ModelBaseClass } from './model-abstract';
import { Observable, of } from 'rxjs';

export interface IModelAModel {
  id: string;
  hoge: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModelAService extends ModelBaseClass<IModelAModel> {

  get(): Observable<IModelAModel> {
    return of({ id: '1', hoge: 'This is HOGE' });
  }
  post(param: IModelAModel): void {
    console.log(param);
  }

}
