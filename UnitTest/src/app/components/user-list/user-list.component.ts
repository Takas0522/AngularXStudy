import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { interval, Observable, pipe } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CHECK_STATE, CHECK_STATE_VALUE } from 'src/app/constants/check-state';
import { UserInterface } from 'src/app/models/user.interface';
import { UserWithCheckedInterface } from './models/user-with-cheked.interface';
import { UserListService } from './user-list.service';
import { UserQueryService } from './user-query.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  formGroup = new FormGroup({
    searchInput: new FormControl(''),
    isAdmin: new FormControl(true),
    isCommonUser: new FormControl(true)
  });

  userList$!: Observable<UserWithCheckedInterface[]>;
  displayedColumns: string[] = ['checked', 'userId', 'userName', 'registerDate', 'userType', 'edit'];
  cantDelete$!: Observable<boolean>;
  selectedState$!: Observable<CHECK_STATE>;

  constructor(
    private query: UserQueryService,
    private service: UserListService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.controlInit();
    this.dataInit();
  }

  private controlInit(): void {
    this.formGroup.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged<{ searchInput: string, isAdmin: boolean, isCommonUser: boolean }>((prev, current) => {
        return (
          prev.isAdmin === current.isAdmin &&
          prev.isCommonUser === current.isCommonUser &&
          prev.searchInput === current.searchInput
        );
      })
    ).subscribe(x => {
      this.service.filterUserList(x);
    });
  }

  private dataInit(): void {
    this.userList$ = this.query.userList$;
    this.cantDelete$ = this.query.selectedState$.pipe(map(m => m === CHECK_STATE_VALUE.nothing));
    this.selectedState$ = this.query.selectedState$;
    this.service.fetch();
  }

  addNewUser(): void {
    this.router.navigate(['user']);
  }

  editUser(userId: string): void {
    this.router.navigate(['user', userId]);
  }

  changeCheckedState(id: string): void {
    this.service.changeChekedState(id);
  }

  allCheckStateChange(): void {
    this.service.allCheckStateChange();
  }

}
