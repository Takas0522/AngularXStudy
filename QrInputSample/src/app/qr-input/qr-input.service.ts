import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrInputService {

  scanSuccess: Subject<string>;

  scanStart() {
    this.scanSuccess = new Subject<string>();
  }

  scanEnd() {
    this.scanSuccess.complete();
  }
}
