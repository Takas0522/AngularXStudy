import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataInterface, DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  private titleControl: AbstractControl | null = null;
  private authorControl: AbstractControl | null = null;

  get hasTitleError() {
    if (this.titleControl == null) {
      return true;
    }
    return this.titleControl.invalid;
  }

  get hasAuthorError() {
    if (this.authorControl == null) {
      return true;
    }
    return this.authorControl.invalid;
  }

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  formGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.titleControl = this.formGroup.get('title');
    this.authorControl = this.formGroup.get('author');
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }
    const formValue = this.formGroup.value;
    const addData: DataInterface = {
      title: formValue.title,
      author: formValue.author,
      editDate: new Date()
    }
    this.dataService.addData(addData);
    this.router.navigate(['']);
  }

}
