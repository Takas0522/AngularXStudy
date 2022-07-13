import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MenuContentDirective } from './directves/menu-content.directive';
import { MenuContentComponent } from './components/menu-content/menu-content.component';
import { MenuOneComponent } from './components/menu-content/menu-one/menu-one.component';
import { MenuTwoComponent } from './components/menu-content/menu-two/menu-two.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuContentDirective,
    MenuContentComponent,
    MenuOneComponent,
    MenuTwoComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
