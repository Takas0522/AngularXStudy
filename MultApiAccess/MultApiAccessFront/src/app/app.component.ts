import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private service: AppService
  ) {}

  getSingleData() {
    this.service.getSingleData('12').subscribe(x => console.log(x));
  }

  getMultipleDataWithMerge() {
    this.service.getMultipleDataWithMerge().subscribe(x => console.log(x));
  }

  getMultipleDataWithMergeArray() {
    this.service.getMultipleDataWithMergeArray().subscribe(x => console.log(x));
  }

  getMultipleDataWithConcat() {
    this.service.getMultipleDataWithConcat().subscribe(x => console.log(x));
  }

  getMultipleDataWithConcatArray() {
    this.service.getMultipleDataWithConcatArray().subscribe(x => console.log(x));
  }

}
