import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataInterface, DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  formGroup = new FormGroup({
    title: new FormControl(''),
    author: new FormControl('')
  })

  ngOnInit(): void {
  }

  onSubmit(): void {
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
