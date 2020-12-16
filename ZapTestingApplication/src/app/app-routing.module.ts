import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataEditComponent } from './components/data-edit/data-edit.component';
import { DataListComponent } from './components/data-list/data-list.component';

const routes: Routes = [
  { path: '', component: DataListComponent },
  { path: 'list', component: DataListComponent },
  { path: 'edit/:id', component: DataEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
