import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.scss']
})
export class CommonDialogComponent implements OnInit {

  dialogText = '';
  private _fontSize: number | null = null;
  get fontSize(): string {
    if (this._fontSize) {
      return `${this._fontSize}px`;
    }
    return '';
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { dialogText: string, fontSize?: number; }
  ) {
    console.log(this.data.fontSize)
    console.log('hoge');
    this.dialogText = data.dialogText;
    this._fontSize = data.fontSize;
  }

  ngOnInit(): void {
  }

}
