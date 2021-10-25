import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-menu-one',
  templateUrl: './menu-one.component.html',
  styleUrls: ['./menu-one.component.scss']
})
export class MenuOneComponent implements OnInit {

  constructor(
    private service: MenuService
  ) { }

  ngOnInit(): void {
  }

  onCLicke(num: number) {
    this.service.clickMenu(num)
  }

}
