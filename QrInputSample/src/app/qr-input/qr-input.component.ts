import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { SheetBodyComponent } from '../sheet-body/sheet-body.component';
import { QrInputService } from './qr-input.service';

@Component({
  selector: 'app-qr-input',
  templateUrl: './qr-input.component.html',
  styleUrls: ['./qr-input.component.scss']
})
export class QrInputComponent implements OnInit, OnDestroy {

  private isSuccesFlow = false;

  constructor(
    private _bottomComp: MatBottomSheet,
    private _qrInputService: QrInputService,
    private _el: ElementRef
  ) { }

  ngOnInit() {
    this._qrInputService.scanStart();
  }

  ngOnDestroy() {
    this._qrInputService.scanEnd();
  }

  onfocus() {
    if (this.isSuccesFlow) {
      return;
    }
    const res = this._bottomComp.open(SheetBodyComponent);
    this._qrInputService.scanSuccess.subscribe(x => {
      const con = <HTMLInputElement>this._el.nativeElement.querySelector('input');
      con.value = x;
      res.dismiss();
      this.isSuccesFlow = true;
    });
    res.afterDismissed().subscribe(() => {
      this.isSuccesFlow = false;
    });
  }

}
