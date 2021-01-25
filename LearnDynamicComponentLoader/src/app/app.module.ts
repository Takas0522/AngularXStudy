import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DynamicComponentDirective } from './dynamic-component.directive';
import { ComponentOneComponent } from './components/component-one/component-one.component';

@NgModule({
  declarations: [
    AppComponent,
    DynamicComponentDirective,
    ComponentOneComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
