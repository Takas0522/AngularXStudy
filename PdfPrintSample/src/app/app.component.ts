import { Component, ViewChild } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PdfPrintSample';
  private readonly resPonseTypeName = 'type';

  buttonClick() {
    this.fileDowonload$().subscribe(s => {
      console.log(s.resObject);
      const blobUrl = URL.createObjectURL(s.resObject);
      console.log(blobUrl);
      const d: HTMLIFrameElement = document.querySelector('#foj');
      d.src = blobUrl;
      setTimeout(() => {
        d.contentWindow.print();
      }, 1000);
    });
  }

  private fileDowonload$(): Observable<IResponse> {
    return new Observable((observer: Observer<IResponse>) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 2) {
            if (xhr.status === 200) {
                xhr.responseType = 'blob';
            }
        }
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const contentType = xhr.response[this.resPonseTypeName];
                const blob = new Blob([xhr.response], { type: contentType });
                const contentDisposition = xhr.getResponseHeader('content-disposition');
                const res: IResponse = { httpStatus: 200, resObject: blob };
                observer.next(res);
            } else {
                const res: IResponse = { httpStatus: xhr.status, resObject: null };
                observer.next(res);
            }
            observer.complete();
        }
      };
      xhr.open('GET', `assets/Book1.pdf`);
      xhr.send();
    });
  }
}

export interface IResponse {
  httpStatus: number;
  resObject: Blob | null;
}

