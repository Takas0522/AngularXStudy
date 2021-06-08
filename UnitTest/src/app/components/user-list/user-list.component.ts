import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserInterface } from 'src/app/models/user.interface';
import { UserQueryService } from './user-query.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  searchInput: FormControl = new FormControl('');
  userList$!: Observable<UserInterface[]>;

  constructor(
    private query: UserQueryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.controlInit();
    this.dataInit();
  }

  private controlInit(): void {
    this.searchInput.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe(x => {
      this.query.filterUserList(x);
    });
  }

  private dataInit(): void {
    this.userList$ = this.query.userList$;
    this.query.fetch();
  }

  addNewUser(): void {
    this.router.navigate(['user']);
  }

  editUser(userId: string): void {
    this.router.navigate(['user', userId]);
  }

}
