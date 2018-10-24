import { Component, Renderer, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AddEventAfterViewInit';
  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer
  ) {}
  private targetId = '#addEventTarget';
  private eventOneFunc: Function;
  private eventTwoFunc: Function;

  addEventOne() {
    this.eventOneFunc = this._renderer.listen(this._elementRef.nativeElement.querySelector(this.targetId), "click", (event) => {
      this.showOneMessage();
    });
  }
  removeEventOne() {
    this.eventOneFunc();
  }
  private showOneMessage() {
    alert('This is Event One!');
  }
  addEventTwo() {
    this.eventTwoFunc = this._renderer.listen(this._elementRef.nativeElement.querySelector(this.targetId), "click", (event) => {
      this.showTwoMessage();
    });
  }
  removeEventTwo() {
    this.eventTwoFunc();
  }
  private showTwoMessage() {
    alert('This is Event Two!');
  }
}
