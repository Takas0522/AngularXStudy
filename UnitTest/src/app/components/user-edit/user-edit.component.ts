import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { USER_TYPE_VALUE } from 'src/app/models/user.interface';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({
    userId: new FormControl(''),
    userName: new FormControl(''),
    userType: new FormControl(USER_TYPE_VALUE.commonUser)
  });
  constructor() { }

  ngOnInit(): void {
  }

}
