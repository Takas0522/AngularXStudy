import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { MenuContentComponent } from './components/menu-content/menu-content.component';
import { MenuOneComponent } from './components/menu-content/menu-one/menu-one.component';
import { MenuTwoComponent } from './components/menu-content/menu-two/menu-two.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MenuInDynamicComponent';

  @ViewChild('menuTwoContent', {static: true})
  menuTwoComppnent!: MenuContentComponent<MenuTwoComponent>;

  contentOne = new ContentComponent(MenuOneComponent);

  ngOnInit() {
    this.menuTwoComppnent.contentComponent = MenuTwoComponent;
  }
}

class  ContentComponent {
  constructor(public component: Type<any>) {}
}