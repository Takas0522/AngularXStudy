import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-qr-code-generator',
  templateUrl: './qr-code-generator.component.html',
  styleUrls: ['./qr-code-generator.component.scss']
})
export class QrCodeGeneratorComponent implements OnInit {

  private countInterval = interval(2000);
  qrString = '';

  ngOnInit() {
    this.countInterval.subscribe(count => {
      this.qrString = count.toString();
    });
  }

}
