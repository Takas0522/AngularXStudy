import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatStepperModule } from '@angular/material/stepper';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PersonalFormComponent } from './components/personal-form/personal-form.component';
import { BackendMockService } from './backend-mock.service';
import { DeliveryFormComponent } from './components/delivery-form/delivery-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonalFormComponent,
    DeliveryFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatStepperModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BackendMockService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
