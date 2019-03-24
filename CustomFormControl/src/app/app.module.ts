import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyFormGroupFieldComponent } from './my-form-group-field/my-form-group-field.component';
import { NameInputComponent } from './name-input/name-input.component';
import { AddressInputDialogComponent } from './address-input-dialog/address-input-dialog.component';
import { DialogComponent } from './address-input-dialog/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MyFormGroupFieldComponent,
    NameInputComponent,
    AddressInputDialogComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
