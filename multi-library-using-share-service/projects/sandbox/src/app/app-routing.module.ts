import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'lib3',
    loadChildren: () => import('custom-lib3').then(m => m.CustomLib3Module)
    // loadChildren: () => import('projects/custom-lib3/src/lib/custom-lib3.module').then(m => m.CustomLib3Module)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
