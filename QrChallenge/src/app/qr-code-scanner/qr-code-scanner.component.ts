import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-qr-code-scanner',
  templateUrl: './qr-code-scanner.component.html',
  styleUrls: ['./qr-code-scanner.component.scss']
})
export class QrCodeScannerComponent implements OnInit, OnDestroy {

  @ViewChild('scanner') private scannner: ZXingScannerComponent;
  devices: MediaDeviceInfo[];
  selectDeviceId: string;

  constructor() { }

  ngOnInit() {
    this.scannner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.devices = devices;
      this.devices.unshift({deviceId: '', groupId: null, kind: null, label: 'None'});
      console.log(this.devices)
    });
    this.scannner.scanSuccess.subscribe(result => {
      console.log(result);
    });
  }

  selectionChanged() {
    console.log(this.selectDeviceId)
  }

  ngOnDestroy() {
    this.scannner.resetScan();
  }

}
