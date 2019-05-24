import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

const SAMPLE_INPUT_FORM_REVIVAL_CONTAINER_NAME = 'sample-input-data';

export interface ISampleInputModel {
  firstName: string;
  lastName: string;
  department: number;
}

@Injectable({
  providedIn: 'root'
})
export class SampleInputService {
  private inputData: BehaviorSubject<ISampleInputModel>;
  isExistsRevicalData = (): boolean => {
    const rvivalVal = this.getRevivalData();
    return typeof(rvivalVal) !== 'undefined' && rvivalVal !== null && rvivalVal !== '';
  }

  constructor() {
    this.inputData = new BehaviorSubject<ISampleInputModel>({
      firstName: null,
      department: null,
      lastName: null
    });
    if (this.isExistsRevicalData()) {
      const val = JSON.parse(this.getRevivalData()) as ISampleInputModel;
      this.inputData.next(val);
    }
  }

  inputData$(): Observable<ISampleInputModel> {
    return this.inputData.asObservable();
  }

  getInputData(keyword: string) {
    // Calling API
    // 必要があればUI用のプロパティにMappingする
    this.inputData.next(this.inputData.getValue());
  }

  updateData(data: ISampleInputModel) {
    // Calling API
    // 必要があればEntity用のプロパティにMappingする
    this.inputData.next(data);
    this.removeRevivalData();
  }

  settingRevivalData(value: string) {
    localStorage.setItem(SAMPLE_INPUT_FORM_REVIVAL_CONTAINER_NAME, value);
  }

  private getRevivalData(): string {
    return localStorage.getItem(SAMPLE_INPUT_FORM_REVIVAL_CONTAINER_NAME) as string;
  }

  private removeRevivalData() {
    return localStorage.removeItem(SAMPLE_INPUT_FORM_REVIVAL_CONTAINER_NAME);
  }
}
