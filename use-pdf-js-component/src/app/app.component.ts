import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'use-pdf-js-component';
  @ViewChild('inputFile', { static: true })
  private inputFileCtrl!: ElementRef;
  imageSrcValue = '';

  get imageSrcSafeVal() {
    const val = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageSrcValue);
    return val
  }
  constructor(
    private sanitizer: DomSanitizer
  ) { }

  changeInputFile(event: EventTarget | null) {
    if (event == null) {
      this.inputFileCtrl.nativeElement.value = null;
      return;
    }
    const files = (event as HTMLInputElement).files;
    console.log(files)
    if (files == null || files?.length < 1) {
      this.inputFileCtrl.nativeElement.value = null;
      return;
    }
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const blob= e.target?.result;
      if (blob) {
        this.imageSrcValue = (blob as string);
      }
    };
    const file = files[0];
    reader.readAsDataURL(file);
  }
}
