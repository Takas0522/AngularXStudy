import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetModule, MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatBottomSheetModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    MatBottomSheetModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class MaterialSummaryModule { }
