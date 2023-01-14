import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardPageComponent } from './components/guard-page/guard-page.component';
import { InitPageComponent } from './components/init-page/init-page.component';
import { NonGuardPageComponent } from './components/non-guard-page/non-guard-page.component';
import { UserRoleGuard } from './guards/user-role.guard';

const routes: Routes = [
  { path: '', component: InitPageComponent },
  { path: 'guard-page', component: GuardPageComponent, canActivate: [ UserRoleGuard ] },
  { path: 'non-guard-page', component: NonGuardPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
