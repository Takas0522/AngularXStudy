import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFirstControlComponent } from './components/my-first-control/my-first-control.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [MyFirstControlComponent],
})
export class MyControlsModule {}
