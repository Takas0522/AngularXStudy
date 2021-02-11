import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PresudoTableWithTreeComponent } from './components/presudo-table-with-tree/presudo-table-with-tree.component';
import { MaterialModule } from './modules/material.module';
import { LineItemComponent } from './components/line-item/line-item.component';

@NgModule({
  declarations: [
    PresudoTableWithTreeComponent,
    LineItemComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [PresudoTableWithTreeComponent]
})
export class PresudoTableWithTreeModule { }
