import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AComponent } from './components/a/a.component';
import { BComponent } from './components/b/b.component';
import { BlankComponent } from './components/blank/blank.component';
import { EditingGuardService } from './services/editing-guard.service';

const routes: Routes = [
  { path: 'a', component: AComponent, canDeactivate: [EditingGuardService] },
  { path: 'b', component: BComponent },
  { path: '', component: BlankComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
