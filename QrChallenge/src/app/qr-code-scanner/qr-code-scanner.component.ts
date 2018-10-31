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
  readString: string;

  ngOnInit() {
    this.scannner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.devices = devices;
      this.devices.unshift({deviceId: '', groupId: null, kind: null, label: 'None'});
    });
    this.scannner.scanSuccess.subscribe(result => {
      this.readString = result;
    });
  }

  ngOnDestroy() {
    this.scannner.resetScan();
  }

}
