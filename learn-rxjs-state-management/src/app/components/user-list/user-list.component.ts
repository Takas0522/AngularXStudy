import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UserService } from './user/user.service';
import { UsersQueryService} from './user/users-query.service';
import { User } from './user/user.model';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {

  users: User[] = [];
  isAdmin = false;
  @ViewChild('freeword')
  private freewordInput: ElementRef;

  constructor(
    private service: UserService,
    private query: UsersQueryService
  ) { }

  ngOnInit(): void {
    this.query.filterList$.subscribe(users => {
      this.users = users;
    });
    this.service.fetchUsers();
    this.service.filterUsers({ freeword: '', isAdmin: false });

  }

  ngAfterViewInit(): void {
    this.setupEvent();
  }

  private setupEvent(): void {
    console.log(this.freewordInput)
    fromEvent<HTMLElement>(this.freewordInput.nativeElement, 'input').pipe(
      map((event: any) => event.target.value),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(val => {
      this.service.filterUsers({ freeword: val, isAdmin: this.isAdmin });
    });
  }

  valueChanged(): void {
    const freeword = this.freewordInput.nativeElement.value;
    this.service.filterUsers({ freeword, isAdmin: this.isAdmin });
  }

}
