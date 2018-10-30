import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatSelectModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class MaterialSummaryModule { }
