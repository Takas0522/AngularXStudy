import { NgModule } from '@angular/core';
import {
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
