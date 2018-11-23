import { Component, OnInit, ViewChild, ChangeDetectorRef, Output, EventEmitter, Inject } from '@angular/core';
import { ZXingScannerComponent } from '@innotec/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { QrInputService } from '../qr-input/qr-input.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sheet-body',
  templateUrl: './sheet-body.component.html',
  styleUrls: ['./sheet-body.component.scss']
})
export class SheetBodyComponent implements OnInit {
  @ViewChild('scanner')
  private _scanner: ZXingScannerComponent;

  hasCameras = false;
  availableDevices: MediaDeviceInfo[];
  selectedDeviceId = '';
  hasPermission = false;

  get isDebugMode() {
    return !environment.production;
  }

  readingFormatType = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.AZTEC,
    BarcodeFormat.CODABAR,
    BarcodeFormat.CODE_39,
    BarcodeFormat.CODE_93,
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_8,
    BarcodeFormat.EAN_13,
    BarcodeFormat.ITF,
    BarcodeFormat.MAXICODE,
    BarcodeFormat.PDF_417,
    BarcodeFormat.RSS_14,
    BarcodeFormat.RSS_EXPANDED,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
    BarcodeFormat.UPC_EAN_EXTENSION
  ];

  constructor(
    private cd: ChangeDetectorRef,
    public service: QrInputService
  ) { }

  ngOnInit() {

    this._scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;
      this.availableDevices = devices;
      if (this.availableDevices.length > 1) {
        this.selectedDeviceId = this._scanner.getDeviceById(this.availableDevices[1].deviceId).deviceId;
      } else {
        this.selectedDeviceId = this._scanner.getDeviceById(this.availableDevices[0].deviceId).deviceId;
      }
      this.cd.detectChanges();
    });

    this._scanner.permissionResponse.subscribe((answer: boolean) => {
      this.cd.detectChanges();
      this.hasPermission = answer;
    });

  }

  selectedCmaeraChanged() {
    const nowIndex = this.availableDevices.findIndex(x => x.deviceId === this.selectedDeviceId);
    const length = this.availableDevices.length;
    if (nowIndex + 1 > length - 1) {
      this.selectedDeviceId = this._scanner.getDeviceById(this.availableDevices[0].deviceId).deviceId;
    } else {
      this.selectedDeviceId = this._scanner.getDeviceById(this.availableDevices[nowIndex + 1].deviceId).deviceId;
    }
  }

  handleQrCodeResult(resultString: string) {
    this.sendData(resultString);
  }

  sendData(resultString: string) {
    this.service.scanSuccess.next(resultString);
  }

}
