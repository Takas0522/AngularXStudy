import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFPageProxy } from 'pdfjs-dist/types/src/display/api';

@Component({
  selector: 'app-pdf-viewere',
  templateUrl: './pdf-viewere.component.html',
  styleUrls: ['./pdf-viewere.component.scss']
})
export class PdfViewereComponent implements OnInit {

  private _imageSrc: string = '';
  sanitizeImageSrc: SafeResourceUrl | null = null;

  @Input()
  set imageSrc(value: string) {
    if (this._imageSrc === value) return;
    this._imageSrc = value;
    this.sanitizeImageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(value);
    this.loadPdf(true);
  }

  @ViewChild('pdfCanvas', { static: true })
  private pdfCanvas!: ElementRef;

  @ViewChild('parents', { static: true })
  private parent!: ElementRef;

  private scale = 1;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    pdfjsLib.GlobalWorkerOptions.workerSrc = './assets/pdf.worker.min.js';
  }

  calcScale(isZoom: boolean) {
    const addScale = isZoom ? 0.5 : -0.5;
    this.scale = this.scale + addScale;
    this.loadPdf(false);
  }

  fix() {
    this.loadPdf(true);
  }

  scaleZoom(page: PDFPageProxy) {
    return page.getViewport({scale: this.scale});
  }

  fixedSpace(page: PDFPageProxy) {
    const pageViewPort = page.getViewport({scale: 1.0});
    const width = this.parent.nativeElement.offsetWidth;
    return page.getViewport({scale: width / pageViewPort.width});
  }

  private async loadPdf(isFixed: boolean) {
    const injStr = this._imageSrc.replace('data:application/pdf;base64,', '');
    const d = atob(injStr);
    const loadTask = pdfjsLib.getDocument({ data: d });
    const pdf = await loadTask.promise;
    const canvas = (this.pdfCanvas.nativeElement as HTMLCanvasElement);
    const page = await pdf.getPage(1);
    const viewport = isFixed ? this.fixedSpace(page) : this.scaleZoom(page);
    const context = canvas.getContext('2d');
    if (context == null) return;
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);
    await renderTask.promise;
  }

}
