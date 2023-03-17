import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MyNameErrorDirective, myNameErrosInfo } from './directives/my-name.directive';
import { MyCustomControlComponent } from './components/my-custom-control/my-custom-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ERRORS_INFO_TOKEN } from './services/errors-info.service';

@NgModule({
  declarations: [
    AppComponent,
    MyNameErrorDirective,
    MyCustomControlComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: ERRORS_INFO_TOKEN, useValue: {
      errors: [
        { errorId: 'required', errorMessage: '値が入力されていませんよ。' },
      ]
    }, multi: true },
    { provide: ERRORS_INFO_TOKEN, useValue: myNameErrosInfo, multi: true } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
