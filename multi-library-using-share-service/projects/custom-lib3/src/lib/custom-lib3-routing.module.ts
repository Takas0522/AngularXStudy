import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutingPage1Component } from './components/routing-page1/routing-page1.component';
import { RoutingPage2Component } from './components/routing-page2/routing-page2.component';
import { RoutingPage3Component } from './components/routing-page3/routing-page3.component';
import { BlankPagaeComponent } from './components/blank-pagae/blank-pagae.component';

const routes: Routes = [
  { path: '', component: BlankPagaeComponent },
  { path: 'page1', component: RoutingPage1Component },
  { path: 'page2', component: RoutingPage2Component },
  { path: 'page3', component: RoutingPage3Component },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CustomLib3RoutingModule { }
