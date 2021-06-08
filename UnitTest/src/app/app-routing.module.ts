import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';

export const routes: Routes = [
    { path: '', component: UserListComponent },
    { path: 'user', component: UserEditComponent },
    { path: 'user/:id', component: UserEditComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
