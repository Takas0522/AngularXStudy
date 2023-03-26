import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MyNameErrorDirective, myNameErrosInfo } from './directives/my-name.directive';
import { MyCustomControlComponent } from './components/my-custom-control/my-custom-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ERRORS_INFO_TOKEN } from './services/errors-info.service';
import { NotExistsDirective } from './directives/not-exists-supplier.directive';

@NgModule({
  declarations: [
    AppComponent,
    MyNameErrorDirective,
    MyCustomControlComponent,
    NotExistsDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
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
