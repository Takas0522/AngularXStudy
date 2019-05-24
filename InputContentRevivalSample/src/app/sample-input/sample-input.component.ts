import { Component, OnInit } from '@angular/core';
import { DepartmentMasterService, IDepartmentModel } from '../master-service/department-master.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SampleInputService, ISampleInputModel } from './sample-input.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sample-input',
  templateUrl: './sample-input.component.html',
  styleUrls: ['./sample-input.component.scss']
})
export class SampleInputComponent implements OnInit {

  sampleInputFormGroup: FormGroup;
  departmentData$: Observable<IDepartmentModel[]> = this.depService.data$();

  constructor(
    private formBuilder: FormBuilder,
    private service: SampleInputService,
    private depService: DepartmentMasterService
  ) { }

  ngOnInit() {
    this.sampleInputFormGroup = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null],
      department: [null]
    });
    this.service.inputData$().subscribe(x => {
      this.sampleInputFormGroup.patchValue(x);
    });
    this.formsSettings();
  }

  private formsSettings() {
    this.sampleInputFormGroup.valueChanges.subscribe(value => {
      const valSt = JSON.stringify(value);
      this.service.settingRevivalData(valSt);
    });
  }

  getInputData() {
    this.service.getInputData('');
  }

  clearForm() {
    this.sampleInputFormGroup.patchValue({
      firstName: null,
      lastName: null,
      department: null
    });
  }

  submitData() {
    const data = this.sampleInputFormGroup.value as ISampleInputModel;
    this.service.updateData(data);
  }

  departmentCompare(d1: number, d2: number): boolean {
    return d1 === d2;
  }

}
