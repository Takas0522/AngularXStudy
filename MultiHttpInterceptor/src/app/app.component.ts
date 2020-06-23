import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private httpClient: HttpClient
  ) {}

  buttonClick() {
    this.httpClient.get('https://example.com/api/example').subscribe((x: any) => {
      console.log(x);
    });
  }

  errorButtonClick() {
    throw new Error('Application Errorrrrr!!');
  }
}
