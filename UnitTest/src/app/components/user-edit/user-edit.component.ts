import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { USER_TYPE_VALUE } from 'src/app/models/user.interface';
import { UserEditService } from './user-edit.service';

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
  constructor(
    private acitivateRoute: ActivatedRoute,
    private userEditService: UserEditService
  ) { }

  ngOnInit(): void {
    this.dataInit();
  }

  dataInit(): void {
    const userId = this.acitivateRoute.snapshot.paramMap.get('user');
    if (userId && userId !== '') {
      this.userEditService.fetch(userId);
    }
  }

}
