import { NgModule } from '@angular/core';
import { OtherServiceComponent } from './other-service.component';
import { DashBoardPartsAComponent } from './components/dash-board-parts-a/dash-board-parts-a.component';
import { DashBoardPartsBComponent } from './components/dash-board-parts-b/dash-board-parts-b.component';



@NgModule({
  declarations: [OtherServiceComponent, DashBoardPartsAComponent, DashBoardPartsBComponent],
  imports: [
  ],
  exports: [OtherServiceComponent]
})
export class OtherServiceModule { }
