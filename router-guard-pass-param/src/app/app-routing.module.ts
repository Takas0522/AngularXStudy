import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentOneComponent } from './components/component-one/component-one.component';
import { ComponentTwoComponent } from './components/component-two/component-two.component';
import { ComponentThreeComponent } from './components/component-three/component-three.component';
import { CanActivateRoleService } from './services/can-activate-role.service';


const routes: Routes = [
  { path: '', component: ComponentOneComponent },
  {
    path: 'two',
    component: ComponentTwoComponent,
    canActivate: [CanActivateRoleService],
    data: { roles: ['hoge'] }
  },
  {
    path: 'three',
    component: ComponentThreeComponent,
    canActivate: [CanActivateRoleService],
    data: { roles: ['admin'] }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
