import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    MatListModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MatListModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class MaterialModule {}
