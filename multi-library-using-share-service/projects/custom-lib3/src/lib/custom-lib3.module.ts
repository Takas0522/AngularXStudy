import { NgModule } from '@angular/core';
import { RoutingPage1Component } from './components/routing-page1/routing-page1.component';
import { RoutingPage2Component } from './components/routing-page2/routing-page2.component';
import { RoutingPage3Component } from './components/routing-page3/routing-page3.component';
import { RoutingParentPageComponent } from './components/routing-parent-page/routing-parent-page.component';
import { BlankPagaeComponent } from './components/blank-pagae/blank-pagae.component';
import { CustomLib3RoutingModule } from './custom-lib3-routing.module';

@NgModule({
  declarations: [
    RoutingPage1Component,
    RoutingPage2Component,
    RoutingPage3Component,
    RoutingParentPageComponent,
    BlankPagaeComponent
  ],
  imports: [
    CustomLib3RoutingModule
  ],
  exports: [RoutingParentPageComponent]
})
export class CustomLib3Module { }
