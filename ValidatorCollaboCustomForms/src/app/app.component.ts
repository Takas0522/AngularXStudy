import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  protected inputForm = new FormControl('');

  ngOnInit(): void {
    this.inputForm.disable();
    this.inputForm.statusChanges.subscribe(x => {
      console.log(x)
      console.log(this.inputForm.errors)
    })
  }

  controlIsReady() {
    this.inputForm.enable();
  }
}
