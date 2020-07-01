import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogComponent } from './components/common-dialog/common-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dialogText = '<div style="color:red;font-size:30px;">hoge</div><br><b>fuga</b><br><font color="red">piyo</font>';
  constructor(
    private dialog: MatDialog
  ) {}
  dialogOpen(): void {
    this.dialog.open(CommonDialogComponent, { data: { dialogText: this.dialogText, fontSize: 30 }});
  }
}
